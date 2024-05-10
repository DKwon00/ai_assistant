require 'tanakai'
require 'httparty'

class WebSpider < Tanakai::Base
  @@max_chars = 25000
  
  @name = "web_spider"
  @engine = :selenium_chrome
  @config = {
    user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36",
  }

  #@file = File.open("links.txt")
  #@file.readlines.map(&:chomp)
  @start_urls = ["https://fortnite.fandom.com/wiki/Fortnite_wiki"]

  def parse(response, url:, data: {})
    #grab the contents of the page
    page_text = response.xpath("//p")
    #https://juni-ai-c60f42c25c16.herokuapp.com
    #https://127.0.0.1:3000
    unless page_text.empty?
      HTTParty.post('https://juni-ai-c60f42c25c16.herokuapp.com/page',
                      body: JSON.generate({:data => page_text, :page_url => url, :title => 'Fortnite'}), 
                      headers: { 'Content-Type' => 'application/json' })
    end
    #recurse through any additional links found on the webpage
    # response.xpath("//div[@class='div-col columns column-width']/ul/li/span/a").each do |a|
    #   next_url = absolute_url(a[:href], base: "https://minecraft.wiki")
    #   File.open("links.txt", 'a') { |file| file.puts next_url}
    #   next unless unique?(:page_url, next_url)
    #   request_to :parse, url: next_url
    # end
  end
end

WebSpider.crawl!