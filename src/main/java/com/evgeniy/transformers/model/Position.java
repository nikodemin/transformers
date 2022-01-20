package com.evgeniy.transformers.model;


import com.evgeniy.transformers.model.enums.Squad;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Position extends AbstractEntity {
    private Location location;
    @Enumerated(value = EnumType.STRING)
    private Squad squad;
    @JoinColumn(table = "energon", name = "id")
    private Integer energonId;
    @JoinColumn(table = "battle_field", name = "id")
    private Integer battleFieldId;
    @JoinColumn(table = "transformer_id", name = "id")
    private Integer transformerId;
    @JoinColumn(table = "weapon", name = "id")
    private Integer weaponId;
}
