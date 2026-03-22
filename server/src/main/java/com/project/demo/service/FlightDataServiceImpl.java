package com.project.demo.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.demo.entity.Flight;
import com.project.demo.entity.FlightStats;
import com.project.demo.entity.PriceTicketRelation;
import com.project.demo.entity.TopFlight;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class FlightDataServiceImpl implements FlightDataService {

    @Autowired
    private HdfsService hdfsService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public FlightStats getFlightStats() {
        try {
            // 从HDFS读取航班数据
            String flightData = hdfsService.readFile("/user/root/flight_data/flights.json");
            List<Flight> flights = objectMapper.readValue(flightData, new TypeReference<List<Flight>>() {});

            return calculateStats(flights);
        } catch (Exception e) {
            ////log.error("获取航班统计数据失败", e);
            return getMockData(); // 失败时返回模拟数据
        }
    }

    @Override
    public FlightStats getFlightStatsByDepartureCity(String departureCity) {
        try {
            String flightData = hdfsService.readFile("/user/root/flight_data/flights.json");
            List<Flight> flights = objectMapper.readValue(flightData, new TypeReference<List<Flight>>() {});

            // 过滤指定出发城市的航班
            List<Flight> filteredFlights = flights.stream()
                    .filter(flight -> flight.getDepartureCity().equalsIgnoreCase(departureCity))
                    .collect(Collectors.toList());

            return calculateStats(filteredFlights);
        } catch (Exception e) {
            ////log.error("按城市获取航班统计数据失败", e);
            return getMockData();
        }
    }

    private FlightStats calculateStats(List<Flight> flights) {
        FlightStats stats = new FlightStats();

        // 计算基本统计信息
        stats.setTotalFlights(flights.size());

        Set<String> cities = flights.stream()
                .map(Flight::getDepartureCity)
                .collect(Collectors.toSet());
        stats.setDepartureCities(cities.size());

        Double averagePrice = flights.stream()
                .mapToDouble(Flight::getPrice)
                .average()
                .orElse(0.0);
        stats.setAveragePrice(averagePrice);

        // 计算票量分布
        Map<String, Integer> distribution = flights.stream()
                .collect(Collectors.groupingBy(
                        Flight::getDepartureCity,
                        Collectors.summingInt(Flight::getRemainingTickets)
                ));
        stats.setTicketDistribution(distribution);

        // 计算点击率Top5
        List<TopFlight> topFlights = flights.stream()
                .sorted((f1, f2) -> Integer.compare(f2.getClickCount(), f1.getClickCount()))
                .limit(5)
                .map(flight -> {
                    TopFlight topFlight = new TopFlight();
                    topFlight.setRoute(flight.getDepartureCity() + " → " + flight.getArrivalCity());
                    topFlight.setClickCount(flight.getClickCount());
                    return topFlight;
                })
                .collect(Collectors.toList());
        stats.setTopFlights(topFlights);

        // 计算票价与余票关系
        List<PriceTicketRelation> relations = flights.stream()
                .map(flight -> {
                    PriceTicketRelation relation = new PriceTicketRelation();
                    relation.setPrice(flight.getPrice());
                    relation.setRemainingTickets(flight.getRemainingTickets());
                    return relation;
                })
                .collect(Collectors.toList());
        stats.setPriceTicketRelations(relations);

        return stats;
    }

    private FlightStats getMockData() {
        // 提供模拟数据用于演示
        FlightStats stats = new FlightStats();
        stats.setTotalFlights(1248);
        stats.setDepartureCities(38);
        stats.setAveragePrice(876.0);
        stats.setAverageOccupancyRate(78.3);

        // 模拟票量分布
        Map<String, Integer> distribution = new HashMap<>();
        distribution.put("北京", 125);
        distribution.put("上海", 87);
        distribution.put("广州", 156);
        distribution.put("深圳", 92);
        distribution.put("成都", 113);
        distribution.put("杭州", 78);
        distribution.put("武汉", 95);
        distribution.put("西安", 120);
        stats.setTicketDistribution(distribution);

        // 模拟Top5航班
        List<TopFlight> topFlights = Arrays.asList(
                createTopFlight("北京 → 上海", 4328),
                createTopFlight("广州 → 成都", 3875),
                createTopFlight("深圳 → 杭州", 3542),
                createTopFlight("上海 → 厦门", 3210),
                createTopFlight("成都 → 昆明", 2987)
        );
        stats.setTopFlights(topFlights);

        // 模拟票价余票关系
        List<PriceTicketRelation> relations = Arrays.asList(
                createRelation(420.0, 180),
                createRelation(580.0, 120),
                createRelation(650.0, 95),
                createRelation(720.0, 85),
                createRelation(890.0, 60),
                createRelation(1050.0, 45)
        );
        stats.setPriceTicketRelations(relations);

        return stats;
    }

    private TopFlight createTopFlight(String route, int clickCount) {
        TopFlight topFlight = new TopFlight();
        topFlight.setRoute(route);
        topFlight.setClickCount(clickCount);
        return topFlight;
    }

    private PriceTicketRelation createRelation(Double price, Integer tickets) {
        PriceTicketRelation relation = new PriceTicketRelation();
        relation.setPrice(price);
        relation.setRemainingTickets(tickets);
        return relation;
    }
}