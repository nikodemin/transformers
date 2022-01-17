package com.evgeniy.transformers.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Modification extends AbstractEntity {
    private String name;
    private String affectedBodyPart;
    private Integer cost;
    @ManyToMany(mappedBy = "modifications")
    private List<Upgrade> upgrades;
}
