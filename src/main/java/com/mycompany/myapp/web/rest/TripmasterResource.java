package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.TripmasterService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.TripmasterDTO;
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
 * REST controller for managing Tripmaster.
 */
@RestController
@RequestMapping("/api")
public class TripmasterResource {

    private final Logger log = LoggerFactory.getLogger(TripmasterResource.class);

    private static final String ENTITY_NAME = "tripmaster";

    private final TripmasterService tripmasterService;

    public TripmasterResource(TripmasterService tripmasterService) {
        this.tripmasterService = tripmasterService;
    }

    /**
     * POST  /tripmasters : Create a new tripmaster.
     *
     * @param tripmasterDTO the tripmasterDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tripmasterDTO, or with status 400 (Bad Request) if the tripmaster has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tripmasters")
    @Timed
    public ResponseEntity<TripmasterDTO> createTripmaster(@RequestBody TripmasterDTO tripmasterDTO) throws URISyntaxException {
        log.debug("REST request to save Tripmaster : {}", tripmasterDTO);
        if (tripmasterDTO.getId() != null) {
            throw new BadRequestAlertException("A new tripmaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TripmasterDTO result = tripmasterService.save(tripmasterDTO);
        return ResponseEntity.created(new URI("/api/tripmasters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tripmasters : Updates an existing tripmaster.
     *
     * @param tripmasterDTO the tripmasterDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tripmasterDTO,
     * or with status 400 (Bad Request) if the tripmasterDTO is not valid,
     * or with status 500 (Internal Server Error) if the tripmasterDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tripmasters")
    @Timed
    public ResponseEntity<TripmasterDTO> updateTripmaster(@RequestBody TripmasterDTO tripmasterDTO) throws URISyntaxException {
        log.debug("REST request to update Tripmaster : {}", tripmasterDTO);
        if (tripmasterDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TripmasterDTO result = tripmasterService.save(tripmasterDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tripmasterDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tripmasters : get all the tripmasters.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of tripmasters in body
     */
    @GetMapping("/tripmasters")
    @Timed
    public List<TripmasterDTO> getAllTripmasters(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Tripmasters");
        return tripmasterService.findAll();
    }

    /**
     * GET  /tripmasters/:id : get the "id" tripmaster.
     *
     * @param id the id of the tripmasterDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tripmasterDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tripmasters/{id}")
    @Timed
    public ResponseEntity<TripmasterDTO> getTripmaster(@PathVariable Long id) {
        log.debug("REST request to get Tripmaster : {}", id);
        Optional<TripmasterDTO> tripmasterDTO = tripmasterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tripmasterDTO);
    }

    /**
     * DELETE  /tripmasters/:id : delete the "id" tripmaster.
     *
     * @param id the id of the tripmasterDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tripmasters/{id}")
    @Timed
    public ResponseEntity<Void> deleteTripmaster(@PathVariable Long id) {
        log.debug("REST request to delete Tripmaster : {}", id);
        tripmasterService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
