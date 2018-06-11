package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Tripmaster entity.
 */
public class TripmasterDTO implements Serializable {

    private Long id;

    private String emailtitle;

    private Integer noOfNights;

    private String from;

    private String cities;

    private Long customerId;

    private Set<FlightdetailsDTO> flightdetails = new HashSet<>();

    private Set<HoteldetailsDTO> hoteldetails = new HashSet<>();

    private Set<TermsConditionsDTO> termsconditions = new HashSet<>();

    private Set<CancellationPolicyDTO> cancellationPolicies = new HashSet<>();

    private Set<ItineraryDTO> itineraries = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailtitle() {
        return emailtitle;
    }

    public void setEmailtitle(String emailtitle) {
        this.emailtitle = emailtitle;
    }

    public Integer getNoOfNights() {
        return noOfNights;
    }

    public void setNoOfNights(Integer noOfNights) {
        this.noOfNights = noOfNights;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getCities() {
        return cities;
    }

    public void setCities(String cities) {
        this.cities = cities;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Set<FlightdetailsDTO> getFlightdetails() {
        return flightdetails;
    }

    public void setFlightdetails(Set<FlightdetailsDTO> flightdetails) {
        this.flightdetails = flightdetails;
    }

    public Set<HoteldetailsDTO> getHoteldetails() {
        return hoteldetails;
    }

    public void setHoteldetails(Set<HoteldetailsDTO> hoteldetails) {
        this.hoteldetails = hoteldetails;
    }

    public Set<TermsConditionsDTO> getTermsconditions() {
        return termsconditions;
    }

    public void setTermsconditions(Set<TermsConditionsDTO> termsConditions) {
        this.termsconditions = termsConditions;
    }

    public Set<CancellationPolicyDTO> getCancellationPolicies() {
        return cancellationPolicies;
    }

    public void setCancellationPolicies(Set<CancellationPolicyDTO> cancellationPolicies) {
        this.cancellationPolicies = cancellationPolicies;
    }

    public Set<ItineraryDTO> getItineraries() {
        return itineraries;
    }

    public void setItineraries(Set<ItineraryDTO> itineraries) {
        this.itineraries = itineraries;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TripmasterDTO tripmasterDTO = (TripmasterDTO) o;
        if (tripmasterDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tripmasterDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TripmasterDTO{" +
            "id=" + getId() +
            ", emailtitle='" + getEmailtitle() + "'" +
            ", noOfNights=" + getNoOfNights() +
            ", from='" + getFrom() + "'" +
            ", cities='" + getCities() + "'" +
            ", customer=" + getCustomerId() +
            "}";
    }
}
