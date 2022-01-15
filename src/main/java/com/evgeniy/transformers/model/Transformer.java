package com.evgeniy.transformers.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import java.time.Instant;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Transformer extends AbstractEntity {
    private String name;
    private Instant dateOfBuild;
    private Integer height;
    private Integer weight;
    @JoinColumn(table = "base", name = "id")
    private Long baseId;
}
