package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.ItineraryService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.ItineraryDTO;
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
 * REST controller for managing Itinerary.
 */
@RestController
@RequestMapping("/api")
public class ItineraryResource {

    private final Logger log = LoggerFactory.getLogger(ItineraryResource.class);

    private static final String ENTITY_NAME = "itinerary";

    private final ItineraryService itineraryService;

    public ItineraryResource(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    /**
     * POST  /itineraries : Create a new itinerary.
     *
     * @param itineraryDTO the itineraryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new itineraryDTO, or with status 400 (Bad Request) if the itinerary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/itineraries")
    @Timed
    public ResponseEntity<ItineraryDTO> createItinerary(@RequestBody ItineraryDTO itineraryDTO) throws URISyntaxException {
        log.debug("REST request to save Itinerary : {}", itineraryDTO);
        if (itineraryDTO.getId() != null) {
            throw new BadRequestAlertException("A new itinerary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItineraryDTO result = itineraryService.save(itineraryDTO);
        return ResponseEntity.created(new URI("/api/itineraries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /itineraries : Updates an existing itinerary.
     *
     * @param itineraryDTO the itineraryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated itineraryDTO,
     * or with status 400 (Bad Request) if the itineraryDTO is not valid,
     * or with status 500 (Internal Server Error) if the itineraryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/itineraries")
    @Timed
    public ResponseEntity<ItineraryDTO> updateItinerary(@RequestBody ItineraryDTO itineraryDTO) throws URISyntaxException {
        log.debug("REST request to update Itinerary : {}", itineraryDTO);
        if (itineraryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItineraryDTO result = itineraryService.save(itineraryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, itineraryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /itineraries : get all the itineraries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of itineraries in body
     */
    @GetMapping("/itineraries")
    @Timed
    public List<ItineraryDTO> getAllItineraries() {
        log.debug("REST request to get all Itineraries");
        return itineraryService.findAll();
    }

    /**
     * GET  /itineraries/:id : get the "id" itinerary.
     *
     * @param id the id of the itineraryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the itineraryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/itineraries/{id}")
    @Timed
    public ResponseEntity<ItineraryDTO> getItinerary(@PathVariable Long id) {
        log.debug("REST request to get Itinerary : {}", id);
        Optional<ItineraryDTO> itineraryDTO = itineraryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itineraryDTO);
    }

    /**
     * DELETE  /itineraries/:id : delete the "id" itinerary.
     *
     * @param id the id of the itineraryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/itineraries/{id}")
    @Timed
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        log.debug("REST request to delete Itinerary : {}", id);
        itineraryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
