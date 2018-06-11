package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.CancellationPolicyService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.CancellationPolicyDTO;
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
 * REST controller for managing CancellationPolicy.
 */
@RestController
@RequestMapping("/api")
public class CancellationPolicyResource {

    private final Logger log = LoggerFactory.getLogger(CancellationPolicyResource.class);

    private static final String ENTITY_NAME = "cancellationPolicy";

    private final CancellationPolicyService cancellationPolicyService;

    public CancellationPolicyResource(CancellationPolicyService cancellationPolicyService) {
        this.cancellationPolicyService = cancellationPolicyService;
    }

    /**
     * POST  /cancellation-policies : Create a new cancellationPolicy.
     *
     * @param cancellationPolicyDTO the cancellationPolicyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cancellationPolicyDTO, or with status 400 (Bad Request) if the cancellationPolicy has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cancellation-policies")
    @Timed
    public ResponseEntity<CancellationPolicyDTO> createCancellationPolicy(@RequestBody CancellationPolicyDTO cancellationPolicyDTO) throws URISyntaxException {
        log.debug("REST request to save CancellationPolicy : {}", cancellationPolicyDTO);
        if (cancellationPolicyDTO.getId() != null) {
            throw new BadRequestAlertException("A new cancellationPolicy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CancellationPolicyDTO result = cancellationPolicyService.save(cancellationPolicyDTO);
        return ResponseEntity.created(new URI("/api/cancellation-policies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cancellation-policies : Updates an existing cancellationPolicy.
     *
     * @param cancellationPolicyDTO the cancellationPolicyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cancellationPolicyDTO,
     * or with status 400 (Bad Request) if the cancellationPolicyDTO is not valid,
     * or with status 500 (Internal Server Error) if the cancellationPolicyDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cancellation-policies")
    @Timed
    public ResponseEntity<CancellationPolicyDTO> updateCancellationPolicy(@RequestBody CancellationPolicyDTO cancellationPolicyDTO) throws URISyntaxException {
        log.debug("REST request to update CancellationPolicy : {}", cancellationPolicyDTO);
        if (cancellationPolicyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CancellationPolicyDTO result = cancellationPolicyService.save(cancellationPolicyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cancellationPolicyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cancellation-policies : get all the cancellationPolicies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cancellationPolicies in body
     */
    @GetMapping("/cancellation-policies")
    @Timed
    public List<CancellationPolicyDTO> getAllCancellationPolicies() {
        log.debug("REST request to get all CancellationPolicies");
        return cancellationPolicyService.findAll();
    }

    /**
     * GET  /cancellation-policies/:id : get the "id" cancellationPolicy.
     *
     * @param id the id of the cancellationPolicyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cancellationPolicyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cancellation-policies/{id}")
    @Timed
    public ResponseEntity<CancellationPolicyDTO> getCancellationPolicy(@PathVariable Long id) {
        log.debug("REST request to get CancellationPolicy : {}", id);
        Optional<CancellationPolicyDTO> cancellationPolicyDTO = cancellationPolicyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cancellationPolicyDTO);
    }

    /**
     * DELETE  /cancellation-policies/:id : delete the "id" cancellationPolicy.
     *
     * @param id the id of the cancellationPolicyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cancellation-policies/{id}")
    @Timed
    public ResponseEntity<Void> deleteCancellationPolicy(@PathVariable Long id) {
        log.debug("REST request to delete CancellationPolicy : {}", id);
        cancellationPolicyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
