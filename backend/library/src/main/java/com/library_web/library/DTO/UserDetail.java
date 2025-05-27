package com.library_web.library.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetail {
    private String id;
    private String tenND;
    private String avatarUrl;
    private String sdt;
    private String email;
    private String matKhau;
    private String ngaySinh;
    private String gioiTinh;
    private String ngayTao;

    private int soSachDangMuon;
    private int soSachQuaHan;
}
