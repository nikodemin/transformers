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
public class Injury extends AbstractEntity {
    private String type;
    private String description;
    private Instant date;
    @JoinColumn(table = "transformer", name = "id")
    private Integer transformerId;
}
