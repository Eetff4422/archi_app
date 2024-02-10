package com.application.fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VilleService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public VilleService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Ville> findVillesNear(double lat, double lon) {
        // Rayon de la Terre en km
        final double R = 6371;
        // Convertir le rayon en radians
        double radiusInRadians = 50 / R;

        String sql = "SELECT * FROM ville WHERE " +
                "acos(sin(?)*sin(radians(latitude)) + cos(?)*cos(radians(latitude))*cos(radians(longitude)-?)) <= ?";

        return jdbcTemplate.query(sql, new Object[]{
                Math.toRadians(lat),  // latitude en radians
                Math.toRadians(lat),  // répéter la latitude pour la condition
                Math.toRadians(lon),  // longitude en radians
                radiusInRadians       // rayon en radians
        }, rowMapper);
    }

    private final RowMapper<Ville> rowMapper = (rs, rowNum) -> new Ville(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getDouble("latitude"),
            rs.getDouble("longitude"),
            rs.getString("region"),
            rs.getInt("population")
    );
}
