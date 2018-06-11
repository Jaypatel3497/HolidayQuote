package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App4App;

import com.mycompany.myapp.domain.TermsConditions;
import com.mycompany.myapp.repository.TermsConditionsRepository;
import com.mycompany.myapp.service.TermsConditionsService;
import com.mycompany.myapp.service.dto.TermsConditionsDTO;
import com.mycompany.myapp.service.mapper.TermsConditionsMapper;
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
 * Test class for the TermsConditionsResource REST controller.
 *
 * @see TermsConditionsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App4App.class)
public class TermsConditionsResourceIntTest {

    private static final String DEFAULT_DESCRITPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRITPTION = "BBBBBBBBBB";

    @Autowired
    private TermsConditionsRepository termsConditionsRepository;


    @Autowired
    private TermsConditionsMapper termsConditionsMapper;
    

    @Autowired
    private TermsConditionsService termsConditionsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTermsConditionsMockMvc;

    private TermsConditions termsConditions;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TermsConditionsResource termsConditionsResource = new TermsConditionsResource(termsConditionsService);
        this.restTermsConditionsMockMvc = MockMvcBuilders.standaloneSetup(termsConditionsResource)
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
    public static TermsConditions createEntity(EntityManager em) {
        TermsConditions termsConditions = new TermsConditions()
            .descritption(DEFAULT_DESCRITPTION);
        return termsConditions;
    }

    @Before
    public void initTest() {
        termsConditions = createEntity(em);
    }

    @Test
    @Transactional
    public void createTermsConditions() throws Exception {
        int databaseSizeBeforeCreate = termsConditionsRepository.findAll().size();

        // Create the TermsConditions
        TermsConditionsDTO termsConditionsDTO = termsConditionsMapper.toDto(termsConditions);
        restTermsConditionsMockMvc.perform(post("/api/terms-conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termsConditionsDTO)))
            .andExpect(status().isCreated());

        // Validate the TermsConditions in the database
        List<TermsConditions> termsConditionsList = termsConditionsRepository.findAll();
        assertThat(termsConditionsList).hasSize(databaseSizeBeforeCreate + 1);
        TermsConditions testTermsConditions = termsConditionsList.get(termsConditionsList.size() - 1);
        assertThat(testTermsConditions.getDescritption()).isEqualTo(DEFAULT_DESCRITPTION);
    }

    @Test
    @Transactional
    public void createTermsConditionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = termsConditionsRepository.findAll().size();

        // Create the TermsConditions with an existing ID
        termsConditions.setId(1L);
        TermsConditionsDTO termsConditionsDTO = termsConditionsMapper.toDto(termsConditions);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTermsConditionsMockMvc.perform(post("/api/terms-conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termsConditionsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TermsConditions in the database
        List<TermsConditions> termsConditionsList = termsConditionsRepository.findAll();
        assertThat(termsConditionsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTermsConditions() throws Exception {
        // Initialize the database
        termsConditionsRepository.saveAndFlush(termsConditions);

        // Get all the termsConditionsList
        restTermsConditionsMockMvc.perform(get("/api/terms-conditions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(termsConditions.getId().intValue())))
            .andExpect(jsonPath("$.[*].descritption").value(hasItem(DEFAULT_DESCRITPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getTermsConditions() throws Exception {
        // Initialize the database
        termsConditionsRepository.saveAndFlush(termsConditions);

        // Get the termsConditions
        restTermsConditionsMockMvc.perform(get("/api/terms-conditions/{id}", termsConditions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(termsConditions.getId().intValue()))
            .andExpect(jsonPath("$.descritption").value(DEFAULT_DESCRITPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTermsConditions() throws Exception {
        // Get the termsConditions
        restTermsConditionsMockMvc.perform(get("/api/terms-conditions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTermsConditions() throws Exception {
        // Initialize the database
        termsConditionsRepository.saveAndFlush(termsConditions);

        int databaseSizeBeforeUpdate = termsConditionsRepository.findAll().size();

        // Update the termsConditions
        TermsConditions updatedTermsConditions = termsConditionsRepository.findById(termsConditions.getId()).get();
        // Disconnect from session so that the updates on updatedTermsConditions are not directly saved in db
        em.detach(updatedTermsConditions);
        updatedTermsConditions
            .descritption(UPDATED_DESCRITPTION);
        TermsConditionsDTO termsConditionsDTO = termsConditionsMapper.toDto(updatedTermsConditions);

        restTermsConditionsMockMvc.perform(put("/api/terms-conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termsConditionsDTO)))
            .andExpect(status().isOk());

        // Validate the TermsConditions in the database
        List<TermsConditions> termsConditionsList = termsConditionsRepository.findAll();
        assertThat(termsConditionsList).hasSize(databaseSizeBeforeUpdate);
        TermsConditions testTermsConditions = termsConditionsList.get(termsConditionsList.size() - 1);
        assertThat(testTermsConditions.getDescritption()).isEqualTo(UPDATED_DESCRITPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTermsConditions() throws Exception {
        int databaseSizeBeforeUpdate = termsConditionsRepository.findAll().size();

        // Create the TermsConditions
        TermsConditionsDTO termsConditionsDTO = termsConditionsMapper.toDto(termsConditions);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTermsConditionsMockMvc.perform(put("/api/terms-conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(termsConditionsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TermsConditions in the database
        List<TermsConditions> termsConditionsList = termsConditionsRepository.findAll();
        assertThat(termsConditionsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTermsConditions() throws Exception {
        // Initialize the database
        termsConditionsRepository.saveAndFlush(termsConditions);

        int databaseSizeBeforeDelete = termsConditionsRepository.findAll().size();

        // Get the termsConditions
        restTermsConditionsMockMvc.perform(delete("/api/terms-conditions/{id}", termsConditions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TermsConditions> termsConditionsList = termsConditionsRepository.findAll();
        assertThat(termsConditionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TermsConditions.class);
        TermsConditions termsConditions1 = new TermsConditions();
        termsConditions1.setId(1L);
        TermsConditions termsConditions2 = new TermsConditions();
        termsConditions2.setId(termsConditions1.getId());
        assertThat(termsConditions1).isEqualTo(termsConditions2);
        termsConditions2.setId(2L);
        assertThat(termsConditions1).isNotEqualTo(termsConditions2);
        termsConditions1.setId(null);
        assertThat(termsConditions1).isNotEqualTo(termsConditions2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TermsConditionsDTO.class);
        TermsConditionsDTO termsConditionsDTO1 = new TermsConditionsDTO();
        termsConditionsDTO1.setId(1L);
        TermsConditionsDTO termsConditionsDTO2 = new TermsConditionsDTO();
        assertThat(termsConditionsDTO1).isNotEqualTo(termsConditionsDTO2);
        termsConditionsDTO2.setId(termsConditionsDTO1.getId());
        assertThat(termsConditionsDTO1).isEqualTo(termsConditionsDTO2);
        termsConditionsDTO2.setId(2L);
        assertThat(termsConditionsDTO1).isNotEqualTo(termsConditionsDTO2);
        termsConditionsDTO1.setId(null);
        assertThat(termsConditionsDTO1).isNotEqualTo(termsConditionsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(termsConditionsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(termsConditionsMapper.fromId(null)).isNull();
    }
}
