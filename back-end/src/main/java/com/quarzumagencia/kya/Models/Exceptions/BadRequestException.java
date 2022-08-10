package com.quarzumagencia.kya.Models.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException{

    private static final long serialVersionUID = 1L;
    public BadRequestException(String mensaje) {
        super(mensaje);
    }
}
