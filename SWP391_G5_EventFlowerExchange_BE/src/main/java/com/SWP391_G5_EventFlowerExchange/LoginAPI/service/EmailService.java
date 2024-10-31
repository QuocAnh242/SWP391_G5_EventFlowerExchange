package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Order;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Locale;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("posteventblooms@gmail.com");

        mailSender.send(message);
        System.out.println("Email sent to " + to);
    }
    /// gửi mail khi đã đặt hàng
    public void sendOrderConfirmationEmail(Order order) {
        String to = order.getUser().getEmail();
        String subject = "Xác nhận đơn hàng #" + order.getOrderID();
        // Định dạng giá tiền
        NumberFormat fomat = NumberFormat.getInstance(new Locale("vi", "VN"));
        String newFomatPrice = fomat.format(order.getTotalPrice()) + " VNĐ";
        String body = "<h2>Xin chào " + order.getUser().getUsername() + ",</h2>" +
                "<p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi!</p>" +
                "<p>Thông tin đơn hàng của bạn:</p>" +
                "<ul>" +
                "<li>Mã đơn hàng: " + order.getOrderID() + "</li>" +
                "<li>Ngày đặt hàng: " + order.getOrderDate() + "</li>" +
                "<li>Tổng tiền: " + newFomatPrice  + "</li>" +
                "<li>Địa chỉ giao hàng: " + order.getShippingAddress() + "</li>" +
                "</ul>" +
                "<p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để giao hàng.</p>" +
                "<p>Trân trọng,</p>" +
                "<p>Đội ngũ Flower Exchange</p>";


        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // `true` để gửi nội dung HTML

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();

        }
    }
}
