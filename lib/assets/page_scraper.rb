require 'tanakai'


class GithubSpider < Tanakai::Base
    @name = "github_spider"
    @engine = :cuprite
    @start_urls = ["https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized"]
    @config = {
      user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      before_request: {delay: 1..5}
    }
  
    def parse(response, url:, data: {})
      #puts response.xpath("//div[@class='col-lg-7']").text
      HTTParty.post('http://127.0.0.1.com/page', body: JSON.generate({ foo: 'bar' }), headers: { 'Content-Type' => 'application/json' })
      puts url
      response.xpath("//div[@class='col-lg-6 pb-0 addLink']/div/a").each do |a|
        next unless unique?(:fafsa_url, absolute_url(a[:href], base: "https://studentaid.gov"))
        request_to :parse, url: absolute_url(a[:href], base: "https://studentaid.gov")
      end
    end
  end

  GithubSpider.crawl!