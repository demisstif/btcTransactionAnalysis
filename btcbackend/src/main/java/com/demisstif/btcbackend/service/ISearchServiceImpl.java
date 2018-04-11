package com.demisstif.btcbackend.service;

import com.demisstif.btcbackend.dao.ISearchDao;
import com.demisstif.btcbackend.model.BtcDayData;
import com.demisstif.btcbackend.model.BtcMonthData;
import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ISearchServiceImpl implements ISearchService{

    @Autowired
    ISearchDao iSearchDao;

    @Override
    public List<BtcDayData> dayOneMonth(String exchange, int year, int month) {
        return iSearchDao.getDayDataByMonth(exchange, year, month);
    }

    @Override
    public List<BtcDayData> dayMutiMonth(String exchange, int year, int[] months) {
        return iSearchDao.getDayDataByMonths(exchange, year, months);
    }

    @Override
    public List<BtcDayData> dayByExchange(String exchange) {
        return iSearchDao.getAllDayDatas(exchange);
    }

    @Override
    public List<BtcDayData> dayAll() {
        return iSearchDao.getAllDayDatas();
    }

    @Override
    public List<BtcMonthData> oneMonth(String exchange, int year, int month) {
        return iSearchDao.getMonthDataByMonth(exchange, year, month);
    }

    @Override
    public List<BtcMonthData> mutiMonth(String exchange, int year, int[] months) {
        return iSearchDao.getMonthDataByMonths(exchange, year, months);
    }

    @Override
    public List<BtcMonthData> monthByExchange(String exchange) {
        return iSearchDao.getAllMonthDatas(exchange);
    }

    @Override
    public List<BtcMonthData> monthAll() {
        return iSearchDao.getAllMonthDatas();
    }

//
//    @Override
//    public List<HotDegree> transactionsDayMonth(int year, int month) {
//        List<HotDegree> results = new ArrayList<>();
//        int dayAmount = 0;
//        switch (month) {
//            case 1:
//            case 3:
//            case 5:
//            case 7:
//            case 8:
//            case 10:
//            case 12:
//                dayAmount = 31;
//                break;
//            case 2:
//                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
//                    dayAmount = 29;
//                } else {
//                    dayAmount = 28;
//                }
//                break;
//            case 4:
//            case 6:
//            case 9:
//            case 11:
//                dayAmount = 30;
//                break;
//
//
//        }
//        for (int i = 1 ; i <=dayAmount; i++) {
//            HotDegree hotDegree = iSearchDao.dayTransactionNumber(year, month, i);
//            results.add(hotDegree);
//        }
//        return results;
//    }
//
//    @Override
//    public List<HotDegree> getMonthHot() {
//        List<HotDegree> results = new ArrayList<>();
//        for (int i = 1; i <= 3; i++) {
//            HotDegree hotMonth = iSearchDao.getHotMonth(2018, i);
//            results.add(hotMonth);
//        }
//        return results;
//    }
//
//    @Override
//    public List<HotDegree> getDayReceivedBtc(int year, int month, String exchange) {
//        List<HotDegree> dayReceivedBtc = iSearchDao.getDayReceivedBtc(year, month, exchange);
//        return dayReceivedBtc;
//    }
//
//    @Override
//    public List<HotDegree> receivedOrSentMonthAmount(int type, String exchange) {
//        List<HotDegree> results = new ArrayList<>();
//        for (int i = 1; i <= 3; i++) {
//            HotDegree hotMonth = iSearchDao.receivedOrSentMonthAmount(2018, i, type,exchange);
//            results.add(hotMonth);
//        }
//        return results;
//    }
//
//    @Override
//    public List<HotDegree> receivedOrSentMonthBtc(int type, String exchange) {
//        List<HotDegree> results = new ArrayList<>();
//        for (int i = 1; i <= 3; i++) {
//            HotDegree hotMonth = iSearchDao.receivedOrSentMonthBtc(2018, i, type, exchange);
//            results.add(hotMonth);
//        }
//        return results;
//    }
//
//    @Override
//    public List<HotDegree> getBalanceMonth(String exchange) {
//        List<HotDegree> results = new ArrayList<>();
//        for (int i = 1; i <= 3; i++) {
//            HotDegree hotMonth = iSearchDao.getBalanceOneMonth(2018, i, exchange);
//            results.add(hotMonth);
//        }
//        return results;
//    }
//
//    @Override
//    public List<StringBean> getMaxReceivedMonth(int year, int month, int limit, String exchange) {
//        List<StringBean> maxReceivedMonth = iSearchDao.getMaxReceivedMonth(year, month, limit, exchange);
//        return maxReceivedMonth;
//    }
}
