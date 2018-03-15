package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import facade.UserFacade;
import model.User;
import model.UserType;
import service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public String loginUser(@RequestBody UserFacade userFacade) {
    return userService.loginUser(userFacade.getUsername(), userFacade.getPassword());
  }

  @RequestMapping(value = "/create", method = RequestMethod.POST)
  public String createUser(@RequestBody UserFacade userFacade) {
    User userToCreate = new User(userFacade.getUsername(),
            null,
            userFacade.getEmail(),
            userFacade.getFullName(),
            new UserType("STANDARD"));

    return userService.createUser(userToCreate, userFacade.getPassword());
  }
}
