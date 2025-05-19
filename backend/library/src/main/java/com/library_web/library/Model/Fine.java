package com.library_web.library.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fine {
    @Id
    private String id;
    private String userId;
    private double soTien;
    private String noiDung;
    private String cardId;
    private TrangThai trangThai;
    private LocalDateTime ngayThanhToan;
    public enum TrangThai {
        CHUA_THANH_TOAN("Chưa Thanh Toán"),
        DA_THANH_TOAN("Đã Thanh Toán");
        private final String moTa;

        TrangThai(String moTa) {
            this.moTa = moTa;
        }

        public String getMoTa() {
            return moTa;
        }
    }
}
