#require 'tanakai'
require 'httparty'

class WebSpider < Tanakai::Base
    @home_url = "https://studentaid.gov"
    @name = "web_spider"
    @engine = :cuprite
    @start_urls = [@home_url]
    @config = {
      user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      before_request: {delay: 1..5}
    }
  
    def parse(response, url:, data: {})
      #grab the contents of the page
      page_text = response.xpath("//div[@class='col-lg-7']").text
        
      unless page_text.empty?
        HTTParty.post('http://127.0.0.1:3000/page', 
                        body: JSON.generate({:data => page_text, :page_url => url}), 
                        headers: { 'Content-Type' => 'application/json' })
      end
      #recurse through any additional links found on the webpage
      response.xpath("//a[@href]").each do |a|
        next_url = absolute_url(a[:href], base: @home_url)
          
        next unless unique?(:fafsa_url, next_url)
        request_to :parse, url: next_url
      end
    end
  end

  WebSpider.crawl!
