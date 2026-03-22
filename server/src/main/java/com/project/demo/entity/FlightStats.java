package com.project.demo.entity;


import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class FlightStats {
    private Integer totalFlights;
    private Integer departureCities;
    private Double averagePrice;
    private Double averageOccupancyRate;
    private Map<String, Integer> ticketDistribution;
    private List<TopFlight> topFlights;
    private List<PriceTicketRelation> priceTicketRelations;
}