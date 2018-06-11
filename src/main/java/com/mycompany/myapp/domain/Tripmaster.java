package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "tripmaster")
public class Tripmaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emailtitle")
    private String emailtitle;

    @Column(name = "no_of_nights")
    private Integer noOfNights;

    @Column(name = "jhi_from")
    private String from;

    @Column(name = "cities")
    private String cities;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Customer customer;

    @ManyToMany
    @JoinTable(name = "tripmaster_flightdetails",
               joinColumns = @JoinColumn(name = "tripmasters_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "flightdetails_id", referencedColumnName = "id"))
    private Set<Flightdetails> flightdetails = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tripmaster_hoteldetails",
               joinColumns = @JoinColumn(name = "tripmasters_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "hoteldetails_id", referencedColumnName = "id"))
    private Set<Hoteldetails> hoteldetails = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tripmaster_termsconditions",
               joinColumns = @JoinColumn(name = "tripmasters_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "termsconditions_id", referencedColumnName = "id"))
    private Set<TermsConditions> termsconditions = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tripmaster_cancellation_policy",
               joinColumns = @JoinColumn(name = "tripmasters_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cancellation_policies_id", referencedColumnName = "id"))
    private Set<CancellationPolicy> cancellationPolicies = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tripmaster_itinerary",
               joinColumns = @JoinColumn(name = "tripmasters_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "itineraries_id", referencedColumnName = "id"))
    private Set<Itinerary> itineraries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailtitle() {
        return emailtitle;
    }

    public Tripmaster emailtitle(String emailtitle) {
        this.emailtitle = emailtitle;
        return this;
    }

    public void setEmailtitle(String emailtitle) {
        this.emailtitle = emailtitle;
    }

    public Integer getNoOfNights() {
        return noOfNights;
    }

    public Tripmaster noOfNights(Integer noOfNights) {
        this.noOfNights = noOfNights;
        return this;
    }

    public void setNoOfNights(Integer noOfNights) {
        this.noOfNights = noOfNights;
    }

    public String getFrom() {
        return from;
    }

    public Tripmaster from(String from) {
        this.from = from;
        return this;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getCities() {
        return cities;
    }

    public Tripmaster cities(String cities) {
        this.cities = cities;
        return this;
    }

    public void setCities(String cities) {
        this.cities = cities;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Tripmaster customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<Flightdetails> getFlightdetails() {
        return flightdetails;
    }

    public Tripmaster flightdetails(Set<Flightdetails> flightdetails) {
        this.flightdetails = flightdetails;
        return this;
    }

    public Tripmaster addFlightdetails(Flightdetails flightdetails) {
        this.flightdetails.add(flightdetails);
        flightdetails.getTripmasters().add(this);
        return this;
    }

    public Tripmaster removeFlightdetails(Flightdetails flightdetails) {
        this.flightdetails.remove(flightdetails);
        flightdetails.getTripmasters().remove(this);
        return this;
    }

    public void setFlightdetails(Set<Flightdetails> flightdetails) {
        this.flightdetails = flightdetails;
    }

    public Set<Hoteldetails> getHoteldetails() {
        return hoteldetails;
    }

    public Tripmaster hoteldetails(Set<Hoteldetails> hoteldetails) {
        this.hoteldetails = hoteldetails;
        return this;
    }

    public Tripmaster addHoteldetails(Hoteldetails hoteldetails) {
        this.hoteldetails.add(hoteldetails);
        hoteldetails.getTripmasters().add(this);
        return this;
    }

    public Tripmaster removeHoteldetails(Hoteldetails hoteldetails) {
        this.hoteldetails.remove(hoteldetails);
        hoteldetails.getTripmasters().remove(this);
        return this;
    }

    public void setHoteldetails(Set<Hoteldetails> hoteldetails) {
        this.hoteldetails = hoteldetails;
    }

    public Set<TermsConditions> getTermsconditions() {
        return termsconditions;
    }

    public Tripmaster termsconditions(Set<TermsConditions> termsConditions) {
        this.termsconditions = termsConditions;
        return this;
    }

    public Tripmaster addTermsconditions(TermsConditions termsConditions) {
        this.termsconditions.add(termsConditions);
        termsConditions.getTripmasters().add(this);
        return this;
    }

    public Tripmaster removeTermsconditions(TermsConditions termsConditions) {
        this.termsconditions.remove(termsConditions);
        termsConditions.getTripmasters().remove(this);
        return this;
    }

    public void setTermsconditions(Set<TermsConditions> termsConditions) {
        this.termsconditions = termsConditions;
    }

    public Set<CancellationPolicy> getCancellationPolicies() {
        return cancellationPolicies;
    }

    public Tripmaster cancellationPolicies(Set<CancellationPolicy> cancellationPolicies) {
        this.cancellationPolicies = cancellationPolicies;
        return this;
    }

    public Tripmaster addCancellationPolicy(CancellationPolicy cancellationPolicy) {
        this.cancellationPolicies.add(cancellationPolicy);
        cancellationPolicy.getTripmasters().add(this);
        return this;
    }

    public Tripmaster removeCancellationPolicy(CancellationPolicy cancellationPolicy) {
        this.cancellationPolicies.remove(cancellationPolicy);
        cancellationPolicy.getTripmasters().remove(this);
        return this;
    }

    public void setCancellationPolicies(Set<CancellationPolicy> cancellationPolicies) {
        this.cancellationPolicies = cancellationPolicies;
    }

    public Set<Itinerary> getItineraries() {
        return itineraries;
    }

    public Tripmaster itineraries(Set<Itinerary> itineraries) {
        this.itineraries = itineraries;
        return this;
    }

    public Tripmaster addItinerary(Itinerary itinerary) {
        this.itineraries.add(itinerary);
        itinerary.getTripmasters().add(this);
        return this;
    }

    public Tripmaster removeItinerary(Itinerary itinerary) {
        this.itineraries.remove(itinerary);
        itinerary.getTripmasters().remove(this);
        return this;
    }

    public void setItineraries(Set<Itinerary> itineraries) {
        this.itineraries = itineraries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tripmaster tripmaster = (Tripmaster) o;
        if (tripmaster.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tripmaster.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tripmaster{" +
            "id=" + getId() +
            ", emailtitle='" + getEmailtitle() + "'" +
            ", noOfNights=" + getNoOfNights() +
            ", from='" + getFrom() + "'" +
            ", cities='" + getCities() + "'" +
            "}";
    }
}
