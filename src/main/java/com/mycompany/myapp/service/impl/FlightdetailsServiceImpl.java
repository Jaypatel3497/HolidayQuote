package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.FlightdetailsService;
import com.mycompany.myapp.domain.Flightdetails;
import com.mycompany.myapp.repository.FlightdetailsRepository;
import com.mycompany.myapp.service.dto.FlightdetailsDTO;
import com.mycompany.myapp.service.mapper.FlightdetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Flightdetails.
 */
@Service
@Transactional
public class FlightdetailsServiceImpl implements FlightdetailsService {

    private final Logger log = LoggerFactory.getLogger(FlightdetailsServiceImpl.class);

    private final FlightdetailsRepository flightdetailsRepository;

    private final FlightdetailsMapper flightdetailsMapper;

    public FlightdetailsServiceImpl(FlightdetailsRepository flightdetailsRepository, FlightdetailsMapper flightdetailsMapper) {
        this.flightdetailsRepository = flightdetailsRepository;
        this.flightdetailsMapper = flightdetailsMapper;
    }

    /**
     * Save a flightdetails.
     *
     * @param flightdetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FlightdetailsDTO save(FlightdetailsDTO flightdetailsDTO) {
        log.debug("Request to save Flightdetails : {}", flightdetailsDTO);
        Flightdetails flightdetails = flightdetailsMapper.toEntity(flightdetailsDTO);
        flightdetails = flightdetailsRepository.save(flightdetails);
        return flightdetailsMapper.toDto(flightdetails);
    }

    /**
     * Get all the flightdetails.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FlightdetailsDTO> findAll() {
        log.debug("Request to get all Flightdetails");
        return flightdetailsRepository.findAll().stream()
            .map(flightdetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one flightdetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FlightdetailsDTO> findOne(Long id) {
        log.debug("Request to get Flightdetails : {}", id);
        return flightdetailsRepository.findById(id)
            .map(flightdetailsMapper::toDto);
    }

    /**
     * Delete the flightdetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Flightdetails : {}", id);
        flightdetailsRepository.deleteById(id);
    }
}
