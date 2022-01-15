package com.evgeniy.transformers.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SPAController {
    @GetMapping("/")
    public String getIndexPage() {
        return "index";
    }
}
