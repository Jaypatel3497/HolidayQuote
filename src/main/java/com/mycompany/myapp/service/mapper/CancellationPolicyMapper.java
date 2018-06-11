package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.CancellationPolicyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CancellationPolicy and its DTO CancellationPolicyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CancellationPolicyMapper extends EntityMapper<CancellationPolicyDTO, CancellationPolicy> {


    @Mapping(target = "tripmasters", ignore = true)
    CancellationPolicy toEntity(CancellationPolicyDTO cancellationPolicyDTO);

    default CancellationPolicy fromId(Long id) {
        if (id == null) {
            return null;
        }
        CancellationPolicy cancellationPolicy = new CancellationPolicy();
        cancellationPolicy.setId(id);
        return cancellationPolicy;
    }
}
