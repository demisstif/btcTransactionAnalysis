package com.demisstif.btcbackend.dao;

import com.demisstif.btcbackend.model.BtcDayData;
import com.demisstif.btcbackend.model.BtcMonthData;
import com.demisstif.btcbackend.model.HotDegree;
import com.demisstif.btcbackend.model.StringBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ISearchDaoImpl implements ISearchDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public BtcDayData getOneDayData(String exchange, int year, int month, int day) {
        String sql = "SELECT * FROM day_data WHERE year=? AND month=? AND day=? AND exchange=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{year, month, day, exchange}, new RowMapper<BtcDayData>() {
            @Nullable
            @Override
            public BtcDayData mapRow(ResultSet resultSet, int i) throws SQLException {

                BtcDayData btcDayData = constructDayData(resultSet);

                return btcDayData;
            }
        });
    }





    @Override
    public BtcMonthData getOneMonthData(String exchange, int year, int month, int day) {
        String sql = "SELECT * FROM month_data WHERE year=? AND month=? AND exchange=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{year, month, exchange}, new RowMapper<BtcMonthData>() {
            @Nullable
            @Override
            public BtcMonthData mapRow(ResultSet resultSet, int i) throws SQLException {

                BtcMonthData btcMonthData = constructMonthData(resultSet);

                return btcMonthData;
            }
        });
    }

    @Override
    public List<BtcDayData> getDayDataByMonth(String exchange, int year, int month) {
        String sql = "SELECT * FROM day_data WHERE year=? AND month=? AND exchange=?";
        return jdbcTemplate.query(sql, new Object[]{year, month, exchange}, new RowMapper<BtcDayData>(){
            @Nullable
            @Override
            public BtcDayData mapRow(ResultSet resultSet, int i) throws SQLException {
                    BtcDayData btcDayData = constructDayData(resultSet);
                return btcDayData;
            }
        });
    }

    @Override
    public List<BtcDayData> getDayDataByMonths(String exchange, int year, int[] months) {
        String sql = "SELECT * FROM day_data WHERE year=? AND month=? AND exchange=?";
        List<BtcDayData> results = new ArrayList<>();
        for (int i=0; i < months.length; i++) {
            List<BtcDayData> singleResults = jdbcTemplate.query(sql, new Object[]{year, months[i], exchange}, new RowMapper<BtcDayData>() {
                @Nullable
                @Override
                public BtcDayData mapRow(ResultSet resultSet, int i) throws SQLException {
                    return constructDayData(resultSet);
                }
            });
            results.addAll(singleResults);
        }
        return results;
    }

    @Override
    public List<BtcDayData> getAllDayDatas(String exchange) {
        String sql = "SELECT * FROM day_data WHERE exchange=? ORDER BY year,month,day";
        return jdbcTemplate.query(sql, new Object[]{exchange}, new RowMapper<BtcDayData>() {
            @Nullable
            @Override
            public BtcDayData mapRow(ResultSet resultSet, int i) throws SQLException {
                return constructDayData(resultSet);
            }
        });
    }

    @Override
    public List<BtcDayData> getAllDayDatas() {

        String sql = "SELECT * FROM day_data";
        return jdbcTemplate.query(sql, new RowMapper<BtcDayData>() {
            @Nullable
            @Override
            public BtcDayData mapRow(ResultSet resultSet, int i) throws SQLException {
                return constructDayData(resultSet);
            }
        });
    }

    @Override
    public List<BtcMonthData> getMonthDataByMonth(String exchange, int year, int month) {
        String sql = "SELECT * FROM day_data WHERE year=? AND month=? AND exchange=?";
        return jdbcTemplate.query(sql, new Object[]{year, month, exchange}, new RowMapper<BtcMonthData>(){
            @Nullable
            @Override
            public BtcMonthData mapRow(ResultSet resultSet, int i) throws SQLException {
                BtcMonthData btcMonthData = constructMonthData(resultSet);
                return btcMonthData;
            }
        });
    }

    @Override
    public List<BtcMonthData> getMonthDataByMonths(String exchange, int year, int[] months) {
        String sql = "SELECT * FROM month_data WHERE year=? AND month=? AND exchange=?";
        List<BtcMonthData> results = new ArrayList<>();
        for (int i=0; i < months.length; i++) {
            List<BtcMonthData> singleResults = jdbcTemplate.query(sql, new Object[]{year, months[i], exchange}, new RowMapper<BtcMonthData>() {
                @Nullable
                @Override
                public BtcMonthData mapRow(ResultSet resultSet, int i) throws SQLException {
                    return constructMonthData(resultSet);
                }
            });
            results.addAll(singleResults);
        }
        return results;
    }

    @Override
    public List<BtcMonthData> getAllMonthDatas(String exchange) {
        String sql = "SELECT * FROM month_data WHERE exchange=?";
        return jdbcTemplate.query(sql, new Object[]{exchange},new RowMapper<BtcMonthData>() {
            @Nullable
            @Override
            public BtcMonthData mapRow(ResultSet resultSet, int i) throws SQLException {
                return constructMonthData(resultSet);
            }
        });
    }
//
//    @Override
//    public List<BtcMonthData> getMonthDataByMonth(int year, int month) {
//        return null;
//    }
//
//    @Override
//    public List<BtcMonthData> getMonthDataByMonths(int year, int[] months) {
//        return null;
//    }

    @Override
    public List<BtcMonthData> getAllMonthDatas() {
        String sql = "SELECT * FROM month_data";
        return jdbcTemplate.query(sql, new RowMapper<BtcMonthData>() {
            @Nullable
            @Override
            public BtcMonthData mapRow(ResultSet resultSet, int i) throws SQLException {
                return constructMonthData(resultSet);
            }
        });
    }

    /**
     *
     * @param resultSet
     * @return
     * @throws SQLException
     */
    private BtcDayData constructDayData(ResultSet resultSet) throws SQLException {
        int year = resultSet.getInt("year");
        int month = resultSet.getInt("month");
        int day = resultSet.getInt("day");
        double receivedBtc = resultSet.getDouble("receivedBtc");
        int receivedAmount = resultSet.getInt("receivedAmount");
        double sentBtc = resultSet.getDouble("sentBtc");
        int sentAmount = resultSet.getInt("sentAmount");
        double balance = resultSet.getDouble("balance");
        String exchange = resultSet.getString("exchange");
        BtcDayData btcDayData = new BtcDayData();
        btcDayData.setYear(year);
        btcDayData.setMonth(month);
        btcDayData.setDay(day);
        btcDayData.setReceivedBtc(receivedBtc);
        btcDayData.setReceivedAmount(receivedAmount);
        btcDayData.setSentBtc(sentBtc);
        btcDayData.setSentAmount(sentAmount);
        btcDayData.setBalance(balance);
        btcDayData.setExchange(exchange);
        return btcDayData;
    }

    private BtcMonthData constructMonthData(ResultSet resultSet) throws SQLException {
        int year = resultSet.getInt("year");
        int month = resultSet.getInt("month");
//        int day = resultSet.getInt("day");
        double receivedBtc = resultSet.getDouble("receivedBtc");
        int receivedAmount = resultSet.getInt("receivedAmount");
        double sentBtc = resultSet.getDouble("sentBtc");
        int sentAmount = resultSet.getInt("sentAmount");
        double balance = resultSet.getDouble("balance");
        String exchange = resultSet.getString("exchange");
        BtcMonthData btcDayData = new BtcMonthData();
        btcDayData.setYear(year);
        btcDayData.setMonth(month);
//        btcDayData.setDay(day);
        btcDayData.setReceivedBtc(receivedBtc);
        btcDayData.setReceivedAmount(receivedAmount);
        btcDayData.setSentBtc(sentBtc);
        btcDayData.setSentAmount(sentAmount);
        btcDayData.setBalance(balance);
        btcDayData.setExchange(exchange);
        return btcDayData;
    }


}
