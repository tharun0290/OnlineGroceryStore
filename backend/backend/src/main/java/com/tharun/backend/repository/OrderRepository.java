package com.tharun.backend.repository;

import com.tharun.backend.entity.Order;
import com.tharun.backend.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
    List<Order> findAllByOrderByOrderDateDesc();
    long countByStatus(OrderStatus status);
    long countByStatusNot(OrderStatus status);
}
