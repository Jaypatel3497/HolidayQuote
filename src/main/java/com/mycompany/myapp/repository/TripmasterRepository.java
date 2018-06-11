package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tripmaster;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Tripmaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TripmasterRepository extends JpaRepository<Tripmaster, Long> {

    @Query(value = "select distinct tripmaster from Tripmaster tripmaster left join fetch tripmaster.flightdetails left join fetch tripmaster.hoteldetails left join fetch tripmaster.termsconditions left join fetch tripmaster.cancellationPolicies left join fetch tripmaster.itineraries",
        countQuery = "select count(distinct tripmaster) from Tripmaster tripmaster")
    Page<Tripmaster> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct tripmaster from Tripmaster tripmaster left join fetch tripmaster.flightdetails left join fetch tripmaster.hoteldetails left join fetch tripmaster.termsconditions left join fetch tripmaster.cancellationPolicies left join fetch tripmaster.itineraries")
    List<Tripmaster> findAllWithEagerRelationships();

    @Query("select tripmaster from Tripmaster tripmaster left join fetch tripmaster.flightdetails left join fetch tripmaster.hoteldetails left join fetch tripmaster.termsconditions left join fetch tripmaster.cancellationPolicies left join fetch tripmaster.itineraries where tripmaster.id =:id")
    Optional<Tripmaster> findOneWithEagerRelationships(@Param("id") Long id);

}
