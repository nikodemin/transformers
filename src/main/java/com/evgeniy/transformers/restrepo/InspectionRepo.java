package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Inspection;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "inspections", path = "inspections")
public interface InspectionRepo extends PagingAndSortingRepository<Inspection, Long> {
}
