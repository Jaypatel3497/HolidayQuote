package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.FlightType;
import com.mycompany.myapp.domain.enumeration.FlightClass;

/**
 * A DTO for the Flightdetails entity.
 */
public class FlightdetailsDTO implements Serializable {

    private Long id;

    private String departure;

    private String arrival;

    private String flightNumber;

    private String airlineName;

    private String departureTime;

    private String arrivalTime;

    private FlightType type;

    private FlightClass flightclass;

    private String price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public FlightType getType() {
        return type;
    }

    public void setType(FlightType type) {
        this.type = type;
    }

    public FlightClass getFlightclass() {
        return flightclass;
    }

    public void setFlightclass(FlightClass flightclass) {
        this.flightclass = flightclass;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FlightdetailsDTO flightdetailsDTO = (FlightdetailsDTO) o;
        if (flightdetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightdetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightdetailsDTO{" +
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
