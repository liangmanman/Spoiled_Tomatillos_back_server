package dao;

import java.util.List;

import model.User;

public interface IUserDao {
  List<User> findAllUsers();

  User findCredentialsByUsername(String username);

  User findUserByUsername(String username);

  void createUser(User user);
}
