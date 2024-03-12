require "openai"
class ChatRoomController < ApplicationController
    def reply
        #potentially find a better way to authenticate requests
        if (user_signed_in?)
            response = message_to_ai(<<~CONTENT)
                Answer the question based on the context below, and
                if the question can't be answered based on the context,
                say \"I don't know\".
        
                Context:
                #{get_context}
        
                ---
        
                Question: #{params["message"]}
            CONTENT

            #save the chats to database and send back AIs response to webpage
            current_user.q_and_a << [params["message"], response]
            current_user.save
            render json: response.to_json
        end
    end
    
    private
    
    def client
        #need to change how to access token for heroku
        @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
    end

    def message_to_ai(message_content)
        response = client.chat(
            parameters: {
                model: "gpt-3.5-turbo-0125",
                messages: [{ role: "user", content: message_content }],
                temperature: 0.1,
            }
        )
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
