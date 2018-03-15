package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.json.simple.JSONObject;

import dao.IUserDao;
import facade.CreateUserFacade;
import model.User;
import model.UserType;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private IUserDao userDao;

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public ResponseEntity<JSONObject> loginUser(@RequestParam("username") String username,
                          @RequestParam("password") String password) {
    User user = userDao.findCredentialsByUsername(username);

    JSONObject response = new JSONObject();

    if (user.getPassword() != null && user.getPassword().equals(password)) {
      response.put("accountId", user.getId());
      response.put("fullName", user.getFullName());
      return new ResponseEntity<>(response, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
  }

  @RequestMapping("/create")
  public String createUser(@RequestBody CreateUserFacade createUserFacade) {
    User userToCreate = new User(createUserFacade.getUsername(),
            createUserFacade.getPassword(),
            createUserFacade.getEmail(),
            createUserFacade.getFullName(),
            new UserType("STANDARD"));

    userDao.createUser(userToCreate);

    return "Account successfully created!";
  }
}
