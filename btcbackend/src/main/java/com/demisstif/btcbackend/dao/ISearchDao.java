package com.demisstif.btcbackend.dao;

import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;

import java.util.List;

public interface ISearchDao {
    Long monthTotalReceived(Integer year, Integer month);
    Long dayTotalReceived(Integer year, Integer month, Integer day);
    Long monthTotalSent(Integer year, Integer month);
    Long dayTotalSent(Integer year, Integer month, Integer day);
    HotDegree dayTransactionNumber(int year, int month, int day);
    List<Long> getDayReceivedBtc(int year, int month);
    HotDegree getHotMonth(int year, int month);
    HotDegree receivedOrSentMonthAmount(int year, int month, int type, String exchange);
    HotDegree receivedOrSentMonthBtc(int year, int month, int type, String exchange);

    HotDegree getBalanceOneMonth(int year, int month, String exchange);

    List<StringBean> getMaxReceivedMonth(int year, int month, int limit, String exchange);
}
