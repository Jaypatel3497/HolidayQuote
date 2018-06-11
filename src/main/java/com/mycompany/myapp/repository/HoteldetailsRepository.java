package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Hoteldetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Hoteldetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoteldetailsRepository extends JpaRepository<Hoteldetails, Long> {

}
