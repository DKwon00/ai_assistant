require "openai"
class ChatsController < ApplicationController

    def reply
        #potentially find a better way to authenticate requests
        if (user_signed_in?)
            response = message_to_chat(<<~CONTENT)
                Answer the question based on the context below, and
                if the question can't be answered based on the context,
                say \"I don't know\".
        
                Context:
                #{context}
        
                ---
        
                Question: #{params["message"]}
            CONTENT
            
            current_user.q_and_a << [params["message"], response]
            current_user.save
            render json: response.to_json
        end
    end

    def message_to_chat(message_content)
        response = client.chat(
            parameters: {
                model: "gpt-3.5-turbo-0125",
                messages: [{ role: "user", content: message_content }],
                temperature: 0.1,
            }
        )
        return response.dig("choices", 0, "message", "content")
    end
    
    def context
        question_embedding = embedding_for(params["message"])
        nearest_items = Page.nearest_neighbors(
            :embedding, question_embedding,
            distance: "euclidean"
        )

        context = nearest_items.first.text
    end

    def embedding_for(text)
        response = client.embeddings(
            parameters: {
                model: 'text-embedding-3-small',
                input: text
            }
        )
        response.dig('data', 0, 'embedding')
    end

    def client
        @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
    end

end
