package com.auth_app.authentication_app.controller;


import com.auth_app.authentication_app.entities.User;
import com.auth_app.authentication_app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    public String test()
    {
        return "test d'api";
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public Object userStore(@Valid @RequestBody User user, BindingResult result)
    {
        if(result.hasErrors())
        {
            //recupère tous les erreurs liée à la saisi du user
            var allErrors = result.getAllErrors();
            HashMap<String, String> errorMap = new HashMap<String, String>();

            allErrors.forEach(error -> {

                //Recupère les erreurs de type champs et sont mis dans le map préalablement declaré
                var fieldName = (FieldError) error;
                errorMap.put(fieldName.getField(), error.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errorMap);
        }

        return this.userService.userStore(user);
    }

    @PostMapping(value = "/login", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public boolean login(@RequestBody User user)
    {

        return this.userService.login(user);
    }

}
