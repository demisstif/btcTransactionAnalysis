package com.demisstif.btcbackend.controler;

import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;
import com.demisstif.btcbackend.service.ISearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class HelloControler {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    ISearchService iSearchService;


    @RequestMapping("/hello")
    public Long say() {
        String sql = "SELECT balance, month(date) FROM transaction  WHERE  date > '2018-04-01' AND date < '2018-04-30' ORDER BY date DESC LIMIT 1";
         return jdbcTemplate.queryForObject(sql, new RowMapper<Long>() {
            @Nullable
            @Override
            public Long mapRow(ResultSet resultSet, int i) throws SQLException {
                Long balance = resultSet.getLong("balance");
                return balance;
            }
        });
    }

    @RequestMapping(value = "/dayReceived/{month}", method = RequestMethod.GET)
    public List<Long> getDayReceived(@PathVariable("month") Integer month) {
        List<Long> dayReceivedBtc = iSearchService.getDayReceivedBtc(2018, month);
        return dayReceivedBtc;
    }

    //天趋势
    //反映交易所这个月每天资金流入流出的热度
    @RequestMapping(value = "/market/hot/{year}/{month}", method = RequestMethod.GET)
    public List<HotDegree> getDayHotOneMonth(@PathVariable("year") Integer year, @PathVariable("month") Integer month) {
//        ArrayList<Integer> integers = new ArrayList<>();
//        integers.add(2);
//        return "What?";
        List<HotDegree> results = iSearchService.transactionsDayMonth(year, month);
        return results;
    }

    //月趋势18年4月到17年十月
    //月资金流转热度:比如统计一月份received和sent的总笔数
    //暂时统计18年1月到3月的数据
    @RequestMapping(value = "/hot/month", method = RequestMethod.GET)
    public List<HotDegree> getMonthHot() {
        List<HotDegree> monthHot = iSearchService.getMonthHot();
        return monthHot;
    }
    //月资金流入统计
    //amount
    @RequestMapping(value = "/received/month/amount", method = RequestMethod.GET)
    public List<HotDegree> receivedMonthAmount(@PathParam(value = "exchange") String exchange) {
        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthAmount(0, exchange);
        return hotDegrees;
    }
    //btc
    @RequestMapping(value = "/received/month/btc", method = RequestMethod.GET)
    public List<HotDegree> receivedMonthBtc(@PathParam(value = "exchange") String exchange) {
        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthBtc(0, exchange);
        return hotDegrees;
    }
    //月资金流出统计
    //amount
    @RequestMapping(value = "/sent/month/amount", method = RequestMethod.GET)
    public List<HotDegree> sentMonthAmount(@PathParam(value = "exchange") String exchange) {
        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthAmount(1, exchange);
        return hotDegrees;
    }
    //btc
    @RequestMapping(value = "/sent/month/btc", method = RequestMethod.GET)
    public List<HotDegree> sentMonthBtc(@PathParam(value = "exchange") String exchange) {
        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthBtc(1, exchange
        );
        return hotDegrees;
    }
    //月balance统计
    @RequestMapping(value = "/balance/month", method = RequestMethod.GET)
    public List<HotDegree> getBalanceMonth(@PathParam(value = "exchange") String exchange) {
        List<HotDegree> hotDegrees = iSearchService.getBalanceMonth(exchange);
        return hotDegrees;
    }

    //每个月打钱到交易所数额最大的十个地址
    @RequestMapping(value = "/address/month/", method = RequestMethod.GET)
    public List<StringBean> getMaxReceivedMonth(@PathParam(value = "exchange") String exchange) {
        List<StringBean> maxReceivedMonth = iSearchService.getMaxReceivedMonth(2018, 2, 10, exchange);
        return maxReceivedMonth;
    }



}
