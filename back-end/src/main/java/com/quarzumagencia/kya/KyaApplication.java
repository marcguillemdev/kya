package com.quarzumagencia.kya;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.quarzumagencia.kya.Entities.Domain;
import com.quarzumagencia.kya.Entities.Extends.DomainExtends;
import com.quarzumagencia.kya.Repositories.DomainRepository;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Enums.RolNombre;
import com.quarzumagencia.kya.Security.Models.NuevoUsuario;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import com.quarzumagencia.kya.Security.Services.AuthenticationService;
import com.quarzumagencia.kya.Security.Services.UserDetailsServiceImpl;
import com.quarzumagencia.kya.Services.Utils.SpringAutoWireTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.transaction.Transactional;
import java.util.*;

@SpringBootApplication
public class KyaApplication {

	public static void main(String[] args) {
		SpringApplication.run(KyaApplication.class, args);
	}

}
