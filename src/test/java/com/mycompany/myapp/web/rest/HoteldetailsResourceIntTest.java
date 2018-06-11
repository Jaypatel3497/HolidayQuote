package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App4App;

import com.mycompany.myapp.domain.Hoteldetails;
import com.mycompany.myapp.repository.HoteldetailsRepository;
import com.mycompany.myapp.service.HoteldetailsService;
import com.mycompany.myapp.service.dto.HoteldetailsDTO;
import com.mycompany.myapp.service.mapper.HoteldetailsMapper;
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

import com.mycompany.myapp.domain.enumeration.HotelCategory;
import com.mycompany.myapp.domain.enumeration.HotelStar;
/**
 * Test class for the HoteldetailsResource REST controller.
 *
 * @see HoteldetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App4App.class)
public class HoteldetailsResourceIntTest {

    private static final String DEFAULT_HOTEL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_HOTEL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_HOTEL_TP_ID = "AAAAAAAAAA";
    private static final String UPDATED_HOTEL_TP_ID = "BBBBBBBBBB";

    private static final HotelCategory DEFAULT_CATEGORY = HotelCategory.STANDARD;
    private static final HotelCategory UPDATED_CATEGORY = HotelCategory.DELUX;

    private static final HotelStar DEFAULT_STAR = HotelStar.TWO;
    private static final HotelStar UPDATED_STAR = HotelStar.THREE;

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    @Autowired
    private HoteldetailsRepository hoteldetailsRepository;


    @Autowired
    private HoteldetailsMapper hoteldetailsMapper;
    

    @Autowired
    private HoteldetailsService hoteldetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHoteldetailsMockMvc;

    private Hoteldetails hoteldetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HoteldetailsResource hoteldetailsResource = new HoteldetailsResource(hoteldetailsService);
        this.restHoteldetailsMockMvc = MockMvcBuilders.standaloneSetup(hoteldetailsResource)
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
    public static Hoteldetails createEntity(EntityManager em) {
        Hoteldetails hoteldetails = new Hoteldetails()
            .hotelName(DEFAULT_HOTEL_NAME)
            .hotelTpId(DEFAULT_HOTEL_TP_ID)
            .category(DEFAULT_CATEGORY)
            .star(DEFAULT_STAR)
            .city(DEFAULT_CITY)
            .location(DEFAULT_LOCATION);
        return hoteldetails;
    }

    @Before
    public void initTest() {
        hoteldetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createHoteldetails() throws Exception {
        int databaseSizeBeforeCreate = hoteldetailsRepository.findAll().size();

        // Create the Hoteldetails
        HoteldetailsDTO hoteldetailsDTO = hoteldetailsMapper.toDto(hoteldetails);
        restHoteldetailsMockMvc.perform(post("/api/hoteldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoteldetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the Hoteldetails in the database
        List<Hoteldetails> hoteldetailsList = hoteldetailsRepository.findAll();
        assertThat(hoteldetailsList).hasSize(databaseSizeBeforeCreate + 1);
        Hoteldetails testHoteldetails = hoteldetailsList.get(hoteldetailsList.size() - 1);
        assertThat(testHoteldetails.getHotelName()).isEqualTo(DEFAULT_HOTEL_NAME);
        assertThat(testHoteldetails.getHotelTpId()).isEqualTo(DEFAULT_HOTEL_TP_ID);
        assertThat(testHoteldetails.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testHoteldetails.getStar()).isEqualTo(DEFAULT_STAR);
        assertThat(testHoteldetails.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testHoteldetails.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    @Transactional
    public void createHoteldetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hoteldetailsRepository.findAll().size();

        // Create the Hoteldetails with an existing ID
        hoteldetails.setId(1L);
        HoteldetailsDTO hoteldetailsDTO = hoteldetailsMapper.toDto(hoteldetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoteldetailsMockMvc.perform(post("/api/hoteldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoteldetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Hoteldetails in the database
        List<Hoteldetails> hoteldetailsList = hoteldetailsRepository.findAll();
        assertThat(hoteldetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHoteldetails() throws Exception {
        // Initialize the database
        hoteldetailsRepository.saveAndFlush(hoteldetails);

        // Get all the hoteldetailsList
        restHoteldetailsMockMvc.perform(get("/api/hoteldetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hoteldetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].hotelName").value(hasItem(DEFAULT_HOTEL_NAME.toString())))
            .andExpect(jsonPath("$.[*].hotelTpId").value(hasItem(DEFAULT_HOTEL_TP_ID.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].star").value(hasItem(DEFAULT_STAR.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())));
    }
    

    @Test
    @Transactional
    public void getHoteldetails() throws Exception {
        // Initialize the database
        hoteldetailsRepository.saveAndFlush(hoteldetails);

        // Get the hoteldetails
        restHoteldetailsMockMvc.perform(get("/api/hoteldetails/{id}", hoteldetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hoteldetails.getId().intValue()))
            .andExpect(jsonPath("$.hotelName").value(DEFAULT_HOTEL_NAME.toString()))
            .andExpect(jsonPath("$.hotelTpId").value(DEFAULT_HOTEL_TP_ID.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.star").value(DEFAULT_STAR.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHoteldetails() throws Exception {
        // Get the hoteldetails
        restHoteldetailsMockMvc.perform(get("/api/hoteldetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHoteldetails() throws Exception {
        // Initialize the database
        hoteldetailsRepository.saveAndFlush(hoteldetails);

        int databaseSizeBeforeUpdate = hoteldetailsRepository.findAll().size();

        // Update the hoteldetails
        Hoteldetails updatedHoteldetails = hoteldetailsRepository.findById(hoteldetails.getId()).get();
        // Disconnect from session so that the updates on updatedHoteldetails are not directly saved in db
        em.detach(updatedHoteldetails);
        updatedHoteldetails
            .hotelName(UPDATED_HOTEL_NAME)
            .hotelTpId(UPDATED_HOTEL_TP_ID)
            .category(UPDATED_CATEGORY)
            .star(UPDATED_STAR)
            .city(UPDATED_CITY)
            .location(UPDATED_LOCATION);
        HoteldetailsDTO hoteldetailsDTO = hoteldetailsMapper.toDto(updatedHoteldetails);

        restHoteldetailsMockMvc.perform(put("/api/hoteldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoteldetailsDTO)))
            .andExpect(status().isOk());

        // Validate the Hoteldetails in the database
        List<Hoteldetails> hoteldetailsList = hoteldetailsRepository.findAll();
        assertThat(hoteldetailsList).hasSize(databaseSizeBeforeUpdate);
        Hoteldetails testHoteldetails = hoteldetailsList.get(hoteldetailsList.size() - 1);
        assertThat(testHoteldetails.getHotelName()).isEqualTo(UPDATED_HOTEL_NAME);
        assertThat(testHoteldetails.getHotelTpId()).isEqualTo(UPDATED_HOTEL_TP_ID);
        assertThat(testHoteldetails.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testHoteldetails.getStar()).isEqualTo(UPDATED_STAR);
        assertThat(testHoteldetails.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testHoteldetails.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    @Transactional
    public void updateNonExistingHoteldetails() throws Exception {
        int databaseSizeBeforeUpdate = hoteldetailsRepository.findAll().size();

        // Create the Hoteldetails
        HoteldetailsDTO hoteldetailsDTO = hoteldetailsMapper.toDto(hoteldetails);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHoteldetailsMockMvc.perform(put("/api/hoteldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoteldetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Hoteldetails in the database
        List<Hoteldetails> hoteldetailsList = hoteldetailsRepository.findAll();
        assertThat(hoteldetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHoteldetails() throws Exception {
        // Initialize the database
        hoteldetailsRepository.saveAndFlush(hoteldetails);

        int databaseSizeBeforeDelete = hoteldetailsRepository.findAll().size();

        // Get the hoteldetails
        restHoteldetailsMockMvc.perform(delete("/api/hoteldetails/{id}", hoteldetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Hoteldetails> hoteldetailsList = hoteldetailsRepository.findAll();
        assertThat(hoteldetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hoteldetails.class);
        Hoteldetails hoteldetails1 = new Hoteldetails();
        hoteldetails1.setId(1L);
        Hoteldetails hoteldetails2 = new Hoteldetails();
        hoteldetails2.setId(hoteldetails1.getId());
        assertThat(hoteldetails1).isEqualTo(hoteldetails2);
        hoteldetails2.setId(2L);
        assertThat(hoteldetails1).isNotEqualTo(hoteldetails2);
        hoteldetails1.setId(null);
        assertThat(hoteldetails1).isNotEqualTo(hoteldetails2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HoteldetailsDTO.class);
        HoteldetailsDTO hoteldetailsDTO1 = new HoteldetailsDTO();
        hoteldetailsDTO1.setId(1L);
        HoteldetailsDTO hoteldetailsDTO2 = new HoteldetailsDTO();
        assertThat(hoteldetailsDTO1).isNotEqualTo(hoteldetailsDTO2);
        hoteldetailsDTO2.setId(hoteldetailsDTO1.getId());
        assertThat(hoteldetailsDTO1).isEqualTo(hoteldetailsDTO2);
        hoteldetailsDTO2.setId(2L);
        assertThat(hoteldetailsDTO1).isNotEqualTo(hoteldetailsDTO2);
        hoteldetailsDTO1.setId(null);
        assertThat(hoteldetailsDTO1).isNotEqualTo(hoteldetailsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(hoteldetailsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(hoteldetailsMapper.fromId(null)).isNull();
    }
}
