require "openai"
class ChatsController < ApplicationController
    def reply
        #potentially find a better way to authenticate requests
        if (user_signed_in?)
            client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
            response = client.chat(
                parameters: {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: params["message"] }],
                    temperature: 0.7,
                }
            )

            current_user.q_and_a << [params["message"], response.dig("choices", 0, "message", "content")]
            current_user.save
            render json: response.dig("choices", 0, "message", "content").to_json
        end
    end
end
