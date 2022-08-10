package com.quarzumagencia.kya.Security.Models;

public class ChangePassword {

    private String actualPassword;
    private String newPassword;

    public ChangePassword(String actualPassword, String newPassword) {
        this.actualPassword = actualPassword;
        this.newPassword = newPassword;
    }

    public ChangePassword() {
    }

    public String getActualPassword() {
        return actualPassword;
    }

    public void setActualPassword(String actualPassword) {
        this.actualPassword = actualPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
