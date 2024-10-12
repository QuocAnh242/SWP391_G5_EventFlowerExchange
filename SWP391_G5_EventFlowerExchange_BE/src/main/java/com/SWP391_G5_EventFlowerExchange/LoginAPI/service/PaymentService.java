package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.Payment;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService implements IPaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPayment(int paymentID) {
        return paymentRepository.findById(paymentID)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public Payment updatePayment(int paymentID, Payment payment) {
        Payment existingPayment = getPayment(paymentID);
        existingPayment.setMethod(payment.getMethod());
        existingPayment.setStatus(payment.getStatus());
        existingPayment.setDate(payment.getDate());
        existingPayment.setOrder(payment.getOrder());
        return paymentRepository.save(existingPayment);
    }

    @Override
    public void deletePayment(int paymentID) {
        paymentRepository.deleteById(paymentID);
    }
}
