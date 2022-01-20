package com.evgeniy.transformers.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.time.Instant;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Upgrade extends AbstractEntity {
    private Instant date;
    private Instant checkDate;
    @JoinColumn(table = "transformer", name = "id")
    private Integer transformerId;
    @ManyToMany
    @JoinTable(
            name = "upgrade_modification",
            joinColumns = {@JoinColumn(name = "upgrade_id")},
            inverseJoinColumns = {@JoinColumn(name = "modification_id")}
    )
    private List<Modification> modifications;
}
