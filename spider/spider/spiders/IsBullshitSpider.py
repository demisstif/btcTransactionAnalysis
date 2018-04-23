# from scrapy.contrib.spiders import CrawlSpider, Rule
# from scrapy.contrib.linkextractor.sgml import SgmlLinkExtractor
# from spider.items import IsBullshitItem
#
#
# class IsBullshitSpider(CrawlSpider):
#     name = 'isbullshit'
#     start_urls = ['http://isbullsh.it']
#     rules = [Rule(SgmlLinkExtractor(allow=[r'page/\d+']),follow=True),
#         # r'page/\d+' : regular expression for http://isbullsh.it/page/X URLs
#         Rule(SgmlLinkExtractor(allow=[r'\d{4}/\d{2}\w+']), callback='parse_blogpost')]
#         # r'\d{4}/\d{2}/\w+' : regular expression for http://isbullsh.it/YYYY/MM/title URLs