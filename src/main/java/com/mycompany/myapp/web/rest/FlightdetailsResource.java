package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.FlightdetailsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.FlightdetailsDTO;
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
 * REST controller for managing Flightdetails.
 */
@RestController
@RequestMapping("/api")
public class FlightdetailsResource {

    private final Logger log = LoggerFactory.getLogger(FlightdetailsResource.class);

    private static final String ENTITY_NAME = "flightdetails";

    private final FlightdetailsService flightdetailsService;

    public FlightdetailsResource(FlightdetailsService flightdetailsService) {
        this.flightdetailsService = flightdetailsService;
    }

    /**
     * POST  /flightdetails : Create a new flightdetails.
     *
     * @param flightdetailsDTO the flightdetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightdetailsDTO, or with status 400 (Bad Request) if the flightdetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flightdetails")
    @Timed
    public ResponseEntity<FlightdetailsDTO> createFlightdetails(@RequestBody FlightdetailsDTO flightdetailsDTO) throws URISyntaxException {
        log.debug("REST request to save Flightdetails : {}", flightdetailsDTO);
        if (flightdetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new flightdetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightdetailsDTO result = flightdetailsService.save(flightdetailsDTO);
        return ResponseEntity.created(new URI("/api/flightdetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flightdetails : Updates an existing flightdetails.
     *
     * @param flightdetailsDTO the flightdetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightdetailsDTO,
     * or with status 400 (Bad Request) if the flightdetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the flightdetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flightdetails")
    @Timed
    public ResponseEntity<FlightdetailsDTO> updateFlightdetails(@RequestBody FlightdetailsDTO flightdetailsDTO) throws URISyntaxException {
        log.debug("REST request to update Flightdetails : {}", flightdetailsDTO);
        if (flightdetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightdetailsDTO result = flightdetailsService.save(flightdetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightdetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flightdetails : get all the flightdetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightdetails in body
     */
    @GetMapping("/flightdetails")
    @Timed
    public List<FlightdetailsDTO> getAllFlightdetails() {
        log.debug("REST request to get all Flightdetails");
        return flightdetailsService.findAll();
    }

    /**
     * GET  /flightdetails/:id : get the "id" flightdetails.
     *
     * @param id the id of the flightdetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightdetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/flightdetails/{id}")
    @Timed
    public ResponseEntity<FlightdetailsDTO> getFlightdetails(@PathVariable Long id) {
        log.debug("REST request to get Flightdetails : {}", id);
        Optional<FlightdetailsDTO> flightdetailsDTO = flightdetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(flightdetailsDTO);
    }

    /**
     * DELETE  /flightdetails/:id : delete the "id" flightdetails.
     *
     * @param id the id of the flightdetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flightdetails/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightdetails(@PathVariable Long id) {
        log.debug("REST request to delete Flightdetails : {}", id);
        flightdetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
