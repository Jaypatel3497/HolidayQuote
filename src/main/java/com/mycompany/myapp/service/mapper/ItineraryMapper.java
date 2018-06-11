package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.ItineraryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Itinerary and its DTO ItineraryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ItineraryMapper extends EntityMapper<ItineraryDTO, Itinerary> {


    @Mapping(target = "tripmasters", ignore = true)
    Itinerary toEntity(ItineraryDTO itineraryDTO);

    default Itinerary fromId(Long id) {
        if (id == null) {
            return null;
        }
        Itinerary itinerary = new Itinerary();
        itinerary.setId(id);
        return itinerary;
    }
}
