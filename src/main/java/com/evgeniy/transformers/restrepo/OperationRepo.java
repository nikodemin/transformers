package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Operation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "operations", path = "operations")
public interface OperationRepo extends PagingAndSortingRepository<Operation, Integer> {
    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Integer> ids);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "INSERT INTO operation_transformer (operation_id, transformer_id) VALUES (:operation_id, :transformer_id)")
    void addTransformer(@Param("operation_id") Integer operationId, @Param("transformer_id") Integer transformerId);
}
