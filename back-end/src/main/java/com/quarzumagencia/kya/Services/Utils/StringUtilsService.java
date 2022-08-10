package com.quarzumagencia.kya.Services.Utils;

import java.util.UUID;

public class StringUtilsService {

    // Method that returns string uuid
    public static String getUuid() {
        return UUID.randomUUID().toString();
    }

}
