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
public class Upgrade extends AbstractEntity {
    private Instant date;
    private Instant checkDate;
    @JoinColumn(table = "transformer", name = "id")
    private Long transformerId;
}
