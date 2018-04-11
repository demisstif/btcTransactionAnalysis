package com.demisstif.btcbackend.service;

import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;

import java.util.List;

public interface ISearchService {

    List<HotDegree> transactionsDayMonth(int year, int month);
    List<HotDegree> getMonthHot();
    List<Long> getDayReceivedBtc(int year, int month);
    List<HotDegree> receivedOrSentMonthAmount(int type, String exchange);

    List<HotDegree> receivedOrSentMonthBtc(int type, String exchange);

    List<HotDegree> getBalanceMonth(String exchange);
    List<StringBean> getMaxReceivedMonth(int year, int month, int limit, String exchange);
}
