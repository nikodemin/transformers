package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Position;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "positions", path = "positions")
public interface PositionRepo extends PagingAndSortingRepository<Position, Long> {
}
