package com.project.demo.entity;

import lombok.Data;

@Data
public class PriceTicketRelation {
    private Double price;
    private Integer remainingTickets;
}