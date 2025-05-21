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
public class Question {
  @Id
  private String id;

  private String bookId;
  private String userId;

  private String question;
  private String answer; // Trả lời của admin

  private LocalDateTime createdAt = LocalDateTime.now();
}
