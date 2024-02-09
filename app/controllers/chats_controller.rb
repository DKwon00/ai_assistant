require "openai"
class ChatsController < ApplicationController
    def reply
        client = OpenAI::Client.new(access_token: "API-KEY")
        response = client.chat(
            parameters: {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: params["message"] }],
                temperature: 0.7,
            }
        )
        render json: response.dig("choices", 0, "message", "content").to_json
    end
end
