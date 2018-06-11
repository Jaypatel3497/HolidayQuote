package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Entity
@Table(name = "itinerary")
public class Itinerary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "city")
    private String city;

    @ManyToMany(mappedBy = "itineraries")
    @JsonIgnore
    private Set<Tripmaster> tripmasters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Itinerary title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Itinerary description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public Itinerary city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<Tripmaster> getTripmasters() {
        return tripmasters;
    }

    public Itinerary tripmasters(Set<Tripmaster> tripmasters) {
        this.tripmasters = tripmasters;
        return this;
    }

    public Itinerary addTripmaster(Tripmaster tripmaster) {
        this.tripmasters.add(tripmaster);
        tripmaster.getItineraries().add(this);
        return this;
    }

    public Itinerary removeTripmaster(Tripmaster tripmaster) {
        this.tripmasters.remove(tripmaster);
        tripmaster.getItineraries().remove(this);
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
        Itinerary itinerary = (Itinerary) o;
        if (itinerary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itinerary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Itinerary{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
