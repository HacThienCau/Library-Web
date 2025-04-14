package com.library_web.library.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Setting {
    @Id
    private String id;
    private int finePerDay;
    public Setting(int finePerDay) {
        this.finePerDay = finePerDay;
    }
}