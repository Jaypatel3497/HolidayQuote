package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.TripmasterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tripmaster and its DTO TripmasterDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, FlightdetailsMapper.class, HoteldetailsMapper.class, TermsConditionsMapper.class, CancellationPolicyMapper.class, ItineraryMapper.class})
public interface TripmasterMapper extends EntityMapper<TripmasterDTO, Tripmaster> {

    @Mapping(source = "customer.id", target = "customerId")
    TripmasterDTO toDto(Tripmaster tripmaster);

    @Mapping(source = "customerId", target = "customer")
    Tripmaster toEntity(TripmasterDTO tripmasterDTO);

    default Tripmaster fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tripmaster tripmaster = new Tripmaster();
        tripmaster.setId(id);
        return tripmaster;
    }
}
