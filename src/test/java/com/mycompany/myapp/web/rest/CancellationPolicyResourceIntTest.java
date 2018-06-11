package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App4App;

import com.mycompany.myapp.domain.CancellationPolicy;
import com.mycompany.myapp.repository.CancellationPolicyRepository;
import com.mycompany.myapp.service.CancellationPolicyService;
import com.mycompany.myapp.service.dto.CancellationPolicyDTO;
import com.mycompany.myapp.service.mapper.CancellationPolicyMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CancellationPolicyResource REST controller.
 *
 * @see CancellationPolicyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App4App.class)
public class CancellationPolicyResourceIntTest {

    private static final String DEFAULT_DESCRITPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRITPTION = "BBBBBBBBBB";

    @Autowired
    private CancellationPolicyRepository cancellationPolicyRepository;


    @Autowired
    private CancellationPolicyMapper cancellationPolicyMapper;
    

    @Autowired
    private CancellationPolicyService cancellationPolicyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCancellationPolicyMockMvc;

    private CancellationPolicy cancellationPolicy;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CancellationPolicyResource cancellationPolicyResource = new CancellationPolicyResource(cancellationPolicyService);
        this.restCancellationPolicyMockMvc = MockMvcBuilders.standaloneSetup(cancellationPolicyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CancellationPolicy createEntity(EntityManager em) {
        CancellationPolicy cancellationPolicy = new CancellationPolicy()
            .descritption(DEFAULT_DESCRITPTION);
        return cancellationPolicy;
    }

    @Before
    public void initTest() {
        cancellationPolicy = createEntity(em);
    }

    @Test
    @Transactional
    public void createCancellationPolicy() throws Exception {
        int databaseSizeBeforeCreate = cancellationPolicyRepository.findAll().size();

        // Create the CancellationPolicy
        CancellationPolicyDTO cancellationPolicyDTO = cancellationPolicyMapper.toDto(cancellationPolicy);
        restCancellationPolicyMockMvc.perform(post("/api/cancellation-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancellationPolicyDTO)))
            .andExpect(status().isCreated());

        // Validate the CancellationPolicy in the database
        List<CancellationPolicy> cancellationPolicyList = cancellationPolicyRepository.findAll();
        assertThat(cancellationPolicyList).hasSize(databaseSizeBeforeCreate + 1);
        CancellationPolicy testCancellationPolicy = cancellationPolicyList.get(cancellationPolicyList.size() - 1);
        assertThat(testCancellationPolicy.getDescritption()).isEqualTo(DEFAULT_DESCRITPTION);
    }

    @Test
    @Transactional
    public void createCancellationPolicyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cancellationPolicyRepository.findAll().size();

        // Create the CancellationPolicy with an existing ID
        cancellationPolicy.setId(1L);
        CancellationPolicyDTO cancellationPolicyDTO = cancellationPolicyMapper.toDto(cancellationPolicy);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCancellationPolicyMockMvc.perform(post("/api/cancellation-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancellationPolicyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CancellationPolicy in the database
        List<CancellationPolicy> cancellationPolicyList = cancellationPolicyRepository.findAll();
        assertThat(cancellationPolicyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCancellationPolicies() throws Exception {
        // Initialize the database
        cancellationPolicyRepository.saveAndFlush(cancellationPolicy);

        // Get all the cancellationPolicyList
        restCancellationPolicyMockMvc.perform(get("/api/cancellation-policies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cancellationPolicy.getId().intValue())))
            .andExpect(jsonPath("$.[*].descritption").value(hasItem(DEFAULT_DESCRITPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getCancellationPolicy() throws Exception {
        // Initialize the database
        cancellationPolicyRepository.saveAndFlush(cancellationPolicy);

        // Get the cancellationPolicy
        restCancellationPolicyMockMvc.perform(get("/api/cancellation-policies/{id}", cancellationPolicy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cancellationPolicy.getId().intValue()))
            .andExpect(jsonPath("$.descritption").value(DEFAULT_DESCRITPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCancellationPolicy() throws Exception {
        // Get the cancellationPolicy
        restCancellationPolicyMockMvc.perform(get("/api/cancellation-policies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCancellationPolicy() throws Exception {
        // Initialize the database
        cancellationPolicyRepository.saveAndFlush(cancellationPolicy);

        int databaseSizeBeforeUpdate = cancellationPolicyRepository.findAll().size();

        // Update the cancellationPolicy
        CancellationPolicy updatedCancellationPolicy = cancellationPolicyRepository.findById(cancellationPolicy.getId()).get();
        // Disconnect from session so that the updates on updatedCancellationPolicy are not directly saved in db
        em.detach(updatedCancellationPolicy);
        updatedCancellationPolicy
            .descritption(UPDATED_DESCRITPTION);
        CancellationPolicyDTO cancellationPolicyDTO = cancellationPolicyMapper.toDto(updatedCancellationPolicy);

        restCancellationPolicyMockMvc.perform(put("/api/cancellation-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancellationPolicyDTO)))
            .andExpect(status().isOk());

        // Validate the CancellationPolicy in the database
        List<CancellationPolicy> cancellationPolicyList = cancellationPolicyRepository.findAll();
        assertThat(cancellationPolicyList).hasSize(databaseSizeBeforeUpdate);
        CancellationPolicy testCancellationPolicy = cancellationPolicyList.get(cancellationPolicyList.size() - 1);
        assertThat(testCancellationPolicy.getDescritption()).isEqualTo(UPDATED_DESCRITPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCancellationPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cancellationPolicyRepository.findAll().size();

        // Create the CancellationPolicy
        CancellationPolicyDTO cancellationPolicyDTO = cancellationPolicyMapper.toDto(cancellationPolicy);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCancellationPolicyMockMvc.perform(put("/api/cancellation-policies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancellationPolicyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CancellationPolicy in the database
        List<CancellationPolicy> cancellationPolicyList = cancellationPolicyRepository.findAll();
        assertThat(cancellationPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCancellationPolicy() throws Exception {
        // Initialize the database
        cancellationPolicyRepository.saveAndFlush(cancellationPolicy);

        int databaseSizeBeforeDelete = cancellationPolicyRepository.findAll().size();

        // Get the cancellationPolicy
        restCancellationPolicyMockMvc.perform(delete("/api/cancellation-policies/{id}", cancellationPolicy.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CancellationPolicy> cancellationPolicyList = cancellationPolicyRepository.findAll();
        assertThat(cancellationPolicyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CancellationPolicy.class);
        CancellationPolicy cancellationPolicy1 = new CancellationPolicy();
        cancellationPolicy1.setId(1L);
        CancellationPolicy cancellationPolicy2 = new CancellationPolicy();
        cancellationPolicy2.setId(cancellationPolicy1.getId());
        assertThat(cancellationPolicy1).isEqualTo(cancellationPolicy2);
        cancellationPolicy2.setId(2L);
        assertThat(cancellationPolicy1).isNotEqualTo(cancellationPolicy2);
        cancellationPolicy1.setId(null);
        assertThat(cancellationPolicy1).isNotEqualTo(cancellationPolicy2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CancellationPolicyDTO.class);
        CancellationPolicyDTO cancellationPolicyDTO1 = new CancellationPolicyDTO();
        cancellationPolicyDTO1.setId(1L);
        CancellationPolicyDTO cancellationPolicyDTO2 = new CancellationPolicyDTO();
        assertThat(cancellationPolicyDTO1).isNotEqualTo(cancellationPolicyDTO2);
        cancellationPolicyDTO2.setId(cancellationPolicyDTO1.getId());
        assertThat(cancellationPolicyDTO1).isEqualTo(cancellationPolicyDTO2);
        cancellationPolicyDTO2.setId(2L);
        assertThat(cancellationPolicyDTO1).isNotEqualTo(cancellationPolicyDTO2);
        cancellationPolicyDTO1.setId(null);
        assertThat(cancellationPolicyDTO1).isNotEqualTo(cancellationPolicyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cancellationPolicyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cancellationPolicyMapper.fromId(null)).isNull();
    }
}
