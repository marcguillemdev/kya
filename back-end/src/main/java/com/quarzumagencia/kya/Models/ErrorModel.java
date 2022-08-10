package com.quarzumagencia.kya.Models;

import java.util.Date;

public class ErrorModel {

    private String description;
    private Date time;
    private String stackTrace;
    private String status;

    public ErrorModel(String description, Date time, String stackTrace, String status) {
        this.description = description;
        this.time = time;
        this.stackTrace = stackTrace;
        this.status = status;
    }

    public ErrorModel() {
        this.time = new Date();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
