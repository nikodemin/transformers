package com.evgeniy.transformers.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Base extends AbstractEntity {
    private String name;
    private Location location;
    @OneToMany(mappedBy = "base", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transformer> transformers;
}

