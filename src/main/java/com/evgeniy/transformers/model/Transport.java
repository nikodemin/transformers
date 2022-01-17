package com.evgeniy.transformers.model;


import com.evgeniy.transformers.model.enums.TransportType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Transport extends AbstractEntity {
    private String name;
    private String status;
    @Enumerated(value = EnumType.STRING)
    private TransportType type;
    @ManyToMany(mappedBy = "transports")
    private List<Operation> operations;
}
