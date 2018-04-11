package com.demisstif.btcbackend.model;

public class BtcDayData {
    private int year ;
    private int month;
    private int day;
    private double receivedBtc;
    private int receivedAmount;
    private  double sentBtc;
    private int sentAmount;
    private double balance;
    private String exchange;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public double getReceivedBtc() {
        return receivedBtc;
    }

    public void setReceivedBtc(double receivedBtc) {
        this.receivedBtc = receivedBtc;
    }

    public int getReceivedAmount() {
        return receivedAmount;
    }

    public void setReceivedAmount(int receivedAmount) {
        this.receivedAmount = receivedAmount;
    }

    public double getSentBtc() {
        return sentBtc;
    }

    public void setSentBtc(double sentBtc) {
        this.sentBtc = sentBtc;
    }

    public int getSentAmount() {
        return sentAmount;
    }

    public void setSentAmount(int sentAmount) {
        this.sentAmount = sentAmount;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }
}
