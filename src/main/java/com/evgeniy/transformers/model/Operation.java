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
public class Operation extends AbstractEntity {
    private String name;
    private Instant startDate;
    private Instant endDate;
    private String enemy;

    @JoinColumn(table = "battle_field", name = "id")
    private Integer battleFieldId;

    @ManyToMany
    @JoinTable(
            name = "operation_transformer",
            joinColumns = {@JoinColumn(name = "operation_id")},
            inverseJoinColumns = {@JoinColumn(name = "transformer_id")}
    )
    private List<Transformer> transformers;

    @ManyToMany
    @JoinTable(
            name = "transport_operation",
            joinColumns = {@JoinColumn(name = "operation_id")},
            inverseJoinColumns = {@JoinColumn(name = "transport_id")}
    )
    private List<Transport> transports;
}
