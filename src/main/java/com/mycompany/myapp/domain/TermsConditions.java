package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TermsConditions.
 */
@Entity
@Table(name = "terms_conditions")
public class TermsConditions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descritption")
    private String descritption;

    @ManyToMany(mappedBy = "termsconditions")
    @JsonIgnore
    private Set<Tripmaster> tripmasters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescritption() {
        return descritption;
    }

    public TermsConditions descritption(String descritption) {
        this.descritption = descritption;
        return this;
    }

    public void setDescritption(String descritption) {
        this.descritption = descritption;
    }

    public Set<Tripmaster> getTripmasters() {
        return tripmasters;
    }

    public TermsConditions tripmasters(Set<Tripmaster> tripmasters) {
        this.tripmasters = tripmasters;
        return this;
    }

    public TermsConditions addTripmaster(Tripmaster tripmaster) {
        this.tripmasters.add(tripmaster);
        tripmaster.getTermsconditions().add(this);
        return this;
    }

    public TermsConditions removeTripmaster(Tripmaster tripmaster) {
        this.tripmasters.remove(tripmaster);
        tripmaster.getTermsconditions().remove(this);
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
        TermsConditions termsConditions = (TermsConditions) o;
        if (termsConditions.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), termsConditions.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TermsConditions{" +
            "id=" + getId() +
            ", descritption='" + getDescritption() + "'" +
            "}";
    }
}
