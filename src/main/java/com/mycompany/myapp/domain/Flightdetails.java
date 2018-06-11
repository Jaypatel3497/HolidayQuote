package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.FlightType;

import com.mycompany.myapp.domain.enumeration.FlightClass;

/**
 * A Flightdetails.
 */
@Entity
@Table(name = "flightdetails")
public class Flightdetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "departure")
    private String departure;

    @Column(name = "arrival")
    private String arrival;

    @Column(name = "flight_number")
    private String flightNumber;

    @Column(name = "airline_name")
    private String airlineName;

    @Column(name = "departure_time")
    private String departureTime;

    @Column(name = "arrival_time")
    private String arrivalTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private FlightType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "flightclass")
    private FlightClass flightclass;

    @Column(name = "price")
    private String price;

    @ManyToMany(mappedBy = "flightdetails")
    @JsonIgnore
    private Set<Tripmaster> tripmasters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeparture() {
        return departure;
    }

    public Flightdetails departure(String departure) {
        this.departure = departure;
        return this;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public Flightdetails arrival(String arrival) {
        this.arrival = arrival;
        return this;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public Flightdetails flightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
        return this;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public Flightdetails airlineName(String airlineName) {
        this.airlineName = airlineName;
        return this;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public Flightdetails departureTime(String departureTime) {
        this.departureTime = departureTime;
        return this;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public Flightdetails arrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
        return this;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public FlightType getType() {
        return type;
    }

    public Flightdetails type(FlightType type) {
        this.type = type;
        return this;
    }

    public void setType(FlightType type) {
        this.type = type;
    }

    public FlightClass getFlightclass() {
        return flightclass;
    }

    public Flightdetails flightclass(FlightClass flightclass) {
        this.flightclass = flightclass;
        return this;
    }

    public void setFlightclass(FlightClass flightclass) {
        this.flightclass = flightclass;
    }

    public String getPrice() {
        return price;
    }

    public Flightdetails price(String price) {
        this.price = price;
        return this;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Set<Tripmaster> getTripmasters() {
        return tripmasters;
    }

    public Flightdetails tripmasters(Set<Tripmaster> tripmasters) {
        this.tripmasters = tripmasters;
        return this;
    }

    public Flightdetails addTripmaster(Tripmaster tripmaster) {
        this.tripmasters.add(tripmaster);
        tripmaster.getFlightdetails().add(this);
        return this;
    }

    public Flightdetails removeTripmaster(Tripmaster tripmaster) {
        this.tripmasters.remove(tripmaster);
        tripmaster.getFlightdetails().remove(this);
        return this;
    }

    public void setTripmasters(Set<Tripmaster> tripmasters) {
        this.tripmasters = tripmasters;
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
        Flightdetails flightdetails = (Flightdetails) o;
        if (flightdetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightdetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flightdetails{" +
            "id=" + getId() +
            ", departure='" + getDeparture() + "'" +
            ", arrival='" + getArrival() + "'" +
            ", flightNumber='" + getFlightNumber() + "'" +
            ", airlineName='" + getAirlineName() + "'" +
            ", departureTime='" + getDepartureTime() + "'" +
            ", arrivalTime='" + getArrivalTime() + "'" +
            ", type='" + getType() + "'" +
            ", flightclass='" + getFlightclass() + "'" +
            ", price='" + getPrice() + "'" +
            "}";
    }
}
