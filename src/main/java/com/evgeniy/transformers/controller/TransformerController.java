package com.evgeniy.transformers.controller;

import com.evgeniy.transformers.restrepo.TransformerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@RepositoryRestController
public class TransformerController {
    private final TransformerRepo repo;

    @DeleteMapping("/transformers")
    public ResponseEntity<Void> deleteByIds(@RequestParam List<Integer> ids) {
        repo.deleteByIdIn(ids);
        return ResponseEntity.ok().build();
    }
}
