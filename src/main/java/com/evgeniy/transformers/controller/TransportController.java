package com.evgeniy.transformers.controller;

import com.evgeniy.transformers.restrepo.TransportRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@RepositoryRestController
public class TransportController {
    private final TransportRepo repo;

    @DeleteMapping("/transports")
    public ResponseEntity<Void> deleteByIds(@RequestParam List<Integer> ids) {
        repo.deleteByIdIn(ids);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/transports/addOperation")
    public ResponseEntity<Void> addTransformer(@RequestParam Integer operationId, @RequestParam Integer transportId) {
        repo.addOperation(transportId, operationId);
        return ResponseEntity.ok().build();
    }
}
