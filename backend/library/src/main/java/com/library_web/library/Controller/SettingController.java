package com.library_web.library.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.library_web.library.Model.Setting;
import com.library_web.library.Service.SettingService;

@RequestMapping("/settings")
@RestController
public class SettingController {
    @Autowired
    private SettingService settingService;

    @GetMapping
    public Setting getSetting() {
        return settingService.getSetting();
    }

    @PostMapping
    public Setting updateSetting(@RequestBody Setting setting) {
        return settingService.updateSetting(setting);
    }
}
