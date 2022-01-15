package com.evgeniy.transformers.model;


import com.evgeniy.transformers.model.enums.EnergonType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Energon extends AbstractEntity {
    private EnergonType type;
    private Integer capacityLeft;
    private Integer kkal;
    private Integer weight;
}
