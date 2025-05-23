package com.library_web.library.DTO;

import com.library_web.library.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetail {
    private User user;
    private int soSachDangMuon;
    private int soSachQuaHan;
}
