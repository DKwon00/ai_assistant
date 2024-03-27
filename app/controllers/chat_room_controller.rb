require "openai"
class ChatRoomController < ApplicationController
    def reply
        #potentially find a better way to authenticate requests
        
        context = get_context()

        chunk_size = 10000
        start = 0
        end_index = chunk_size
        loop do
            @response = query_chatgpt(context[start...end_index])
            break if end_index >= context.length
            break if @response != "Not Found"
            start += chunk_size
            end_index += chunk_size
        end
        # context.scan(/.{6000}/).each do |chunk|
        #     puts chunk
        #     @response = get_response(chunk)
        #     unless @response == "Not Found"
        #         break
        #     end
        # end
        if @response == "Not Found"
            @response = "Sorry, I'm not sure I know the answer."
        end
        if (user_signed_in?)
            #save the chats to database and send back AIs response to webpage
            current_user.q_and_a << [params["message"], @response]
            current_user.save
        end
        render json: @response.to_json
    end
    
    private
    
    def client
        #need to change how to access token for heroku
        @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
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
                messages: [ { role: "system", content: "Questions and 
                    information provided must be interpreted in the 
                    context of Minecraft. Don't say, 'based on the context provided'.
                    Format your responses to be easily readable."},
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
                        context of Minecraft. Don't say, 'based on the context provided'.
                        Format your responses to be easily readable."},
                        { role: "user", content: message_content }],
                    temperature: 0.1,
                }
            )
        end
        return response.dig("choices", 0, "message", "content")
    end
    
    def get_context
        question_embedding = generate_embedding(params["message"])
        nearest_items = Page.nearest_neighbors(
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
