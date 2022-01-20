package com.evgeniy.transformers.restrepo;

import com.evgeniy.transformers.model.Transformer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "transformers", path = "transformers")
public interface TransformerRepo extends PagingAndSortingRepository<Transformer, Integer> {
    Optional<Transformer> findByBaseId(Integer baseId);

    @Transactional
    @RestResource(exported = false)
    void deleteByIdIn(List<Integer> ids);
}
