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
public class Inspection extends AbstractEntity {
    private Instant serviceDate;
    private String description;
    @JoinColumn(table = "transformer", name = "id")
    private Integer transformerId;
    @JoinColumn(table = "transport", name = "id")
    private Integer transportId;
}
