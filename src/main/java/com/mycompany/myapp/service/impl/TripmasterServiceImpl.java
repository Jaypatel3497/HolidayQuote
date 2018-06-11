package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.TripmasterService;
import com.mycompany.myapp.domain.Tripmaster;
import com.mycompany.myapp.repository.TripmasterRepository;
import com.mycompany.myapp.service.dto.TripmasterDTO;
import com.mycompany.myapp.service.mapper.TripmasterMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Tripmaster.
 */
@Service
@Transactional
public class TripmasterServiceImpl implements TripmasterService {

    private final Logger log = LoggerFactory.getLogger(TripmasterServiceImpl.class);

    private final TripmasterRepository tripmasterRepository;

    private final TripmasterMapper tripmasterMapper;

    public TripmasterServiceImpl(TripmasterRepository tripmasterRepository, TripmasterMapper tripmasterMapper) {
        this.tripmasterRepository = tripmasterRepository;
        this.tripmasterMapper = tripmasterMapper;
    }

    /**
     * Save a tripmaster.
     *
     * @param tripmasterDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TripmasterDTO save(TripmasterDTO tripmasterDTO) {
        log.debug("Request to save Tripmaster : {}", tripmasterDTO);
        Tripmaster tripmaster = tripmasterMapper.toEntity(tripmasterDTO);
        tripmaster = tripmasterRepository.save(tripmaster);
        return tripmasterMapper.toDto(tripmaster);
    }

    /**
     * Get all the tripmasters.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TripmasterDTO> findAll() {
        log.debug("Request to get all Tripmasters");
        return tripmasterRepository.findAllWithEagerRelationships().stream()
            .map(tripmasterMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the Tripmaster with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<TripmasterDTO> findAllWithEagerRelationships(Pageable pageable) {
        return tripmasterRepository.findAllWithEagerRelationships(pageable).map(tripmasterMapper::toDto);
    }
    

    /**
     * Get one tripmaster by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TripmasterDTO> findOne(Long id) {
        log.debug("Request to get Tripmaster : {}", id);
        return tripmasterRepository.findOneWithEagerRelationships(id)
            .map(tripmasterMapper::toDto);
    }

    /**
     * Delete the tripmaster by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tripmaster : {}", id);
        tripmasterRepository.deleteById(id);
    }
}
