package com.quarzumagencia.kya.Controllers;

import com.quarzumagencia.kya.Entities.Domain;
import com.quarzumagencia.kya.Entities.Extends.DomainExtends;
import com.quarzumagencia.kya.Services.Entity.Domain.IDomainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/domain")
public class DomainController {

    @Autowired
    private IDomainService domainService;

    @GetMapping("/get-domains")
    public List<DomainExtends> getDomains() {
        return domainService.getDomains();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get-all-domains")
    public List<DomainExtends> getAllDomains() {
        return domainService.getAllDomains();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/register-domain")
    public void registerDomain(@RequestBody DomainExtends domain) {
        domainService.registerDomain(domain);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/update-domain")
    public void updateDomain(@RequestBody DomainExtends domain) {
        domainService.updateDomain(domain);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/delete-domain")
    public void deleteDomain(@RequestBody DomainExtends domain) {
        domainService.deleteDomain(domain);
    }

}
