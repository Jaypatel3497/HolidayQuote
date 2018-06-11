package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.FlightdetailsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Flightdetails.
 */
public interface FlightdetailsService {

    /**
     * Save a flightdetails.
     *
     * @param flightdetailsDTO the entity to save
     * @return the persisted entity
     */
    FlightdetailsDTO save(FlightdetailsDTO flightdetailsDTO);

    /**
     * Get all the flightdetails.
     *
     * @return the list of entities
     */
    List<FlightdetailsDTO> findAll();


    /**
     * Get the "id" flightdetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FlightdetailsDTO> findOne(Long id);

    /**
     * Delete the "id" flightdetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
