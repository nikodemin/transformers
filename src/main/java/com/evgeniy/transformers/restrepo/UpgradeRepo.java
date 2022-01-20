package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Upgrade;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "upgrades", path = "upgrades")
public interface UpgradeRepo extends PagingAndSortingRepository<Upgrade, Integer> {
    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Integer> ids);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "INSERT INTO upgrade_modification (upgrade_id, modification_id) VALUES (:upgrade_id, :modification_id)")
    void addModification(@Param("upgrade_id") Integer upgradeId, @Param("modification_id") Integer modificationId);
}
