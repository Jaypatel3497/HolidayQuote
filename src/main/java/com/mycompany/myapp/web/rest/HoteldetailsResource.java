package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.HoteldetailsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.HoteldetailsDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hoteldetails.
 */
@RestController
@RequestMapping("/api")
public class HoteldetailsResource {

    private final Logger log = LoggerFactory.getLogger(HoteldetailsResource.class);

    private static final String ENTITY_NAME = "hoteldetails";

    private final HoteldetailsService hoteldetailsService;

    public HoteldetailsResource(HoteldetailsService hoteldetailsService) {
        this.hoteldetailsService = hoteldetailsService;
    }

    /**
     * POST  /hoteldetails : Create a new hoteldetails.
     *
     * @param hoteldetailsDTO the hoteldetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hoteldetailsDTO, or with status 400 (Bad Request) if the hoteldetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hoteldetails")
    @Timed
    public ResponseEntity<HoteldetailsDTO> createHoteldetails(@RequestBody HoteldetailsDTO hoteldetailsDTO) throws URISyntaxException {
        log.debug("REST request to save Hoteldetails : {}", hoteldetailsDTO);
        if (hoteldetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new hoteldetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HoteldetailsDTO result = hoteldetailsService.save(hoteldetailsDTO);
        return ResponseEntity.created(new URI("/api/hoteldetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hoteldetails : Updates an existing hoteldetails.
     *
     * @param hoteldetailsDTO the hoteldetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hoteldetailsDTO,
     * or with status 400 (Bad Request) if the hoteldetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the hoteldetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hoteldetails")
    @Timed
    public ResponseEntity<HoteldetailsDTO> updateHoteldetails(@RequestBody HoteldetailsDTO hoteldetailsDTO) throws URISyntaxException {
        log.debug("REST request to update Hoteldetails : {}", hoteldetailsDTO);
        if (hoteldetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HoteldetailsDTO result = hoteldetailsService.save(hoteldetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hoteldetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hoteldetails : get all the hoteldetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hoteldetails in body
     */
    @GetMapping("/hoteldetails")
    @Timed
    public List<HoteldetailsDTO> getAllHoteldetails() {
        log.debug("REST request to get all Hoteldetails");
        return hoteldetailsService.findAll();
    }

    /**
     * GET  /hoteldetails/:id : get the "id" hoteldetails.
     *
     * @param id the id of the hoteldetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hoteldetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/hoteldetails/{id}")
    @Timed
    public ResponseEntity<HoteldetailsDTO> getHoteldetails(@PathVariable Long id) {
        log.debug("REST request to get Hoteldetails : {}", id);
        Optional<HoteldetailsDTO> hoteldetailsDTO = hoteldetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hoteldetailsDTO);
    }

    /**
     * DELETE  /hoteldetails/:id : delete the "id" hoteldetails.
     *
     * @param id the id of the hoteldetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hoteldetails/{id}")
    @Timed
    public ResponseEntity<Void> deleteHoteldetails(@PathVariable Long id) {
        log.debug("REST request to delete Hoteldetails : {}", id);
        hoteldetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
