package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.FlightdetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Flightdetails and its DTO FlightdetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FlightdetailsMapper extends EntityMapper<FlightdetailsDTO, Flightdetails> {


    @Mapping(target = "tripmasters", ignore = true)
    Flightdetails toEntity(FlightdetailsDTO flightdetailsDTO);

    default Flightdetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        Flightdetails flightdetails = new Flightdetails();
        flightdetails.setId(id);
        return flightdetails;
    }
}
