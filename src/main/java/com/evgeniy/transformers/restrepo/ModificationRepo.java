package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Modification;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "modifications", path = "modifications")
public interface ModificationRepo extends PagingAndSortingRepository<Modification, Long> {
}
