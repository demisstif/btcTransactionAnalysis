# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pymysql
from .items import TransactionItem,SentDetail,CoinDetail
import logging
def dbHandle():
    conn = pymysql.connect(
        host = 'localhost',
        user = 'root',
        passwd = 'root123',
        charset = 'utf8',
        use_unicode = False
    )
    return conn


class SpiderPipeline(object):
    def process_item(self, item, spider):
        dbObject = dbHandle()
        cursor = dbObject.cursor()
        cursor.execute("USE btc")
        if isinstance(item, TransactionItem):
            sql = 'INSERT INTO transaction (date, balance, received_amount, received_from, sent_amount,  txid, type, exchange) VALUE (%s, %s, %s, %s, %s, %s, %s, %s)'
            try:
                cursor.execute(sql, (
                item['date'], item['balance'], item['received_amount'], item['received_from'], item['sent_amount'],
                 item['txid'], item['type'], item['exchange']))
                cursor.connection.commit()
            except BaseException as e:
                print("error>>>>>", e, "<<<<error")
                dbObject.rollback()
            return item
        elif isinstance(item, SentDetail):
            sql = 'INSERT INTO sent_detail(sent_amount, sent_to, txid, exchange) VALUE(%s, %s, %s,%s)'
            try:
                cursor.execute(sql, (item['sent_amount'],item['sent_to'], item['txid'], item['exchange']))
                cursor.connection.commit()
            except BaseException as e:
                print("error>>>>>", e, "<<<<error")
                dbObject.rollback()
            return item
        elif isinstance(item, CoinDetail):
            logging.info(item)
            sql = 'INSERT INTO coin_detail VALUE (%s,%s,%s,%s)'
            try:
                cursor.execute(sql, (item['rank'], item['address'], item['quantity'], item['percentage']))
                cursor.connection.commit
            except BaseException as e:
                print("error>>>", e, "<<<error")
                dbObject.rollback()
            return item

