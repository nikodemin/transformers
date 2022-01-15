package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Base;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "bases", path = "bases")
public interface BaseRepo extends PagingAndSortingRepository<Base, Long> {
}
