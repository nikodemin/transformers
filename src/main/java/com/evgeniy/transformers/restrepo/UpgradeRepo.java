package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Upgrade;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "upgrades", path = "upgrades")
public interface UpgradeRepo extends PagingAndSortingRepository<Upgrade, Long> {
}
