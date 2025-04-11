package com.library_web.library.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    private String tenSach;
    private String moTa;
    private List<String> hinhAnh;
    private String theLoai;
    private String tenTacGia;
    private Integer nam;
    private String nxb;
    private Integer tongSoLuong;
    private Integer soLuongMuon;
    private Integer soLuongXoa;
}
