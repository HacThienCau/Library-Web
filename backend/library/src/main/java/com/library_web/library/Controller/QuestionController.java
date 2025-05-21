package com.library_web.library.Controller;

import com.library_web.library.Model.Question;
import com.library_web.library.Repository.QuestionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/questions")
public class QuestionController {

  @Autowired
  private QuestionRepo questionRepository;

  // Lấy câu hỏi theo sách
  @GetMapping("/book/{bookId}")
  public List<Question> getByBook(@PathVariable String bookId) {
    return questionRepository.findByBookId(bookId);
  }

  // Tạo câu hỏi
  @PostMapping
  public Question create(@RequestBody Question question) {
    return questionRepository.save(question);
  }

  // Trả lời câu hỏi
  @PutMapping("/{id}/answer")
  public ResponseEntity<Question> answer(
      @PathVariable String id,
      @RequestBody String answer) {
    Optional<Question> optional = questionRepository.findById(id);
    if (optional.isPresent()) {
      Question q = optional.get();
      q.setAnswer(answer);
      return ResponseEntity.ok(questionRepository.save(q));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  // Xoá câu hỏi
  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) {
    questionRepository.deleteById(id);
  }
}