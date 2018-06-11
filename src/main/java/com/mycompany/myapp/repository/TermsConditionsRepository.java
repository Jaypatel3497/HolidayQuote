package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TermsConditions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TermsConditions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TermsConditionsRepository extends JpaRepository<TermsConditions, Long> {

}
