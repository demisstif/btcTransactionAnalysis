# BTC交易数据分析(btcTransactionAnalysis)
最终效果展示网站:http://demisstif.cc
## 项目结构
![项目结构](https://github.com/demisstif/btcTransactionAnalysis/blob/master/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84.png)
## 实现功能
1. 爬取walletexplorer.com网站上关于Bittrex,Poloniex,Huobi交易所的BTC转入转出的信息
2. 将数据存入了MySQL
3. 数据获得后对数据进行了分析,主要依靠sql
4. 使用spring写了一个向外提供分析数据的后端,结构统一返回json数据
5. 采用React+rechars实现了一个数据可视化的前端.
## 技术实现
### 爬虫
爬虫采用了Scrapy框架,分别为三个交易所的数据写了一个爬虫.可以长时间内持续正常运行.源代码在项目主目录spider下.
数据直接存储到MySQL数据库中,由于爬去的数据条数达到了百万以上,如果直接对其进行查询来为前端提供数据将会导致页面的卡顿,所以在数据库中新建了
分析结果的表.后端spring在提供数据时直接查询分析的结果表.
### 后端
后端采用spring-boot快速开发,分层后MainControl向外提供相应json数据.源代码位于btcbackend目录下.
### 前端
前端主体由react实现,在风格上使用了蚂蚁金服的Ant Design开源组件.
数据图标展示利用了rechars开源库.
## 待改进
1. 由于时间关系,只用了Bittrex,Poloniex两家交易所18年1月到3月的数据进行可视化.walletExplorer上火币的数据不完整,未采用
2. 数据可以用来分析出什么还需要进一步思考.
