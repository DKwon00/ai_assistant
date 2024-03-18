require "openai"
class ChatRoomController < ApplicationController
    def reply
        #potentially find a better way to authenticate requests
        if (user_signed_in?)
            context = get_context()
            
            start_index = 0
            end_index = context.length / 5

            5.times do |i|
                @response = get_response(context[start_index...end_index])
                
                start_index += context.length / 5
                end_index += context.length / 5

                unless @response == "Not Found"
                    break
                end
            end
            if @response == "Not Found"
                @response = "Sorry, I'm not sure I know the answer."
            end

            #save the chats to database and send back AIs response to webpage
            current_user.q_and_a << [params["message"], @response]
            current_user.save
            render json: @response.to_json
        end
    end
    
    private
    
    def client
        #need to change how to access token for heroku
        @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
    end

    def get_response(context)
        return message_to_ai(<<~CONTENT)
                Answer the question based on the context below, and
                if the question can't be answered based on the context,
                say \"Not Found\".
        
                Context:
                #{context}
        
                ---
        
                Question: #{params["message"]}
            CONTENT
    end

    def message_to_ai(message_content)
        response = client.chat(
            parameters: {
                model: "gpt-3.5-turbo-0125",
                messages: [{ role: "user", content: message_content }],
                temperature: 0.1,
            }
        )
        puts "TOKEN COUNT HERE"
        puts OpenAI.rough_token_count(message_content)
        return response.dig("choices", 0, "message", "content")
    end
    
    def get_context
        question_embedding = generate_embedding(params["message"])
        nearest_items = Page.nearest_neighbors(
            :embedding, question_embedding,
            distance: "euclidean"
        )
        puts "CONTEXT"
        puts nearest_items.first.text
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
