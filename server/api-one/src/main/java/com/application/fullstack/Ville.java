package com.application.fullstack;

public class Ville {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;
    private String region;
    private int population;

    // Constructeurs, Getters et Setters
    public Ville() {}

    public Ville(Long id, String name, double latitude, double longitude, String region, int population) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.region = region;
        this.population = population;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public int getPopulation() { return population; }
    public void setPopulation(int population) { this.population = population; }
}
