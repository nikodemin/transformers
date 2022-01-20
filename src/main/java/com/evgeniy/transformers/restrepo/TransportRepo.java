package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Transport;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "transports", path = "transports")
public interface TransportRepo extends PagingAndSortingRepository<Transport, Integer> {
    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Integer> ids);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "INSERT INTO transport_operation (transport_id, operation_id) VALUES (:transportId, :operationId)")
    void addOperation(@Param("transportId") Integer transportId, @Param("operationId") Integer operationId);
}
