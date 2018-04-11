package com.demisstif.btcbackend.model;

public class StringBean {
    private String address;
    private double month;
    private double receivedAmount;

    public StringBean(String address, double month, double receivedAmount) {
        this.address = address;
        this.month = month;
        this.receivedAmount = receivedAmount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getMonth() {
        return month;
    }

    public void setMonth(double month) {
        this.month = month;
    }

    public double getReceivedAmount() {
        return receivedAmount;
    }

    public void setReceivedAmount(double receivedAmount) {
        this.receivedAmount = receivedAmount;
    }

    @Override
    public String toString() {
        return "StringBean{" +
                "address='" + address + '\'' +
                ", month=" + month +
                ", receivedAmount=" + receivedAmount +
                '}';
    }
}
