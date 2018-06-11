package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.HoteldetailsService;
import com.mycompany.myapp.domain.Hoteldetails;
import com.mycompany.myapp.repository.HoteldetailsRepository;
import com.mycompany.myapp.service.dto.HoteldetailsDTO;
import com.mycompany.myapp.service.mapper.HoteldetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Hoteldetails.
 */
@Service
@Transactional
public class HoteldetailsServiceImpl implements HoteldetailsService {

    private final Logger log = LoggerFactory.getLogger(HoteldetailsServiceImpl.class);

    private final HoteldetailsRepository hoteldetailsRepository;

    private final HoteldetailsMapper hoteldetailsMapper;

    public HoteldetailsServiceImpl(HoteldetailsRepository hoteldetailsRepository, HoteldetailsMapper hoteldetailsMapper) {
        this.hoteldetailsRepository = hoteldetailsRepository;
        this.hoteldetailsMapper = hoteldetailsMapper;
    }

    /**
     * Save a hoteldetails.
     *
     * @param hoteldetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public HoteldetailsDTO save(HoteldetailsDTO hoteldetailsDTO) {
        log.debug("Request to save Hoteldetails : {}", hoteldetailsDTO);
        Hoteldetails hoteldetails = hoteldetailsMapper.toEntity(hoteldetailsDTO);
        hoteldetails = hoteldetailsRepository.save(hoteldetails);
        return hoteldetailsMapper.toDto(hoteldetails);
    }

    /**
     * Get all the hoteldetails.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<HoteldetailsDTO> findAll() {
        log.debug("Request to get all Hoteldetails");
        return hoteldetailsRepository.findAll().stream()
            .map(hoteldetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one hoteldetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HoteldetailsDTO> findOne(Long id) {
        log.debug("Request to get Hoteldetails : {}", id);
        return hoteldetailsRepository.findById(id)
            .map(hoteldetailsMapper::toDto);
    }

    /**
     * Delete the hoteldetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Hoteldetails : {}", id);
        hoteldetailsRepository.deleteById(id);
    }
}
