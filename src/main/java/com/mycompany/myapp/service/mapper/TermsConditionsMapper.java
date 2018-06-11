package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.TermsConditionsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TermsConditions and its DTO TermsConditionsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TermsConditionsMapper extends EntityMapper<TermsConditionsDTO, TermsConditions> {


    @Mapping(target = "tripmasters", ignore = true)
    TermsConditions toEntity(TermsConditionsDTO termsConditionsDTO);

    default TermsConditions fromId(Long id) {
        if (id == null) {
            return null;
        }
        TermsConditions termsConditions = new TermsConditions();
        termsConditions.setId(id);
        return termsConditions;
    }
}
