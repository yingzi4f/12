package com.project.demo.entity;



import lombok.Data;

@Data
public class Flight {
    private String flightId;
    private String departureCity;
    private String arrivalCity;
    private Double price;
    private Integer remainingTickets;
    private Integer clickCount;
    private String departureTime;
    private String airline;
}