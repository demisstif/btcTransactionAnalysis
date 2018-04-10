from scrapy.spiders import Spider
from scrapy import Request
from spider.items import TransactionItem
from scrapy import log
from .value import page




class PoloniexSpider(Spider):
    name = 'poloniex'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
    }

    def start_requests(self):
        url = 'https://www.walletexplorer.com/wallet/Poloniex.com'
        yield Request(url)

    def parse(self, response):
        transactions = response.selector.xpath('//table[@class="txs"]/tr[@class="received" or @class="sent"]')
        for transaction in transactions:
            item = TransactionItem()
            class_value = transaction.xpath('./@class').extract()[0]
            value = class_value
            dates = transaction.xpath('.//td[@class="date"]/text()').extract()
            item['date'] = dates[0]
            item['balance'] = float(transaction.xpath('.//td[@class="amount"]/text()').extract()[0].strip())
            item['txid'] = transaction.xpath('.//td[@class="txid"]/a/@href').extract()[0][6:]
            item['exchange'] = 'poloniex'
            if value == 'received':
                try:
                    item['received_from'] = transaction.xpath('.//td[@class="inout"]/table/tr/td[@class="walletid"]/a/@href').extract()[0][8:]
                except Exception:
                    # item['received_from'] = transaction.xpath('.//td[@class="inout"]/table/tr/td[@class="walletid"]/b/text()').extract()[0]
                    item['received_from'] = "error"
                item['received_amount'] = float(transaction.xpath('.//td[@class="inout"]/table/tr/td[@class="amount diff"]/text()').extract()[0][1:].strip())
                item['type'] = 0
                item['sent_to'] = ' '
                item['sent_amount'] = 0

                yield item
            elif value == 'sent':
                item['type'] = 1
                item['received_amount'] = 0
                item['received_from'] = ' '
                # yield item
                senttos = transaction.xpath('.//table[@class="empty"]/tr')
                for sent in senttos:
                    amount = sent.xpath('.//td[@class="amount diff"]/text()').extract()
                    if amount :
                        walletid = sent.xpath('.//td[@class="walletid"]')[1].xpath('.//a/@href').extract()[0][8:]
                        item['sent_to'] = walletid
                        if amount[0].startswith('-'):
                            item['sent_amount'] = float(amount[0][1:])
                        elif amount[0].startswith('0'):
                            item['sent_amount'] = float(amount[0].strip())
                    else:
                        item['sent_to'] = 'fee'
                        item['sent_amount'] = float(sent.xpath('.//td[@class="amount diff"]/em/text()').extract()[0].strip()[1:-1][1:])
                        log.msg('sent')
                    yield item
        count = 1
        hrefs = response.xpath('.//div[@class="paging"]/a[contains(text(), "Next")]/@href').extract()
        next_url = "https://www.walletexplorer.com" + hrefs[0]
        limit = next_url[-1]
        if int(limit) < page:
            yield Request(next_url)