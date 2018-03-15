package facade;

public class UserFacade {

  private String fullName;
  private String username;
  private String email;
  private String password;

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() { return password; }

  public void setPassword(String password) {
    this.password = password;
  }

}
