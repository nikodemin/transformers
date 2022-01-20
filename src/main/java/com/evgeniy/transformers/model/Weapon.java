package com.evgeniy.transformers.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Weapon extends AbstractEntity {
    private String name;
    private String type;
    private String caliber;
    private Integer rateOfFire;
    private Integer rangeOfFire;
}
