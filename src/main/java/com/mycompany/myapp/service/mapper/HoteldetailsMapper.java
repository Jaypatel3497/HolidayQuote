package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.HoteldetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Hoteldetails and its DTO HoteldetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HoteldetailsMapper extends EntityMapper<HoteldetailsDTO, Hoteldetails> {


    @Mapping(target = "tripmasters", ignore = true)
    Hoteldetails toEntity(HoteldetailsDTO hoteldetailsDTO);

    default Hoteldetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        Hoteldetails hoteldetails = new Hoteldetails();
        hoteldetails.setId(id);
        return hoteldetails;
    }
}
