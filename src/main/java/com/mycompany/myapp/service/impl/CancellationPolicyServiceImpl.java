package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CancellationPolicyService;
import com.mycompany.myapp.domain.CancellationPolicy;
import com.mycompany.myapp.repository.CancellationPolicyRepository;
import com.mycompany.myapp.service.dto.CancellationPolicyDTO;
import com.mycompany.myapp.service.mapper.CancellationPolicyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing CancellationPolicy.
 */
@Service
@Transactional
public class CancellationPolicyServiceImpl implements CancellationPolicyService {

    private final Logger log = LoggerFactory.getLogger(CancellationPolicyServiceImpl.class);

    private final CancellationPolicyRepository cancellationPolicyRepository;

    private final CancellationPolicyMapper cancellationPolicyMapper;

    public CancellationPolicyServiceImpl(CancellationPolicyRepository cancellationPolicyRepository, CancellationPolicyMapper cancellationPolicyMapper) {
        this.cancellationPolicyRepository = cancellationPolicyRepository;
        this.cancellationPolicyMapper = cancellationPolicyMapper;
    }

    /**
     * Save a cancellationPolicy.
     *
     * @param cancellationPolicyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CancellationPolicyDTO save(CancellationPolicyDTO cancellationPolicyDTO) {
        log.debug("Request to save CancellationPolicy : {}", cancellationPolicyDTO);
        CancellationPolicy cancellationPolicy = cancellationPolicyMapper.toEntity(cancellationPolicyDTO);
        cancellationPolicy = cancellationPolicyRepository.save(cancellationPolicy);
        return cancellationPolicyMapper.toDto(cancellationPolicy);
    }

    /**
     * Get all the cancellationPolicies.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CancellationPolicyDTO> findAll() {
        log.debug("Request to get all CancellationPolicies");
        return cancellationPolicyRepository.findAll().stream()
            .map(cancellationPolicyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one cancellationPolicy by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CancellationPolicyDTO> findOne(Long id) {
        log.debug("Request to get CancellationPolicy : {}", id);
        return cancellationPolicyRepository.findById(id)
            .map(cancellationPolicyMapper::toDto);
    }

    /**
     * Delete the cancellationPolicy by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CancellationPolicy : {}", id);
        cancellationPolicyRepository.deleteById(id);
    }
}
