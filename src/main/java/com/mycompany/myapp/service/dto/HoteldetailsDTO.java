package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.HotelCategory;
import com.mycompany.myapp.domain.enumeration.HotelStar;

/**
 * A DTO for the Hoteldetails entity.
 */
public class HoteldetailsDTO implements Serializable {

    private Long id;

    private String hotelName;

    private String hotelTpId;

    private HotelCategory category;

    private HotelStar star;

    private String city;

    private String location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelTpId() {
        return hotelTpId;
    }

    public void setHotelTpId(String hotelTpId) {
        this.hotelTpId = hotelTpId;
    }

    public HotelCategory getCategory() {
        return category;
    }

    public void setCategory(HotelCategory category) {
        this.category = category;
    }

    public HotelStar getStar() {
        return star;
    }

    public void setStar(HotelStar star) {
        this.star = star;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HoteldetailsDTO hoteldetailsDTO = (HoteldetailsDTO) o;
        if (hoteldetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hoteldetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HoteldetailsDTO{" +
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
