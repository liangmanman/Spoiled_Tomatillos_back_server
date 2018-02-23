package model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * User represents the cached information that represents a user. A User is created
 * and stored in database when they are created from user registration
 */
@Entity
@Table(name="User")
public class User implements Serializable{

    public User() { }

    public User(String username, String password, String email, String fullName, UserType userType,
                String profilePicPath, String shortBio){
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.userType = userType;
        this.profilePicPath = profilePicPath;
        this.shortBio = shortBio;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "Id")
    private Long id;

    @Column(name = "Username")
    private String username;

    @Column(name = "Password")
    private String password;

    @Column(name = "Email")
    private String email;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "UserType")
    private UserType userType;

    @Column(name = "ProfilePicPath")
    private String profilePicPath;

    @Column(name = "ShortBio")
    private String shortBio;

    @Column(name = "DateCreated")
    private Date dateCreated;

    @Column(name = "LastUpdate")
    private Date lastUpdated;

    public Long getId() {return id;}

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public UserType getUserType() {
        return userType;
    }

    public String getProfilePicPath() {
        return profilePicPath;
    }

    public String getShortBio() {
        return shortBio;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public String getUsername() {
        return username;}

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void seteMail(String email) {
        this.email = email;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public void setProfilePicPath(String profilePicPath) {
        this.profilePicPath = profilePicPath;
    }

    public void setShortBio(String shortBio) {
        this.shortBio = shortBio;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
