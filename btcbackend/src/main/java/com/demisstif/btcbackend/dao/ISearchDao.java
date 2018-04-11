package com.demisstif.btcbackend.dao;

import com.demisstif.btcbackend.model.BtcDayData;
import com.demisstif.btcbackend.model.BtcMonthData;
import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;

import java.util.List;

public interface ISearchDao {
   //分为三个部分,
   //1.获取某天的数据
   //2.获取某个月所有的数据
   //3.获取月的汇总数据
   //4.其它
    BtcDayData getOneDayData(String exchange, int year, int month, int day);
    BtcMonthData getOneMonthData(String exchange, int year, int month, int day);
    List<BtcDayData> getDayDataByMonth(String exchange, int year, int month);
    List<BtcDayData> getDayDataByMonths(String exchange, int year, int[] months);
    List<BtcDayData> getAllDayDatas(String exchange);
    List<BtcDayData> getAllDayDatas();
    List<BtcMonthData> getMonthDataByMonth(String exchange, int year, int month);
    List<BtcMonthData> getMonthDataByMonths(String exchange, int year, int[] months);
    List<BtcMonthData> getAllMonthDatas(String exchange);
    List<BtcMonthData> getAllMonthDatas();
}
