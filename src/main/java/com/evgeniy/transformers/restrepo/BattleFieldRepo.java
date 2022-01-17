package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.BattleField;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "battleFields", path = "battleFields")
public interface BattleFieldRepo extends PagingAndSortingRepository<BattleField, Long> {
}
