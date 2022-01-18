package com.evgeniy.transformers.controller;

import com.evgeniy.transformers.restrepo.BaseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@RepositoryRestController
public class BaseController {
    private final BaseRepo repo;

    @DeleteMapping("/bases")
    public ResponseEntity<Void> deleteByIds(@RequestParam List<Long> ids) {
        repo.deleteByIdIn(ids);
        return ResponseEntity.ok().build();
    }
}
