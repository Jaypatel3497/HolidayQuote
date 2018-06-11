package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.HotelCategory;

import com.mycompany.myapp.domain.enumeration.HotelStar;

/**
 * A Hoteldetails.
 */
@Entity
@Table(name = "hoteldetails")
public class Hoteldetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hotel_name")
    private String hotelName;

    @Column(name = "hotel_tp_id")
    private String hotelTpId;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private HotelCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "star")
    private HotelStar star;

    @Column(name = "city")
    private String city;

    @Column(name = "location")
    private String location;

    @ManyToMany(mappedBy = "hoteldetails")
    @JsonIgnore
    private Set<Tripmaster> tripmasters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotelName() {
        return hotelName;
    }

    public Hoteldetails hotelName(String hotelName) {
        this.hotelName = hotelName;
        return this;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelTpId() {
        return hotelTpId;
    }

    public Hoteldetails hotelTpId(String hotelTpId) {
        this.hotelTpId = hotelTpId;
        return this;
    }

    public void setHotelTpId(String hotelTpId) {
        this.hotelTpId = hotelTpId;
    }

    public HotelCategory getCategory() {
        return category;
    }

    public Hoteldetails category(HotelCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(HotelCategory category) {
        this.category = category;
    }

    public HotelStar getStar() {
        return star;
    }

    public Hoteldetails star(HotelStar star) {
        this.star = star;
        return this;
    }

    public void setStar(HotelStar star) {
        this.star = star;
    }

    public String getCity() {
        return city;
    }

    public Hoteldetails city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLocation() {
        return location;
    }

    public Hoteldetails location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Tripmaster> getTripmasters() {
        return tripmasters;
    }

    public Hoteldetails tripmasters(Set<Tripmaster> tripmasters) {
        this.tripmasters = tripmasters;
        return this;
    }

    public Hoteldetails addTripmaster(Tripmaster tripmaster) {
        this.tripmasters.add(tripmaster);
        tripmaster.getHoteldetails().add(this);
        return this;
    }

    public Hoteldetails removeTripmaster(Tripmaster tripmaster) {
        this.tripmasters.remove(tripmaster);
        tripmaster.getHoteldetails().remove(this);
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
        Hoteldetails hoteldetails = (Hoteldetails) o;
        if (hoteldetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hoteldetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hoteldetails{" +
            "id=" + getId() +
            ", hotelName='" + getHotelName() + "'" +
            ", hotelTpId='" + getHotelTpId() + "'" +
            ", category='" + getCategory() + "'" +
            ", star='" + getStar() + "'" +
            ", city='" + getCity() + "'" +
            ", location='" + getLocation() + "'" +
            "}";
    }
}
