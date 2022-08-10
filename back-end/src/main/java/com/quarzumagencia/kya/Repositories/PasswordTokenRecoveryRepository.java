package com.quarzumagencia.kya.Repositories;

import com.quarzumagencia.kya.Entities.PasswordTokenRecovery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordTokenRecoveryRepository extends JpaRepository<PasswordTokenRecovery, String> {

    boolean existsByUuid(String uuid);
    PasswordTokenRecovery findByUuid(String uuid);

}
