package com.quarzumagencia.kya.Security.Models;

public class ResetPassword {

    private String uuid;
    private String newPassword;

    public ResetPassword(String uuid, String newPassword) {
        this.uuid = uuid;
        this.newPassword = newPassword;
    }

    public ResetPassword() {
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
