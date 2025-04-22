package com.library_web.library.Service;

import com.library_web.library.Model.ChildBook;
import com.library_web.library.Repository.ChildBookRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChildBookService {

    @Autowired
    private ChildBookRepo childBookRepo;

    public ChildBook themChild(ChildBook childBook) {
        return childBookRepo.save(childBook);
    }

    public List<ChildBook> getChildBooksByParentId(String idParent) {
        return childBookRepo.findByIdParent(idParent);
    }

    public ChildBook layBookTheoId(String id) {
        return childBookRepo.findById(id).orElse(null);
    }

    public ChildBook capNhatBook(String id, ChildBook.TrangThai status) {
        Optional<ChildBook> optional = childBookRepo.findById(id);
        if (optional.isPresent()) {
            ChildBook childBook = optional.get();
            childBook.setTrangThai(status);
            return childBookRepo.save(childBook);
        } else {
            throw new RuntimeException("Không tìm thấy ChildBook với id: " + id);
        }
    }
}
