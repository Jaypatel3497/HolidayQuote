package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.TermsConditionsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TermsConditions.
 */
public interface TermsConditionsService {

    /**
     * Save a termsConditions.
     *
     * @param termsConditionsDTO the entity to save
     * @return the persisted entity
     */
    TermsConditionsDTO save(TermsConditionsDTO termsConditionsDTO);

    /**
     * Get all the termsConditions.
     *
     * @return the list of entities
     */
    List<TermsConditionsDTO> findAll();


    /**
     * Get the "id" termsConditions.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TermsConditionsDTO> findOne(Long id);

    /**
     * Delete the "id" termsConditions.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
