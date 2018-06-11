package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.HoteldetailsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Hoteldetails.
 */
public interface HoteldetailsService {

    /**
     * Save a hoteldetails.
     *
     * @param hoteldetailsDTO the entity to save
     * @return the persisted entity
     */
    HoteldetailsDTO save(HoteldetailsDTO hoteldetailsDTO);

    /**
     * Get all the hoteldetails.
     *
     * @return the list of entities
     */
    List<HoteldetailsDTO> findAll();


    /**
     * Get the "id" hoteldetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HoteldetailsDTO> findOne(Long id);

    /**
     * Delete the "id" hoteldetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
