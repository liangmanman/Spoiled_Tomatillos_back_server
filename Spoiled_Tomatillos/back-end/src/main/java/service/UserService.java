package service;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.IUserDao;
import model.User;

@Service
public class UserService {

  private static final String SECRET_KEY = "aJ29Ca!$fv(jaL";

  @Autowired
  private IUserDao userDao;

  private StandardPBEStringEncryptor encryptor;

  public UserService() {
    this.encryptor = new StandardPBEStringEncryptor();
    encryptor.setPassword(SECRET_KEY);
  }

  public User loginUser(String username, String password) {
    User user = userDao.findCredentialsByUsername(username);

    if (password != null && user.getPassword() != null) {
      String passwordHash = encryptor.decrypt(user.getPassword());
      if (BCrypt.checkpw(password, passwordHash)) {
        return user;
      }
    }
    return null;
  }

  public String createUser(User userToCreate, String password) {
    String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt(12));
    userToCreate.setPassword(encryptor.encrypt(passwordHash));
    userDao.createUser(userToCreate);

    return "Account created successfully!";
  }
}
