package com.demisstif.btcbackend.controler;

import com.demisstif.btcbackend.model.BtcDayData;
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


    /**
     * 获取某个月每天的数据
     * @param exchange
     * @param month
     * @return
     */
    @RequestMapping(value = "/day/month", method = RequestMethod.GET)
    public List<BtcDayData> getDayReceived(@PathParam(value = "exchange") String exchange,@PathParam(value="year") Integer year, @PathParam("month") Integer month) {
        List<BtcDayData> btcDayData = iSearchService.dayOneMonth(exchange, year.intValue(), month.intValue());
        return btcDayData;
    }


    @RequestMapping(value = "/day/all", method = RequestMethod.GET)
    public List<BtcDayData> getDayReceived(@PathParam(value = "exchange") String exchange) {
        List<BtcDayData> btcDayData = iSearchService.dayByExchange(exchange);
        return btcDayData;
    }

//    //天趋势
//    //反映交易所这个月每天资金流入流出的热度
//    @RequestMapping(value = "/market/hot", method = RequestMethod.GET)
//    public List<HotDegree> getDayHotOneMonth(@PathParam("year") Integer year, @PathParam("month") Integer month) {
////        ArrayList<Integer> integers = new ArrayList<>();
////        integers.add(2);
////        return "What?";
//        List<HotDegree> results = iSearchService.transactionsDayMonth(year, month);
//        return results;
//    }
//
//    //月趋势18年4月到17年十月
//    //月资金流转热度:比如统计一月份received和sent的总笔数
//    //暂时统计18年1月到3月的数据
//    @RequestMapping(value = "/hot/month", method = RequestMethod.GET)
//    public List<HotDegree> getMonthHot() {
//        List<HotDegree> monthHot = iSearchService.getMonthHot();
//        return monthHot;
//    }
//    //月资金流入统计
//    //amount
//    @RequestMapping(value = "/received/month/amount", method = RequestMethod.GET)
//    public List<HotDegree> receivedMonthAmount(@PathParam(value = "exchange") String exchange) {
//        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthAmount(0, exchange);
//        return hotDegrees;
//    }
//    //btc
//    @RequestMapping(value = "/received/month/btc", method = RequestMethod.GET)
//    public List<HotDegree> receivedMonthBtc(@PathParam(value = "exchange") String exchange) {
//        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthBtc(0, exchange);
//        return hotDegrees;
//    }
//    //月资金流出统计
//    //amount
//    @RequestMapping(value = "/sent/month/amount", method = RequestMethod.GET)
//    public List<HotDegree> sentMonthAmount(@PathParam(value = "exchange") String exchange) {
//        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthAmount(1, exchange);
//        return hotDegrees;
//    }
//    //btc
//    @RequestMapping(value = "/sent/month/btc", method = RequestMethod.GET)
//    public List<HotDegree> sentMonthBtc(@PathParam(value = "exchange") String exchange) {
//        List<HotDegree> hotDegrees = iSearchService.receivedOrSentMonthBtc(1, exchange
//        );
//        return hotDegrees;
//    }
//    //月balance统计,每个月剩余的balance
//    @RequestMapping(value = "/balance/month", method = RequestMethod.GET)
//    public List<HotDegree> getBalanceMonth(@PathParam(value = "exchange") String exchange) {
//        List<HotDegree> hotDegrees = iSearchService.getBalanceMonth(exchange);
//        return hotDegrees;
//    }
//
//    //每个月打钱到交易所数额最大的十个地址
//    @RequestMapping(value = "/address/month/", method = RequestMethod.GET)
//    public List<StringBean> getMaxReceivedMonth(@PathParam(value = "exchange") String exchange) {
//        List<StringBean> maxReceivedMonth = iSearchService.getMaxReceivedMonth(2018, 2, 10, exchange);
//        return maxReceivedMonth;
//    }

    @RequestMapping(value="/insert/{exchange}", method = RequestMethod.GET)
    public void insert(@PathVariable(value="exchange") String exchange, @PathParam(value="year") Integer year, @PathParam(value = "month") Integer month) {
        year = year.intValue();
         month = month.intValue();
//        String exchange = "huobi";
        String sql = "INSERT INTO month_data(year, month, receivedBtc, receivedAmount, sentBtc, sentAmount, balance, exchange)" +
                "  VALUE ("+year+", "+month+", (SELECT sum(received_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=0 AND year(date)="+year+" AND month(date)="+month+")," +
                "         (SELECT count(received_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=0 AND year(date)="+year+" AND month(date)="+month+")," +
                "         (SELECT sum(sent_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=1 AND year(date)="+year+" AND month(date)="+month+")," +
                "         (SELECT count(sent_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=1 AND year(date)="+year+" AND month(date)="+month+")," +
                "         (SELECT balance FROM transaction  WHERE  month(date)="+month+" AND year(date)="+year+" AND exchange='"+exchange+"' ORDER BY date DESC LIMIT 1)," +
                "         '"+exchange+"')";
        jdbcTemplate.execute(sql);
    }

    @RequestMapping(value="/insert/day/{exchange}", method = RequestMethod.GET)
    public void insertDay(@PathVariable(value="exchange") String exchange, @PathParam(value="year") Integer year, @PathParam(value = "month") Integer month) {
        year = year.intValue();
        month = month.intValue();
        int dayAmount = 0;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                dayAmount = 31;
                break;
            case 2:
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                    dayAmount = 29;
                } else {
                    dayAmount = 28;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                dayAmount = 30;
                break;


        }
        for (int i = 1 ; i <=dayAmount; i++) {
            String sql = "INSERT INTO day_data(year, month, day, receivedBtc, receivedAmount, sentBtc, sentAmount, balance, exchange)" +
                    "  VALUE ("+year+", "+month+","+i+", (SELECT sum(received_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=0 AND day(date)="+i+" AND year(date)="+year+" AND month(date)="+month+")," +
                    "         (SELECT count(received_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=0 AND day(date)="+i+" AND year(date)="+year+" AND month(date)="+month+")," +
                    "         (SELECT sum(sent_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=1 AND day(date)="+i+" AND year(date)="+year+" AND month(date)="+month+")," +
                    "         (SELECT count(sent_amount) FROM transaction WHERE exchange='"+exchange+"' AND type=1 AND day(date)="+i+" AND year(date)="+year+" AND month(date)="+month+")," +
                    "         (SELECT balance FROM transaction  WHERE day(date)="+i+" AND  month(date)="+month+" AND year(date)="+year+" AND exchange='"+exchange+"' ORDER BY date DESC LIMIT 1)," +
                    "         '"+exchange+"')";
            jdbcTemplate.execute(sql);
        }

    }

}
