package com.quarzumagencia.kya.Interceptor;

import com.quarzumagencia.kya.Services.Utils.ConsoleLogTool;
import com.quarzumagencia.kya.Services.Utils.SpringAutoWireTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestInterceptor implements HandlerInterceptor {

    @Autowired
    private ConsoleLogTool consoleLogTool;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        this.initializeServices();
        //this.consoleLogTool.logInfo(this.getClass(), "REAL IP -> " + request.getHeader("X-Real-IP") + " REAL IP -> " + request.getHeader("X-Forwarded-For"));
        //this.consoleLogTool.logInfo(this.getClass(), "REQUEST DETECTED -> IP: " + request.getRemoteAddr() + " REQUEST URL -> " + request.getServletPath());
        return true;
    }

    private void initializeServices() {
        if (consoleLogTool == null) {
            consoleLogTool = SpringAutoWireTool.bean(ConsoleLogTool.class);
        }

    }

}
