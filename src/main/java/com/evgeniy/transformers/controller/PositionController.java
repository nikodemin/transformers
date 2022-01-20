package com.evgeniy.transformers.controller;

import com.evgeniy.transformers.restrepo.PositionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@RepositoryRestController
public class PositionController {
    private final PositionRepo repo;

    @DeleteMapping("/positions")
    public ResponseEntity<Void> deleteByIds(@RequestParam List<Integer> ids) {
        repo.deleteByIdIn(ids);
        return ResponseEntity.ok().build();
    }
}
