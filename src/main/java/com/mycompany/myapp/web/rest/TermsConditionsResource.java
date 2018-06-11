package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.TermsConditionsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.TermsConditionsDTO;
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
 * REST controller for managing TermsConditions.
 */
@RestController
@RequestMapping("/api")
public class TermsConditionsResource {

    private final Logger log = LoggerFactory.getLogger(TermsConditionsResource.class);

    private static final String ENTITY_NAME = "termsConditions";

    private final TermsConditionsService termsConditionsService;

    public TermsConditionsResource(TermsConditionsService termsConditionsService) {
        this.termsConditionsService = termsConditionsService;
    }

    /**
     * POST  /terms-conditions : Create a new termsConditions.
     *
     * @param termsConditionsDTO the termsConditionsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new termsConditionsDTO, or with status 400 (Bad Request) if the termsConditions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/terms-conditions")
    @Timed
    public ResponseEntity<TermsConditionsDTO> createTermsConditions(@RequestBody TermsConditionsDTO termsConditionsDTO) throws URISyntaxException {
        log.debug("REST request to save TermsConditions : {}", termsConditionsDTO);
        if (termsConditionsDTO.getId() != null) {
            throw new BadRequestAlertException("A new termsConditions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TermsConditionsDTO result = termsConditionsService.save(termsConditionsDTO);
        return ResponseEntity.created(new URI("/api/terms-conditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /terms-conditions : Updates an existing termsConditions.
     *
     * @param termsConditionsDTO the termsConditionsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated termsConditionsDTO,
     * or with status 400 (Bad Request) if the termsConditionsDTO is not valid,
     * or with status 500 (Internal Server Error) if the termsConditionsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/terms-conditions")
    @Timed
    public ResponseEntity<TermsConditionsDTO> updateTermsConditions(@RequestBody TermsConditionsDTO termsConditionsDTO) throws URISyntaxException {
        log.debug("REST request to update TermsConditions : {}", termsConditionsDTO);
        if (termsConditionsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TermsConditionsDTO result = termsConditionsService.save(termsConditionsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, termsConditionsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /terms-conditions : get all the termsConditions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of termsConditions in body
     */
    @GetMapping("/terms-conditions")
    @Timed
    public List<TermsConditionsDTO> getAllTermsConditions() {
        log.debug("REST request to get all TermsConditions");
        return termsConditionsService.findAll();
    }

    /**
     * GET  /terms-conditions/:id : get the "id" termsConditions.
     *
     * @param id the id of the termsConditionsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the termsConditionsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/terms-conditions/{id}")
    @Timed
    public ResponseEntity<TermsConditionsDTO> getTermsConditions(@PathVariable Long id) {
        log.debug("REST request to get TermsConditions : {}", id);
        Optional<TermsConditionsDTO> termsConditionsDTO = termsConditionsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(termsConditionsDTO);
    }

    /**
     * DELETE  /terms-conditions/:id : delete the "id" termsConditions.
     *
     * @param id the id of the termsConditionsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/terms-conditions/{id}")
    @Timed
    public ResponseEntity<Void> deleteTermsConditions(@PathVariable Long id) {
        log.debug("REST request to delete TermsConditions : {}", id);
        termsConditionsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
