from scrapy.spiders import Spider
from scrapy import Request
from spider.items import CoinDetail
from scrapy import log
from .value import page
from scrapy.linkextractors import LinkExtractor

class EosAdressSpider(Spider):
    name = 'eos'

    def start_requests(self):
        url = 'https://etherscan.io/token/generic-tokenholders2?a=0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0&s=1000000000000000000000000000'
        yield Request(url)

    def parse(self, response):
        contents = response.selector.xpath('//div[@id="maintable"]/table[@class="table"]/tr')
        log.msg(contents.extract()[1:])
        for single in contents:
            coin_detail = CoinDetail()
            rank_q_p = single.xpath('./td/text()').extract()
            if not rank_q_p:
                continue
            log.msg(rank_q_p)
            coin_detail['rank'] = int(rank_q_p[0])
            coin_detail['quantity'] = float(rank_q_p[1])
            coin_detail['percentage'] = float(rank_q_p[2][:-1])
            address = single.xpath('./td/span/a/text()').extract()
            coin_detail['address'] = address[0]
            yield coin_detail
        next_url = 'https://etherscan.io/token/generic-tokenholders2?a=0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0&s=1E%2b27&p=2'
        yield Request(next_url)