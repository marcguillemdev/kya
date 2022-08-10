package com.quarzumagencia.kya.Security.Models;

import java.io.Serializable;

public class ForgotPassword implements Serializable {

    private String email;

    public ForgotPassword(String email) {
        this.email = email;
    }

    public ForgotPassword() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
