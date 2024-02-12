package com.application.fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/cities")
public class VilleController {
    private final VilleService villeService;

    @Autowired
    public VilleController(VilleService villeService) {
        this.villeService = villeService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{latitude}/{longitude}")
    public List<Ville> getVillesNear(@PathVariable double latitude, @PathVariable double longitude) {
        return villeService.findVillesNear(latitude, longitude);
    }
}
