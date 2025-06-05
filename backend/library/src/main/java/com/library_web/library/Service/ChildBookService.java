package com.library_web.library.Service;

import com.library_web.library.Model.BorrowCard;
import com.library_web.library.Model.ChildBook;
import com.library_web.library.Model.Fine;
import com.library_web.library.Repository.BorrowCardRepo;
import com.library_web.library.Repository.ChildBookRepo;
import com.library_web.library.Repository.FineRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChildBookService {

    @Autowired
    private ChildBookRepo childBookRepo;
    @Autowired
    private BookService parentBookService;
    @Autowired
    private BorrowCardRepo borrowCardRepo;
    @Autowired
    private FineRepo fineRepo;

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

    public Map<String, Object> getChildAndParent(String childId) {
        ChildBook child = layBookTheoId(childId);
        Map<String, Object> parentBook = parentBookService.layBookTheoId(child.getIdParent());
        return Map.of("childBook", child, "parentBook", parentBook);
    }

    public String findBookInBorrowing(String bookId) {
        List<BorrowCard> borrowCards = borrowCardRepo.findByStatusAndChildBookId("Đang mượn", bookId);
        return borrowCards.isEmpty() ? "Sách không có trong phiếu mượn" : borrowCards.get(0).getId();
    }

    public String findBookInLost(String bookId) {
        List<Fine> fineCards = fineRepo.findByCardId(bookId);
        return fineCards.isEmpty() ? "Sách không có trong phiếu phạt" : fineCards.get(0).getId();
    }
}
