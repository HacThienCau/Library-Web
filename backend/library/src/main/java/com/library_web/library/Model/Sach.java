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
public class Sach {
    @Id
    private Integer maSach;
    private String tenSach;
    private String moTa;
    private String hinhAnh;
    private Integer maTheLoai;
    private Integer maTacGia;
    private Integer nam;
    private String nxb;
    private Integer soLuongTon;
    private Integer soLuongMuon;
}
