package com.quarzumagencia.kya.Configuration;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

//@Configuration
public class JackObjectMapperConfiguration {

    /*@Bean
    public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
        ObjectMapper objectMapper = new ObjectMapper();
        return builder -> builder.configure(
                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false));

    }*/

}
