package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.json.simple.JSONObject;

import facade.UserFacade;
import model.User;
import model.UserType;
import service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public ResponseEntity<JSONObject> loginUser(@RequestBody UserFacade userFacade) {
    User user = userService.loginUser(userFacade.getUsername(), userFacade.getPassword());

    JSONObject response = new JSONObject();

    if (user != null) {
      response.put("userId", user.getId());
      response.put("fullName", user.getFullName());
      return new ResponseEntity<>(response, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
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
