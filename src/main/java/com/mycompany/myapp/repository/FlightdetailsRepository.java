package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Flightdetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Flightdetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightdetailsRepository extends JpaRepository<Flightdetails, Long> {

}
