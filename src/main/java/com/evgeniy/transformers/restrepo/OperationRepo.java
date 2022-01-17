package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Operation;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "operations", path = "operations")
public interface OperationRepo extends PagingAndSortingRepository<Operation, Long> {

}
