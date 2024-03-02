require 'tanakai'


class GithubSpider < Tanakai::Base
    @name = "github_spider"
    @engine = :selenium_chrome
    @start_urls = ["https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized"]
    @config = {
      user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
  
    def parse(response, url:, data: {})
        puts response.xpath("//div//div[@class='col-lg-7']").text
    end
  end
  
  GithubSpider.crawl!