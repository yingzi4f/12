package com.project.demo.service;

import com.project.demo.entity.FlightStats;

public interface FlightDataService {
    FlightStats getFlightStats();
    FlightStats getFlightStatsByDepartureCity(String departureCity);
}