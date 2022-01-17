package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Injury;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "injuries", path = "injuries")
public interface InjuryRepo extends PagingAndSortingRepository<Injury, Long> {
}
