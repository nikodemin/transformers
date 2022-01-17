package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Energon;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "energon", path = "energon")
public interface EnergonRepo extends PagingAndSortingRepository<Energon, Long> {
}
