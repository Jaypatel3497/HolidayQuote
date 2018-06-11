package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App4App;

import com.mycompany.myapp.domain.Tripmaster;
import com.mycompany.myapp.repository.TripmasterRepository;
import com.mycompany.myapp.service.TripmasterService;
import com.mycompany.myapp.service.dto.TripmasterDTO;
import com.mycompany.myapp.service.mapper.TripmasterMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TripmasterResource REST controller.
 *
 * @see TripmasterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App4App.class)
public class TripmasterResourceIntTest {

    private static final String DEFAULT_EMAILTITLE = "AAAAAAAAAA";
    private static final String UPDATED_EMAILTITLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NO_OF_NIGHTS = 1;
    private static final Integer UPDATED_NO_OF_NIGHTS = 2;

    private static final String DEFAULT_FROM = "AAAAAAAAAA";
    private static final String UPDATED_FROM = "BBBBBBBBBB";

    private static final String DEFAULT_CITIES = "AAAAAAAAAA";
    private static final String UPDATED_CITIES = "BBBBBBBBBB";

    @Autowired
    private TripmasterRepository tripmasterRepository;
    @Mock
    private TripmasterRepository tripmasterRepositoryMock;

    @Autowired
    private TripmasterMapper tripmasterMapper;
    
    @Mock
    private TripmasterService tripmasterServiceMock;

    @Autowired
    private TripmasterService tripmasterService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTripmasterMockMvc;

    private Tripmaster tripmaster;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TripmasterResource tripmasterResource = new TripmasterResource(tripmasterService);
        this.restTripmasterMockMvc = MockMvcBuilders.standaloneSetup(tripmasterResource)
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
    public static Tripmaster createEntity(EntityManager em) {
        Tripmaster tripmaster = new Tripmaster()
            .emailtitle(DEFAULT_EMAILTITLE)
            .noOfNights(DEFAULT_NO_OF_NIGHTS)
            .from(DEFAULT_FROM)
            .cities(DEFAULT_CITIES);
        return tripmaster;
    }

    @Before
    public void initTest() {
        tripmaster = createEntity(em);
    }

    @Test
    @Transactional
    public void createTripmaster() throws Exception {
        int databaseSizeBeforeCreate = tripmasterRepository.findAll().size();

        // Create the Tripmaster
        TripmasterDTO tripmasterDTO = tripmasterMapper.toDto(tripmaster);
        restTripmasterMockMvc.perform(post("/api/tripmasters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripmasterDTO)))
            .andExpect(status().isCreated());

        // Validate the Tripmaster in the database
        List<Tripmaster> tripmasterList = tripmasterRepository.findAll();
        assertThat(tripmasterList).hasSize(databaseSizeBeforeCreate + 1);
        Tripmaster testTripmaster = tripmasterList.get(tripmasterList.size() - 1);
        assertThat(testTripmaster.getEmailtitle()).isEqualTo(DEFAULT_EMAILTITLE);
        assertThat(testTripmaster.getNoOfNights()).isEqualTo(DEFAULT_NO_OF_NIGHTS);
        assertThat(testTripmaster.getFrom()).isEqualTo(DEFAULT_FROM);
        assertThat(testTripmaster.getCities()).isEqualTo(DEFAULT_CITIES);
    }

    @Test
    @Transactional
    public void createTripmasterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tripmasterRepository.findAll().size();

        // Create the Tripmaster with an existing ID
        tripmaster.setId(1L);
        TripmasterDTO tripmasterDTO = tripmasterMapper.toDto(tripmaster);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTripmasterMockMvc.perform(post("/api/tripmasters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripmasterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tripmaster in the database
        List<Tripmaster> tripmasterList = tripmasterRepository.findAll();
        assertThat(tripmasterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTripmasters() throws Exception {
        // Initialize the database
        tripmasterRepository.saveAndFlush(tripmaster);

        // Get all the tripmasterList
        restTripmasterMockMvc.perform(get("/api/tripmasters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tripmaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailtitle").value(hasItem(DEFAULT_EMAILTITLE.toString())))
            .andExpect(jsonPath("$.[*].noOfNights").value(hasItem(DEFAULT_NO_OF_NIGHTS)))
            .andExpect(jsonPath("$.[*].from").value(hasItem(DEFAULT_FROM.toString())))
            .andExpect(jsonPath("$.[*].cities").value(hasItem(DEFAULT_CITIES.toString())));
    }
    
    public void getAllTripmastersWithEagerRelationshipsIsEnabled() throws Exception {
        TripmasterResource tripmasterResource = new TripmasterResource(tripmasterServiceMock);
        when(tripmasterServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTripmasterMockMvc = MockMvcBuilders.standaloneSetup(tripmasterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTripmasterMockMvc.perform(get("/api/tripmasters?eagerload=true"))
        .andExpect(status().isOk());

        verify(tripmasterServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllTripmastersWithEagerRelationshipsIsNotEnabled() throws Exception {
        TripmasterResource tripmasterResource = new TripmasterResource(tripmasterServiceMock);
            when(tripmasterServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTripmasterMockMvc = MockMvcBuilders.standaloneSetup(tripmasterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTripmasterMockMvc.perform(get("/api/tripmasters?eagerload=true"))
        .andExpect(status().isOk());

            verify(tripmasterServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTripmaster() throws Exception {
        // Initialize the database
        tripmasterRepository.saveAndFlush(tripmaster);

        // Get the tripmaster
        restTripmasterMockMvc.perform(get("/api/tripmasters/{id}", tripmaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tripmaster.getId().intValue()))
            .andExpect(jsonPath("$.emailtitle").value(DEFAULT_EMAILTITLE.toString()))
            .andExpect(jsonPath("$.noOfNights").value(DEFAULT_NO_OF_NIGHTS))
            .andExpect(jsonPath("$.from").value(DEFAULT_FROM.toString()))
            .andExpect(jsonPath("$.cities").value(DEFAULT_CITIES.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTripmaster() throws Exception {
        // Get the tripmaster
        restTripmasterMockMvc.perform(get("/api/tripmasters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTripmaster() throws Exception {
        // Initialize the database
        tripmasterRepository.saveAndFlush(tripmaster);

        int databaseSizeBeforeUpdate = tripmasterRepository.findAll().size();

        // Update the tripmaster
        Tripmaster updatedTripmaster = tripmasterRepository.findById(tripmaster.getId()).get();
        // Disconnect from session so that the updates on updatedTripmaster are not directly saved in db
        em.detach(updatedTripmaster);
        updatedTripmaster
            .emailtitle(UPDATED_EMAILTITLE)
            .noOfNights(UPDATED_NO_OF_NIGHTS)
            .from(UPDATED_FROM)
            .cities(UPDATED_CITIES);
        TripmasterDTO tripmasterDTO = tripmasterMapper.toDto(updatedTripmaster);

        restTripmasterMockMvc.perform(put("/api/tripmasters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripmasterDTO)))
            .andExpect(status().isOk());

        // Validate the Tripmaster in the database
        List<Tripmaster> tripmasterList = tripmasterRepository.findAll();
        assertThat(tripmasterList).hasSize(databaseSizeBeforeUpdate);
        Tripmaster testTripmaster = tripmasterList.get(tripmasterList.size() - 1);
        assertThat(testTripmaster.getEmailtitle()).isEqualTo(UPDATED_EMAILTITLE);
        assertThat(testTripmaster.getNoOfNights()).isEqualTo(UPDATED_NO_OF_NIGHTS);
        assertThat(testTripmaster.getFrom()).isEqualTo(UPDATED_FROM);
        assertThat(testTripmaster.getCities()).isEqualTo(UPDATED_CITIES);
    }

    @Test
    @Transactional
    public void updateNonExistingTripmaster() throws Exception {
        int databaseSizeBeforeUpdate = tripmasterRepository.findAll().size();

        // Create the Tripmaster
        TripmasterDTO tripmasterDTO = tripmasterMapper.toDto(tripmaster);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTripmasterMockMvc.perform(put("/api/tripmasters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tripmasterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tripmaster in the database
        List<Tripmaster> tripmasterList = tripmasterRepository.findAll();
        assertThat(tripmasterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTripmaster() throws Exception {
        // Initialize the database
        tripmasterRepository.saveAndFlush(tripmaster);

        int databaseSizeBeforeDelete = tripmasterRepository.findAll().size();

        // Get the tripmaster
        restTripmasterMockMvc.perform(delete("/api/tripmasters/{id}", tripmaster.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tripmaster> tripmasterList = tripmasterRepository.findAll();
        assertThat(tripmasterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tripmaster.class);
        Tripmaster tripmaster1 = new Tripmaster();
        tripmaster1.setId(1L);
        Tripmaster tripmaster2 = new Tripmaster();
        tripmaster2.setId(tripmaster1.getId());
        assertThat(tripmaster1).isEqualTo(tripmaster2);
        tripmaster2.setId(2L);
        assertThat(tripmaster1).isNotEqualTo(tripmaster2);
        tripmaster1.setId(null);
        assertThat(tripmaster1).isNotEqualTo(tripmaster2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TripmasterDTO.class);
        TripmasterDTO tripmasterDTO1 = new TripmasterDTO();
        tripmasterDTO1.setId(1L);
        TripmasterDTO tripmasterDTO2 = new TripmasterDTO();
        assertThat(tripmasterDTO1).isNotEqualTo(tripmasterDTO2);
        tripmasterDTO2.setId(tripmasterDTO1.getId());
        assertThat(tripmasterDTO1).isEqualTo(tripmasterDTO2);
        tripmasterDTO2.setId(2L);
        assertThat(tripmasterDTO1).isNotEqualTo(tripmasterDTO2);
        tripmasterDTO1.setId(null);
        assertThat(tripmasterDTO1).isNotEqualTo(tripmasterDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tripmasterMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tripmasterMapper.fromId(null)).isNull();
    }
}
