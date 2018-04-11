# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class SpiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class TransactionItem(scrapy.Item):
    # 交易日期
    date = scrapy.Field()
    received_amount = scrapy.Field()
    received_from = scrapy.Field()
    sent_amount = scrapy.Field()
    # sent_to = scrapy.Field()
    balance = scrapy.Field()
    txid = scrapy.Field()
    type = scrapy.Field()
    exchange = scrapy.Field()

class SentDetail(scrapy.Item):
    sent_amount = scrapy.Field()
    sent_to = scrapy.Field()
    txid = scrapy.Field()
    exchange = scrapy.Field()


