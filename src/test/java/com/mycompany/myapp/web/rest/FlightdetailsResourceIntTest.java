package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App4App;

import com.mycompany.myapp.domain.Flightdetails;
import com.mycompany.myapp.repository.FlightdetailsRepository;
import com.mycompany.myapp.service.FlightdetailsService;
import com.mycompany.myapp.service.dto.FlightdetailsDTO;
import com.mycompany.myapp.service.mapper.FlightdetailsMapper;
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

import com.mycompany.myapp.domain.enumeration.FlightType;
import com.mycompany.myapp.domain.enumeration.FlightClass;
/**
 * Test class for the FlightdetailsResource REST controller.
 *
 * @see FlightdetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App4App.class)
public class FlightdetailsResourceIntTest {

    private static final String DEFAULT_DEPARTURE = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTURE = "BBBBBBBBBB";

    private static final String DEFAULT_ARRIVAL = "AAAAAAAAAA";
    private static final String UPDATED_ARRIVAL = "BBBBBBBBBB";

    private static final String DEFAULT_FLIGHT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_FLIGHT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_AIRLINE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AIRLINE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTURE_TIME = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTURE_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_ARRIVAL_TIME = "AAAAAAAAAA";
    private static final String UPDATED_ARRIVAL_TIME = "BBBBBBBBBB";

    private static final FlightType DEFAULT_TYPE = FlightType.OUTBOUND;
    private static final FlightType UPDATED_TYPE = FlightType.INBOUND;

    private static final FlightClass DEFAULT_FLIGHTCLASS = FlightClass.ECONOMY;
    private static final FlightClass UPDATED_FLIGHTCLASS = FlightClass.BUSINESS;

    private static final String DEFAULT_PRICE = "AAAAAAAAAA";
    private static final String UPDATED_PRICE = "BBBBBBBBBB";

    @Autowired
    private FlightdetailsRepository flightdetailsRepository;


    @Autowired
    private FlightdetailsMapper flightdetailsMapper;
    

    @Autowired
    private FlightdetailsService flightdetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlightdetailsMockMvc;

    private Flightdetails flightdetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightdetailsResource flightdetailsResource = new FlightdetailsResource(flightdetailsService);
        this.restFlightdetailsMockMvc = MockMvcBuilders.standaloneSetup(flightdetailsResource)
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
    public static Flightdetails createEntity(EntityManager em) {
        Flightdetails flightdetails = new Flightdetails()
            .departure(DEFAULT_DEPARTURE)
            .arrival(DEFAULT_ARRIVAL)
            .flightNumber(DEFAULT_FLIGHT_NUMBER)
            .airlineName(DEFAULT_AIRLINE_NAME)
            .departureTime(DEFAULT_DEPARTURE_TIME)
            .arrivalTime(DEFAULT_ARRIVAL_TIME)
            .type(DEFAULT_TYPE)
            .flightclass(DEFAULT_FLIGHTCLASS)
            .price(DEFAULT_PRICE);
        return flightdetails;
    }

    @Before
    public void initTest() {
        flightdetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightdetails() throws Exception {
        int databaseSizeBeforeCreate = flightdetailsRepository.findAll().size();

        // Create the Flightdetails
        FlightdetailsDTO flightdetailsDTO = flightdetailsMapper.toDto(flightdetails);
        restFlightdetailsMockMvc.perform(post("/api/flightdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightdetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the Flightdetails in the database
        List<Flightdetails> flightdetailsList = flightdetailsRepository.findAll();
        assertThat(flightdetailsList).hasSize(databaseSizeBeforeCreate + 1);
        Flightdetails testFlightdetails = flightdetailsList.get(flightdetailsList.size() - 1);
        assertThat(testFlightdetails.getDeparture()).isEqualTo(DEFAULT_DEPARTURE);
        assertThat(testFlightdetails.getArrival()).isEqualTo(DEFAULT_ARRIVAL);
        assertThat(testFlightdetails.getFlightNumber()).isEqualTo(DEFAULT_FLIGHT_NUMBER);
        assertThat(testFlightdetails.getAirlineName()).isEqualTo(DEFAULT_AIRLINE_NAME);
        assertThat(testFlightdetails.getDepartureTime()).isEqualTo(DEFAULT_DEPARTURE_TIME);
        assertThat(testFlightdetails.getArrivalTime()).isEqualTo(DEFAULT_ARRIVAL_TIME);
        assertThat(testFlightdetails.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testFlightdetails.getFlightclass()).isEqualTo(DEFAULT_FLIGHTCLASS);
        assertThat(testFlightdetails.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createFlightdetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightdetailsRepository.findAll().size();

        // Create the Flightdetails with an existing ID
        flightdetails.setId(1L);
        FlightdetailsDTO flightdetailsDTO = flightdetailsMapper.toDto(flightdetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightdetailsMockMvc.perform(post("/api/flightdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightdetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Flightdetails in the database
        List<Flightdetails> flightdetailsList = flightdetailsRepository.findAll();
        assertThat(flightdetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightdetails() throws Exception {
        // Initialize the database
        flightdetailsRepository.saveAndFlush(flightdetails);

        // Get all the flightdetailsList
        restFlightdetailsMockMvc.perform(get("/api/flightdetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightdetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].departure").value(hasItem(DEFAULT_DEPARTURE.toString())))
            .andExpect(jsonPath("$.[*].arrival").value(hasItem(DEFAULT_ARRIVAL.toString())))
            .andExpect(jsonPath("$.[*].flightNumber").value(hasItem(DEFAULT_FLIGHT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].airlineName").value(hasItem(DEFAULT_AIRLINE_NAME.toString())))
            .andExpect(jsonPath("$.[*].departureTime").value(hasItem(DEFAULT_DEPARTURE_TIME.toString())))
            .andExpect(jsonPath("$.[*].arrivalTime").value(hasItem(DEFAULT_ARRIVAL_TIME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].flightclass").value(hasItem(DEFAULT_FLIGHTCLASS.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.toString())));
    }
    

    @Test
    @Transactional
    public void getFlightdetails() throws Exception {
        // Initialize the database
        flightdetailsRepository.saveAndFlush(flightdetails);

        // Get the flightdetails
        restFlightdetailsMockMvc.perform(get("/api/flightdetails/{id}", flightdetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightdetails.getId().intValue()))
            .andExpect(jsonPath("$.departure").value(DEFAULT_DEPARTURE.toString()))
            .andExpect(jsonPath("$.arrival").value(DEFAULT_ARRIVAL.toString()))
            .andExpect(jsonPath("$.flightNumber").value(DEFAULT_FLIGHT_NUMBER.toString()))
            .andExpect(jsonPath("$.airlineName").value(DEFAULT_AIRLINE_NAME.toString()))
            .andExpect(jsonPath("$.departureTime").value(DEFAULT_DEPARTURE_TIME.toString()))
            .andExpect(jsonPath("$.arrivalTime").value(DEFAULT_ARRIVAL_TIME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.flightclass").value(DEFAULT_FLIGHTCLASS.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFlightdetails() throws Exception {
        // Get the flightdetails
        restFlightdetailsMockMvc.perform(get("/api/flightdetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightdetails() throws Exception {
        // Initialize the database
        flightdetailsRepository.saveAndFlush(flightdetails);

        int databaseSizeBeforeUpdate = flightdetailsRepository.findAll().size();

        // Update the flightdetails
        Flightdetails updatedFlightdetails = flightdetailsRepository.findById(flightdetails.getId()).get();
        // Disconnect from session so that the updates on updatedFlightdetails are not directly saved in db
        em.detach(updatedFlightdetails);
        updatedFlightdetails
            .departure(UPDATED_DEPARTURE)
            .arrival(UPDATED_ARRIVAL)
            .flightNumber(UPDATED_FLIGHT_NUMBER)
            .airlineName(UPDATED_AIRLINE_NAME)
            .departureTime(UPDATED_DEPARTURE_TIME)
            .arrivalTime(UPDATED_ARRIVAL_TIME)
            .type(UPDATED_TYPE)
            .flightclass(UPDATED_FLIGHTCLASS)
            .price(UPDATED_PRICE);
        FlightdetailsDTO flightdetailsDTO = flightdetailsMapper.toDto(updatedFlightdetails);

        restFlightdetailsMockMvc.perform(put("/api/flightdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightdetailsDTO)))
            .andExpect(status().isOk());

        // Validate the Flightdetails in the database
        List<Flightdetails> flightdetailsList = flightdetailsRepository.findAll();
        assertThat(flightdetailsList).hasSize(databaseSizeBeforeUpdate);
        Flightdetails testFlightdetails = flightdetailsList.get(flightdetailsList.size() - 1);
        assertThat(testFlightdetails.getDeparture()).isEqualTo(UPDATED_DEPARTURE);
        assertThat(testFlightdetails.getArrival()).isEqualTo(UPDATED_ARRIVAL);
        assertThat(testFlightdetails.getFlightNumber()).isEqualTo(UPDATED_FLIGHT_NUMBER);
        assertThat(testFlightdetails.getAirlineName()).isEqualTo(UPDATED_AIRLINE_NAME);
        assertThat(testFlightdetails.getDepartureTime()).isEqualTo(UPDATED_DEPARTURE_TIME);
        assertThat(testFlightdetails.getArrivalTime()).isEqualTo(UPDATED_ARRIVAL_TIME);
        assertThat(testFlightdetails.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testFlightdetails.getFlightclass()).isEqualTo(UPDATED_FLIGHTCLASS);
        assertThat(testFlightdetails.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightdetails() throws Exception {
        int databaseSizeBeforeUpdate = flightdetailsRepository.findAll().size();

        // Create the Flightdetails
        FlightdetailsDTO flightdetailsDTO = flightdetailsMapper.toDto(flightdetails);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlightdetailsMockMvc.perform(put("/api/flightdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightdetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Flightdetails in the database
        List<Flightdetails> flightdetailsList = flightdetailsRepository.findAll();
        assertThat(flightdetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightdetails() throws Exception {
        // Initialize the database
        flightdetailsRepository.saveAndFlush(flightdetails);

        int databaseSizeBeforeDelete = flightdetailsRepository.findAll().size();

        // Get the flightdetails
        restFlightdetailsMockMvc.perform(delete("/api/flightdetails/{id}", flightdetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Flightdetails> flightdetailsList = flightdetailsRepository.findAll();
        assertThat(flightdetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Flightdetails.class);
        Flightdetails flightdetails1 = new Flightdetails();
        flightdetails1.setId(1L);
        Flightdetails flightdetails2 = new Flightdetails();
        flightdetails2.setId(flightdetails1.getId());
        assertThat(flightdetails1).isEqualTo(flightdetails2);
        flightdetails2.setId(2L);
        assertThat(flightdetails1).isNotEqualTo(flightdetails2);
        flightdetails1.setId(null);
        assertThat(flightdetails1).isNotEqualTo(flightdetails2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightdetailsDTO.class);
        FlightdetailsDTO flightdetailsDTO1 = new FlightdetailsDTO();
        flightdetailsDTO1.setId(1L);
        FlightdetailsDTO flightdetailsDTO2 = new FlightdetailsDTO();
        assertThat(flightdetailsDTO1).isNotEqualTo(flightdetailsDTO2);
        flightdetailsDTO2.setId(flightdetailsDTO1.getId());
        assertThat(flightdetailsDTO1).isEqualTo(flightdetailsDTO2);
        flightdetailsDTO2.setId(2L);
        assertThat(flightdetailsDTO1).isNotEqualTo(flightdetailsDTO2);
        flightdetailsDTO1.setId(null);
        assertThat(flightdetailsDTO1).isNotEqualTo(flightdetailsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(flightdetailsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(flightdetailsMapper.fromId(null)).isNull();
    }
}
