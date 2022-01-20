package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Base;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "bases", path = "bases")
public interface BaseRepo extends PagingAndSortingRepository<Base, Integer> {

    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Integer> ids);
}
