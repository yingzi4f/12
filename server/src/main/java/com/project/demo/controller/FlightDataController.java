package com.project.demo.controller;

import com.project.demo.entity.FlightStats;
import com.project.demo.service.FlightDataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FlightDataController {

    @Autowired
    private FlightDataService flightDataService;

    @GetMapping("/stats")
    public FlightStats getFlightStats() {
        //log.info("获取航班统计数据");
        return flightDataService.getFlightStats();
    }

    @GetMapping("/stats/{departureCity}")
    public FlightStats getFlightStatsByCity(@PathVariable String departureCity) {
        //log.info("获取{}的航班统计数据", departureCity);
        return flightDataService.getFlightStatsByDepartureCity(departureCity);
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Flight Analysis Service is running!";
    }
}