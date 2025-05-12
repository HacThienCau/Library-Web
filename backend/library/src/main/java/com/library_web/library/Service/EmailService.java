package com.library_web.library.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.library_web.library.Model.BorrowCard;
import com.library_web.library.Model.User;
import com.library_web.library.Repository.UserRepo;
import com.library_web.library.config.EmailConfig;

@Service
public class EmailService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private SettingService settingService;
    @Autowired
    private EmailConfig emailConfig;
    @Async
    public void mailExpired(BorrowCard borrowCard){
        User user = userRepo.findById(borrowCard.getUserId()).orElseThrow(null);
        String email = user.getEmail();
        String tenND = user.getTenND();
        String idPhieu = borrowCard.getId();
        String subject = "Phiếu mượn sách của bạn đã bị hủy";
        String body = String.format("""
            <h3><b>Xin chào %s,</b></h3>
            <p>Chúng tôi nhận thấy bạn đã đăng ký mượn sách tại <b>Ja97 Library Web</b> nhưng chưa đến nhận sách trong thời gian quy định.</p>
            <p>Vì lý do đó, <b>phiếu mượn sách <i>%s</i> của bạn đã bị hủy</b> để đảm bảo công bằng cho các bạn đọc khác.</p>
            <p>Nếu có sự nhầm lẫn hoặc bạn vẫn có nhu cầu mượn sách, vui lòng đăng ký lại hoặc liên hệ với quản trị viên để được hỗ trợ.</p>
            <p>Trân trọng,<br><b>Ja97 Library Web</b></p>
        """, tenND, idPhieu);
        emailConfig.sendEmail(List.of(email), subject, body);
    }
    @Async
    public void mailTaken(BorrowCard borrowCard){
        User user = userRepo.findById(borrowCard.getUserId()).orElseThrow(null);
        String email = user.getEmail();
        String tenND = user.getTenND();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String ngayLay = borrowCard.getGetBookDate().format(formatter).toString();
        String ngayTra = borrowCard.getDueDate().format(formatter).toString();
        String idPhieu = borrowCard.getId();
        String subject = "Bạn đã trả sách thành công!";
        String body = String.format("""
            <h3><b>Xin chào %s,</b></h3>
            <p>Chúng tôi xác nhận rằng bạn đã <b>nhận sách thành công</b> theo <b>phiếu mượn %s</b> tại <b>Ja97 Library Web</b>.</p>
            <p>Hãy ghi nhớ <b>ngày hết hạn trả sách</b> để tránh bị phạt!</p>
            <p>Thông tin phiếu mượn:</p>
            <ul>
            <li><b>Mã phiếu:</b> %s</li>
            <li><b>Ngày lấy sách:</b> %s</li>
            <li><b>Ngày trả dự kiến:</b> %s</li>
            </ul>
            <<p>Chúc bạn có trải nghiệm đọc sách thật tuyệt vời!</p>
            <p>Trân trọng,<br><b>Ja97 Library Web</b></p>
        """, tenND, idPhieu, idPhieu, ngayLay, ngayTra);
        emailConfig.sendEmail(List.of(email), subject, body);
    }
    @Async
    public void mailHoiTraSach(List<BorrowCard> list){
        int startToMail = settingService.getSetting().getStartToMail(); //ngày bắt đầu gửi trong setting
        LocalDate today = LocalDate.now();  //ngày hôm nay
        List<String> targetList = new ArrayList<>();
        for (BorrowCard card : list){
            LocalDate startDate = card.getDueDate().toLocalDate().minusDays(startToMail); //ngày bắt đầu gửi mail tùy phiếu
            if(today.isEqual(startDate) || today.isAfter(startDate)){
                User user = userRepo.findById(card.getUserId()).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
                String email = user.getEmail();
                targetList.add(email);
            }
        }
        String subject = "Sắp đến hạn trả sách";
        String body = """
            <h3><b>Xin chào,</b></h3>
            <p>Đây là thông báo quan trọng từ <b>Ja97 Library Web</b> dành cho bạn.</p>
            <p>Vui lòng kiểm tra <i>thông tin mượn sách</i> của bạn càng sớm càng tốt.</p>
            <p>Trân trọng,<br>Ja97 Library Web</p>
        """;
        emailConfig.sendEmail(targetList, subject, body);
    }
    @Async
    public void mailReturned(BorrowCard borrowCard){
        User user = userRepo.findById(borrowCard.getUserId()).orElseThrow(null);
        String email = user.getEmail();
        String tenND = user.getTenND();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String ngayTra = borrowCard.getDueDate().format(formatter).toString();
        String idPhieu = borrowCard.getId();
        String subject = "Bạn đã trả sách thành công!";
        String body = String.format("""
            <h3><b>Xin chào %s,</b></h3>
            <p>Chúng tôi xác nhận rằng bạn đã <b>trả sách thành công</b> tại <b>Ja97 Library Web</b>.</p>
            <p>Thông tin phiếu mượn:</p>
            <ul>
            <li><b>Mã phiếu:</b> %s</li>
            <li><b>Ngày trả:</b> %s</li>
            </ul>
            <p>Cảm ơn bạn đã sử dụng dịch vụ thư viện của chúng tôi. Hy vọng sẽ tiếp tục được phục vụ bạn trong những lần mượn tiếp theo.</p>
            <p>Trân trọng,<br><b>Ja97 Library Web</b></p>
        """, tenND, idPhieu, ngayTra);
        emailConfig.sendEmail(List.of(email), subject, body);
    }
}
