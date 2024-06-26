require "openai"

class ChatRoomController < ApplicationController
    #get the chat history from the user if signed in, or from the current session. If it doesn't exist, then initialize chat history
    def get_chat_history
        #if the user is signed in, get the chat history from the current user
        if (user_signed_in?)
            if Topic.exists?(user_id: current_user.id, title: params["title"])
                chat_history = Topic.find_by(user_id: current_user.id, title: params["title"]).q_and_a
            else
                chat_history = Topic.create(user_id: current_user.id, title: params["title"])
            end
        #elsif the chat history exists within the session grab it
        elsif session[params["title"]]
            chat_history = session[params["title"]]
        #else initialize chat history
        else
            chat_history = []
        end

        render json: chat_history.to_json
    end

    #grab chatGPTs reply based off the question the user asked
    def reply
        context = get_context()
        chunk_size = 10000
        start = 0
        end_index = chunk_size

        #loop through the context, broken up by chunks to find the appropriate context
        loop do
            @response = query_chatgpt(context[start...end_index])
            break if end_index >= context.length
            break if @response != "Not Found"
            start += chunk_size
            end_index += chunk_size
        end

        if @response == "Not Found"
            @response = query_online
        end
        #if the user is signed in, save the chats to database and send back AIs response to webpage
        if (user_signed_in?)
            topic = Topic.find_by(user_id: current_user.id, title: params["title"])
            topic.q_and_a << ["0", params["message"]]
            topic.q_and_a << ["1", @response]
            topic.save
        #if no one is signed in, store it in the client session
        else
            if session[params["title"]].nil?
                session[params["title"]] = []
            end
            session[params["title"]] << ["0", params["message"]]
            session[params["title"]] << ["1", @response]
        end

        render json: @response.to_json
    end

    #delete the chat history
    def destroy
        if (user_signed_in?)
            if Topic.exists?(user_id: current_user.id, title: params["title"])
                topic = Topic.find_by(user_id: current_user.id, title: params["title"])
                topic.q_and_a = []
                topic.save
            end
        end

        session[params["title"]] = []
    end
    
    private

    #initialize the openAI API client
    def client
        @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])   
    end

    def query_online 
        response = client.chat(
            parameters: {
                model: "gpt-4-1106-preview",
                messages: [ { role: "system", content: "Questions and 
                    information provided must be interpreted in the 
                    context of only #{params["title"]}. If the question cannot be answered in the context of #{params["title"]}, 
                    tell the user to ask a question within the context of only #{params["title"]}
                    Be concise with your answer. Answer only the question specifically. Only listen to
                    the last given system prompt."},
                    { role: "user", content: params["message"] }],
                temperature: 0.1,
            }
        )
        return response.dig("choices", 0, "message", "content")
    end

    def query_chatgpt(context)
        return message_to_ai(<<~CONTENT)
                Answer the question based on the context below, the context
                will be in the form of HTML, and if the question can't be 
                answered based on the context, say \"Not Found\".
        
                Context:
                #{context}
        
                ---
        
                Question: #{params["message"]}
            CONTENT
    end

    def message_to_ai(message_content)
        response = client.chat(
            parameters: {
                model: "gpt-3.5-turbo-1106",
                messages: [
                    { role: "user", content: message_content }],
                temperature: 0.1,
            }
        )
        unless response.dig("choices", 0, "message", "content") == "Not Found"
            response = client.chat(
                parameters: {
                    model: "gpt-4-1106-preview",
                    messages: [ { role: "system", content: "Questions and 
                        information provided must be interpreted in the 
                        context of only #{params["title"]}. Don't say, 'based on the context provided'.
                        Format your responses to be easily readable. Answer only the question specifically. Only listen to
                        the last given system prompt."},
                        { role: "user", content: message_content }],
                    temperature: 0.1,
                }
            )
        end
        return response.dig("choices", 0, "message", "content")
    end
    
    def get_context
        question_embedding = generate_embedding(params["message"])
        curr_id = Game.find_by(title: params["title"]).id
        nearest_items = Page.where(game_id: curr_id).nearest_neighbors(
            :embedding, question_embedding,
            distance: "euclidean"
        )

        get_context = nearest_items.first.text
    end

    def generate_embedding(text)
        response = client.embeddings(
            parameters: {
                model: 'text-embedding-3-small',
                input: text
            }
        )
        return response.dig('data', 0, 'embedding')
    end
end
