package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.BattleField;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "battleFields", path = "battleFields")
public interface BattleFieldRepo extends PagingAndSortingRepository<BattleField, Integer> {
    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Integer> ids);
}
