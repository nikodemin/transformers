package com.evgeniy.transformers.model;

import com.evgeniy.transformers.model.enums.Squad;
import com.evgeniy.transformers.model.enums.Terrain;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BattleField extends AbstractEntity {
    private String name;
    //todo add table
    private Set<Squad> squads;
    private Terrain terrain;
}
