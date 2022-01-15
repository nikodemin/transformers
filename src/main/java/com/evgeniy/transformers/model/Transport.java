package com.evgeniy.transformers.model;


import com.evgeniy.transformers.model.enums.TransportType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Transport extends AbstractEntity {
    private String name;
    private String status;
    private TransportType type;
}
