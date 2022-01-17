package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Transport;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "transports", path = "transports")
public interface TransportRepo extends PagingAndSortingRepository<Transport, Long> {
}
