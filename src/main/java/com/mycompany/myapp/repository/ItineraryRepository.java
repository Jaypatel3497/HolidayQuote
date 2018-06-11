package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Itinerary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Itinerary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

}
