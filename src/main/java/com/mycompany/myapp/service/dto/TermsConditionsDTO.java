package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TermsConditions entity.
 */
public class TermsConditionsDTO implements Serializable {

    private Long id;

    private String descritption;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescritption() {
        return descritption;
    }

    public void setDescritption(String descritption) {
        this.descritption = descritption;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TermsConditionsDTO termsConditionsDTO = (TermsConditionsDTO) o;
        if (termsConditionsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), termsConditionsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TermsConditionsDTO{" +
            "id=" + getId() +
            ", descritption='" + getDescritption() + "'" +
            "}";
    }
}
