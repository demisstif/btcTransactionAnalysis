# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy import Item,Field


class SpiderItem(Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class TransactionItem(Item):
    # 交易日期
    date = Field()
    received_amount = Field()
    received_from = Field()
    sent_amount = Field()
    # sent_to = scrapy.Field()
    balance = Field()
    txid = Field()
    type = Field()
    exchange = Field()

class SentDetail(Item):
    sent_amount = Field()
    sent_to = Field()
    txid = Field()
    exchange = Field()


class IsBullshitItem(Item):
    title = Field()
    author = Field()
    tag = Field()
    date = Field()
    link = Field()

class CoinDetail(Item):
    rank = Field()
    address = Field()
    quantity = Field()
    percentage = Field()



