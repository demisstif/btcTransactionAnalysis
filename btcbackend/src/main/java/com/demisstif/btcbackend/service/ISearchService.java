package com.demisstif.btcbackend.service;

import com.demisstif.btcbackend.model.BtcDayData;
import com.demisstif.btcbackend.model.BtcMonthData;
import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;

import java.util.List;

public interface ISearchService {

   //1.获取到三个月sent和received的btc,画出两个直方图
   List<BtcDayData> dayOneMonth(String exchange, int year, int month);
   List<BtcDayData> dayMutiMonth(String exchange, int year, int[] months);
   List<BtcDayData> dayByExchange(String exchange);
   List<BtcDayData> dayAll();

   List<BtcMonthData> oneMonth(String exchange, int year, int month);
   List<BtcMonthData> mutiMonth(String exchange, int year, int[] months);
   List<BtcMonthData> monthByExchange(String exchange);
   List<BtcMonthData> monthAll();
}
