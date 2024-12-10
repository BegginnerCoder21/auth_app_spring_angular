package com.auth_app.authentication_app.service;

import com.auth_app.authentication_app.entities.User;
import com.auth_app.authentication_app.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Object userStore(User user)
    {
        User userFound = this.userRepository.findByEmail(user.getEmail());

        if (userFound == null){
            String hashedPassword = this.passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);


            return this.userRepository.save(user);
        }

        return "Ce utilisateur existe déjà";

    }

    public boolean login(User user)
    {
        User userLogin = this.userRepository.findByEmail(user.getEmail());
        boolean checkedPassword = false;

        if (userLogin != null){

            checkedPassword = passwordEncoder.matches(user.getPassword(), userLogin.getPassword());

        }

        return checkedPassword;
    }
}
