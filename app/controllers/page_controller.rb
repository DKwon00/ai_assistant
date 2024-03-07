require "openai"

class PageController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
        #if the data from website is too big, split the string and create two Pages
        if OpenAI.rough_token_count(params['data']) > 8000
            first, second = params['data'].partition(/.{#{params['data'].size/2}}/)[1,2]

            page_one = Page.create(page_name: params['page_url'], text: first, query_count: 0, embedding: embed(first))
            page_one.save

            page_two = Page.create(page_name: params['page_url'] << '2', text: second, query_count: 0, embedding: embed(second))
            page_two.save
        else
            page = Page.create(page_name: params['page_url'], text: params['data'], query_count: 0, embedding: embed(params['data']))
            page.save
        end

        #puts params['data']

    end

    private

    def embed(data)
        client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])

        response = client.embeddings(
            parameters: {
                model: 'text-embedding-3-small',
                input: data
            }
        )
        return response.dig('data', 0, 'embedding')
    end
end