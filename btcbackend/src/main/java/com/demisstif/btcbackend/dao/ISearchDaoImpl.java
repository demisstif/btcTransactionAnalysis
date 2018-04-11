package com.demisstif.btcbackend.dao;

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
    public Long monthTotalReceived(Integer year, Integer month) {
        return null;
    }

    @Override
    public Long dayTotalReceived(Integer year, Integer month, Integer day) {
        return null;
    }

    @Override
    public Long monthTotalSent(Integer year, Integer month) {
        return null;
    }

    @Override
    public Long dayTotalSent(Integer year, Integer month, Integer day) {
        return null;
    }

    @Override
    public HotDegree dayTransactionNumber(int year, int month, int day) {
        String sql = "SELECT count(txid) AS day_number, day(max(date)) AS day FROM transaction WHERE year(date)=? AND month(date)=? AND day(date)=?";
//        jdbcTemplate.query(sql, new Object[]{year, month, day}, RowMapper<Integer>(){})
        return jdbcTemplate.queryForObject(sql, new Object[]{year, month, day},new RowMapper<HotDegree>(){
            @Nullable
            @Override
            public HotDegree mapRow(ResultSet resultSet, int i) throws SQLException {
                int day_number = resultSet.getInt("day_number");
                int day = resultSet.getInt("day");

                return new HotDegree(day_number, day);
            }
        });
    }

    @Override
    public List<Long> getDayReceivedBtc(int year, int month) {
        String sql_orgin = "SELECT sum(received_amount) AS day_total,day(max(date)) AS day" +
                " FROM transaction" +
                " WHERE year(date)=2018 AND month(date)="+month+" AND day(date)=? AND type=0";
        StringBuilder stringBuilder = new StringBuilder();
        int dayAmount = 31;
        for (int i = 1 ; i <=dayAmount; i++) {
            String sql = sql_orgin.replaceAll("\\?", String.valueOf(i));
            if (i == dayAmount) {
                stringBuilder.append(sql);
            } else {
                stringBuilder.append(sql);
                stringBuilder.append(" union ");
            }
        }
        return jdbcTemplate.query(stringBuilder.toString(), new RowMapper<Long>(){
            @Nullable
            @Override
            public Long mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getLong("day_total");
            }
        });
    }

    @Override
    public HotDegree getHotMonth(int year, int month) {
        String sql = "SELECT count(txid) AS month_number, month(max(date)) AS month FROM transaction WHERE year(date)=? AND month(date)=?";
        return jdbcTemplate.queryForObject(sql, new Object[]{year, month},new RowMapper<HotDegree>(){
            @Nullable
            @Override
            public HotDegree mapRow(ResultSet resultSet, int i) throws SQLException {
                int day_number = resultSet.getInt("month_number");
                int day = resultSet.getInt("month");
                return new HotDegree(day_number, day);
            }
        });
    }

    @Override
    public HotDegree receivedOrSentMonthAmount(int year, int month, int type, String exchange) {
        String sql = "";
        if (type == 0) {
            sql = "SELECT count(txid) AS month_number, month(max(date)) AS month FROM transaction WHERE exchange=? type=0 AND year(date)=? AND month(date)=? ";
        } else {

            sql = "SELECT count(txid) AS month_number, month(max(date)) AS month FROM transaction WHERE exchange=? type=1 AND year(date)=? AND month(date)=?";

        }
        return jdbcTemplate.queryForObject(sql, new Object[]{exchange, year, month},new RowMapper<HotDegree>(){
            @Nullable
            @Override
            public HotDegree mapRow(ResultSet resultSet, int i) throws SQLException {
                int day_number = resultSet.getInt("month_number");
                int day = resultSet.getInt("month");
                return new HotDegree(day_number, day);
            }
        });
    }

    @Override
    public HotDegree receivedOrSentMonthBtc(int year, int month, int type, String exchange) {
        String sql = "";
        if (type == 0) {
            sql = "SELECT sum(received_amount) AS month_btc, month(max(date)) AS month FROM transaction WHERE exchange=? AND type=0 AND year(date)=? AND month(date)=? ";
        } else if (type == 1){

            sql = "SELECT sum(sent_amount) AS month_btc, month(max(date)) AS month FROM transaction WHERE exchange=? AND type=1 AND year(date)=? AND month(date)=? ";
        }
        return jdbcTemplate.queryForObject(sql, new Object[]{exchange, year, month},new RowMapper<HotDegree>(){
            @Nullable
            @Override
            public HotDegree mapRow(ResultSet resultSet, int i) throws SQLException {
                double day_number = resultSet.getDouble("month_btc");
                double day = resultSet.getDouble("month");
                return new HotDegree(day_number, day);
            }
        });
    }

    @Override
    public HotDegree getBalanceOneMonth(int year, int month, String exchange) {
        String sql = "SELECT balance, month(date) AS month FROM transaction  WHERE  exchange=? AND year(date)=? and month(date)=? ORDER BY date DESC LIMIT 1";
        return jdbcTemplate.queryForObject(sql, new Object[]{exchange, year, month},new RowMapper<HotDegree>(){
            @Nullable
            @Override
            public HotDegree mapRow(ResultSet resultSet, int i) throws SQLException {
                double balance = resultSet.getDouble("balance");
                double month = resultSet.getDouble("month");
                return new HotDegree(balance, month);
            }
        });
    }

    @Override
    public List<StringBean> getMaxReceivedMonth(int year, int month, int limit, String exchange) {
        String sql = "SELECT received_amount, received_from, month(date) AS month FROM transaction  WHERE  exchange=? AND year(date)=? AND month(date)=? ORDER BY received_amount DESC LIMIT ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{exchange, year, month, limit}, new RowMapper<List<StringBean>>() {
            @Nullable
            @Override
            public List<StringBean> mapRow(ResultSet resultSet, int i) throws SQLException {
                List<StringBean> results = new ArrayList<>();
                resultSet.beforeFirst();
                while (resultSet.next()) {
                    double received_amount = resultSet.getDouble("received_amount");
                    String received_from = resultSet.getString("received_from");
                    double month = resultSet.getDouble("month");
                    StringBean single = new StringBean(received_from, month, received_amount);
                    results.add(single);
                }
                return results;
            }
        });
    }
}
