from scrapy import cmdline

cmdline.execute("scrapy crawl bittrex -o douban.csv".split())
