package com.group1.capstone.controllers;

import java.util.List;

import com.group1.capstone.exceptions.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.group1.capstone.repository.UserRepository;
import com.group1.capstone.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;



@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/user")
public class UserController {

@Autowired
PasswordEncoder encoder;


@Autowired
private UserRepository userRepository;

  public UserController(UserRepository userRepository){
    this.userRepository = userRepository;
  }

  @GetMapping("/{user_id}")
  public ResponseEntity<User> getByUserId(@PathVariable("user_id") Long id) {
    User user = userRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("User does not exist with the Id: "+id));
    return new ResponseEntity<>(user, HttpStatus.OK);
  }


  @GetMapping("/admin")
  public ResponseEntity<List<User>> getAll() {
    List<User> users = userRepository.findAll();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @PutMapping("/{user_id}/update")
  public ResponseEntity<User> updateUser(@PathVariable("user_id") long id, @RequestBody User userRequest){
    User user = userRepository.findById(id)
            .orElseThrow(
              () -> new ResourceNotFoundException("UserId "+id+" not found"));
    user.setUsername(userRequest.getUsername());
    user.setPassword(encoder.encode(userRequest.getPassword()));
    user.setFirstName(userRequest.getFirstName());
    user.setLastName(userRequest.getLastName());
    user.setCity(userRequest.getCity());
    user.setState(userRequest.getState());
    user.setCountry(userRequest.getCountry());
    user.setDateOfBirth(userRequest.getDateOfBirth());
    return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
  }

  @DeleteMapping("/{user_id}/delete")
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable("user_id") Long id){
    userRepository.deleteById(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  

}
