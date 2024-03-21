require "openai"

class PagesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
        if Game.exists?(title: params['title'])
            @game = Game.find_by(title: params['title'])
        else
            @game = Game.create(title: params['title'])
        end
        unless Page.exists?(page_name: params['page_url'])
            Page.create(page_name: params['page_url'], query_count: 0, 
            embedding: embed(params['data']), game_id: @game.id, text: params['data'])
        end
    end
    private

    def embed(data)
        client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
        
        response = client.embeddings(
            parameters: {
                model: 'text-embedding-3-small',
                input: data.truncate(20000)
            }
        )
        return response.dig('data', 0, 'embedding')
    end
end