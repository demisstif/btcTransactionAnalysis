import scrapy
from scrapy.crawler import CrawlerProcess
from spider.spiders.BittrexSpider import BittrexSpider
from spider.spiders.PoloniexSpider import PoloniexSpider
from spider.spiders.HuobiSpider import HuobiSpider
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from twisted.internet import reactor

# process = CrawlerProcess()
# process.crawl(BittrexSpider)
# process.crawl(PoloniexSpider)
# process.crawl(HuobiSpider)
#
# process.start()

configure_logging()
runner = CrawlerRunner()
runner.crawl(PoloniexSpider)
runner.crawl(BittrexSpider)
runner.crawl(HuobiSpider)
d = runner.join()
d.addBoth(lambda _: reactor.stop())

reactor.run()
