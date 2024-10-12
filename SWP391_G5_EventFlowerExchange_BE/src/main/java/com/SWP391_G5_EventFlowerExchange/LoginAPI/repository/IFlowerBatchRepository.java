package com.SWP391_G5_EventFlowerExchange.LoginAPI.repository;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IFlowerBatchRepository extends JpaRepository<FlowerBatch, Integer> {
    Optional<FlowerBatch> findByFlowerID(int id);

}
