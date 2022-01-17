package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Weapon;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "weapons", path = "weapons")
public interface WeaponRepo extends PagingAndSortingRepository<Weapon, Long> {
}
