package com.evgeniy.transformers.controller;

import com.evgeniy.transformers.restrepo.UpgradeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@RepositoryRestController
public class UpgradeController {
    private final UpgradeRepo repo;

    @DeleteMapping("/upgrades")
    public ResponseEntity<Void> deleteByIds(@RequestParam List<Long> ids) {
        repo.deleteByIdIn(ids);
        return ResponseEntity.ok().build();
    }
}
