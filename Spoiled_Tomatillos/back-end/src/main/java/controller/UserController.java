package controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import facade.CreateUserFacade;

@RestController
@RequestMapping("/users")
public class UserController {

  @RequestMapping("/login")
  public String loginUser(@RequestParam("username") String username,
                          @RequestParam("password") String password) {
    return "Logging in user " + username;
  }

  @RequestMapping("/create")
  public String createUser(@RequestBody CreateUserFacade createUserFacade) {
    return "Create user " + createUserFacade.getUsername();
  }
}
