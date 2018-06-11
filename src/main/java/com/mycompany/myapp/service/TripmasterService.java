package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.TripmasterDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Tripmaster.
 */
public interface TripmasterService {

    /**
     * Save a tripmaster.
     *
     * @param tripmasterDTO the entity to save
     * @return the persisted entity
     */
    TripmasterDTO save(TripmasterDTO tripmasterDTO);

    /**
     * Get all the tripmasters.
     *
     * @return the list of entities
     */
    List<TripmasterDTO> findAll();

    /**
     * Get all the Tripmaster with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<TripmasterDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" tripmaster.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TripmasterDTO> findOne(Long id);

    /**
     * Delete the "id" tripmaster.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
