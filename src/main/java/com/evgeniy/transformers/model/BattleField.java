package com.evgeniy.transformers.model;

import com.evgeniy.transformers.model.enums.Terrain;
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
public class BattleField extends AbstractEntity {
    private String name;
    @Enumerated(value = EnumType.STRING)
    private Terrain terrain;
}
