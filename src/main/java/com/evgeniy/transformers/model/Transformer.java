package com.evgeniy.transformers.model;

import com.evgeniy.transformers.model.enums.TransformerPost;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Transformer extends AbstractEntity {
    private String name;
    private Instant dateOfBuild;
    private Integer height;
    private Integer weight;
    @Enumerated(value = EnumType.STRING)
    private TransformerPost post;
    private Instant hiringDate;
    @JoinColumn(table = "base", name = "id")
    private Integer baseId;
    @ManyToMany(mappedBy = "transformers")
    private List<Operation> operations;
}
