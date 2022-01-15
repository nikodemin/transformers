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
public class Operation extends AbstractEntity {
    private String name;
    private Instant startDate;
    private Instant endDate;
    private String enemy;
    @JoinColumn(table = "battle_field", name = "id")
    private Long battleFieldId;
}
