package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dao.IUserDao;
import facade.CreateUserFacade;
import model.User;
import model.UserType;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private IUserDao userDao;

  @RequestMapping(value = "/login", method = RequestMethod.GET)
  public String loginUser(@RequestParam("username") String username,
                          @RequestParam("password") String password) {
    User user = userDao.findCredentialsByUsername(username);

    if (user.getPassword() != null && user.getPassword().equals(password)) {
      return "Login Success!";
    }
    else {
      return "Login Failed! Invalid Username/Email or Password.";
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
