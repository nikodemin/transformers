package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Equipment;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "equipment", path = "equipment")
public interface EquipmentRepo extends PagingAndSortingRepository<Equipment, Long> {
}
