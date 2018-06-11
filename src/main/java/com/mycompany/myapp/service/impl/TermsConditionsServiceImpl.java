package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TermsConditionsService;
import com.mycompany.myapp.domain.TermsConditions;
import com.mycompany.myapp.repository.TermsConditionsRepository;
import com.mycompany.myapp.service.dto.TermsConditionsDTO;
import com.mycompany.myapp.service.mapper.TermsConditionsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing TermsConditions.
 */
@Service
@Transactional
public class TermsConditionsServiceImpl implements TermsConditionsService {

    private final Logger log = LoggerFactory.getLogger(TermsConditionsServiceImpl.class);

    private final TermsConditionsRepository termsConditionsRepository;

    private final TermsConditionsMapper termsConditionsMapper;

    public TermsConditionsServiceImpl(TermsConditionsRepository termsConditionsRepository, TermsConditionsMapper termsConditionsMapper) {
        this.termsConditionsRepository = termsConditionsRepository;
        this.termsConditionsMapper = termsConditionsMapper;
    }

    /**
     * Save a termsConditions.
     *
     * @param termsConditionsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TermsConditionsDTO save(TermsConditionsDTO termsConditionsDTO) {
        log.debug("Request to save TermsConditions : {}", termsConditionsDTO);
        TermsConditions termsConditions = termsConditionsMapper.toEntity(termsConditionsDTO);
        termsConditions = termsConditionsRepository.save(termsConditions);
        return termsConditionsMapper.toDto(termsConditions);
    }

    /**
     * Get all the termsConditions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TermsConditionsDTO> findAll() {
        log.debug("Request to get all TermsConditions");
        return termsConditionsRepository.findAll().stream()
            .map(termsConditionsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one termsConditions by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TermsConditionsDTO> findOne(Long id) {
        log.debug("Request to get TermsConditions : {}", id);
        return termsConditionsRepository.findById(id)
            .map(termsConditionsMapper::toDto);
    }

    /**
     * Delete the termsConditions by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TermsConditions : {}", id);
        termsConditionsRepository.deleteById(id);
    }
}
