package com.evgeniy.transformers.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Position extends AbstractEntity {
    private Location location;
    @JoinColumn(table = "energon", name = "id")
    private Long energonId;
    @JoinColumn(table = "battle_field", name = "id")
    private Long battleFieldId;
    @JoinColumn(table = "military_transformer_id", name = "id")
    private Long militaryTransformerId;
    @JoinColumn(table = "weapon", name = "id")
    private Long weaponId;
}
