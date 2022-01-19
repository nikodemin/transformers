package com.evgeniy.transformers.controller;

import com.evgeniy.transformers.restrepo.OperationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@RepositoryRestController
public class OperationController {
    private final OperationRepo repo;

    @DeleteMapping("/operations")
    public ResponseEntity<Void> deleteByIds(@RequestParam List<Long> ids) {
        repo.deleteByIdIn(ids);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/operations/addTransformer")
    public ResponseEntity<Void> addTransformer(@RequestParam Long operationId, @RequestParam Long transformerId) {
        repo.addTransformer(operationId, transformerId);
        return ResponseEntity.ok().build();
    }
}
