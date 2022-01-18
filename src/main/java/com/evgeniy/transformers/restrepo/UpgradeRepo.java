package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Upgrade;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "upgrades", path = "upgrades")
public interface UpgradeRepo extends PagingAndSortingRepository<Upgrade, Long> {
    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Long> ids);
}
