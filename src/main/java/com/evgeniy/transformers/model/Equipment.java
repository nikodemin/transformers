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
public class Equipment extends AbstractEntity {
    private String name;
    private String type;
    private Integer quantity;
    private Instant takeDate;
    @JoinColumn(table = "position", name = "id")
    private Integer positionId;
}
