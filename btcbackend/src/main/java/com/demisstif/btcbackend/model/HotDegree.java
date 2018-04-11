package com.demisstif.btcbackend.model;

public class HotDegree {
    private double txNumberOneDay;
    private double day;

    public HotDegree(double txNumberOneDay, double day) {
        this.txNumberOneDay = txNumberOneDay;
        this.day = day;
    }

    public double getTxNumberOneDay() {
        return txNumberOneDay;
    }

    public void setTxNumberOneDay(int txNumberOneDay) {
        this.txNumberOneDay = txNumberOneDay;
    }

    public double getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "HotDegree{" +
                "txNumberOneDay=" + txNumberOneDay +
                ", day=" + day +
                '}';
    }

}
