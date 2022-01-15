package com.evgeniy.transformers.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Data
@Embeddable
@NoArgsConstructor
public class Location {
    private Double latitude;
    private Double longitude;
}
