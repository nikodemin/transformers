package com.evgeniy.transformers.model;

import com.evgeniy.transformers.model.enums.TransformerPost;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.time.Instant;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
// todo think about hibernate inheritance
public class MilitaryTransformer extends Transformer {
    private TransformerPost post;
    private Instant hiringDate;
}
