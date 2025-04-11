package com.library_web.library.Controller;

import com.library_web.library.Model.ChildBook;
import com.library_web.library.Respository.ChildBookRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ChildBookController {

    @Autowired
    ChildBookRepo ChildBookRepo;

    @PostMapping("/addChild")
    public ChildBook themChild(@RequestBody ChildBook ChildBook) {
        return ChildBookRepo.save(ChildBook);
    }

    // Lấy tất cả sách theo id cha
    @GetMapping("/childrenOf/{idParent}")
    public List<ChildBook> getChildBooksByParentId(@PathVariable String idParent) {
        return ChildBookRepo.findByIdParent(idParent);
    }

    // Lấy sách theo ID
    @GetMapping("/child/{id}")
    public ChildBook layBookTheoId(@PathVariable String id) {
        return ChildBookRepo.findById(id).orElse(null);
    }

    // Cập nhật trạng thái sách
    @PutMapping("/child/{id}")
    public ChildBook capNhatBook(@PathVariable String id, @RequestBody ChildBook.TrangThai status) {
        Optional<ChildBook> optional = ChildBookRepo.findById(id);
        if (optional.isPresent()) {
            ChildBook childBook = optional.get();
            childBook.setTrangThai(status);
            return ChildBookRepo.save(childBook);
        } else {
            throw new RuntimeException("Không tìm thấy ChildBook với id: " + id);
        }        
    }
}
