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
public class ChildBook {
    @Id
    private String id;
    private String idParent;
    private TrangThai trangThai;
    private String link;
    public enum TrangThai {
        CON_SAN("Còn sẵn"),
        DANG_MUON("Đang mượn"),
        DA_XOA("Đã xóa");
        private final String moTa;

        TrangThai(String moTa) {
            this.moTa = moTa;
        }

        @com.fasterxml.jackson.annotation.JsonValue
        public String getMoTa() {
            return moTa;
        }
    }
}
