package com.evgeniy.transformers.model;


import com.evgeniy.transformers.model.enums.EnergonType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Energon extends AbstractEntity {
    @Enumerated(value = EnumType.STRING)
    private EnergonType type;
    private Integer capacityLeft;
    private Integer kkal;
    private Integer weight;
}
