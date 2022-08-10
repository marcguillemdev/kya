package com.quarzumagencia.kya.Models.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class GenericException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public GenericException(String mensaje) {
        super(mensaje);
    }

}
