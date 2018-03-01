package model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;


/**
 * User represents the cached information that represents a user. A User is created
 * and stored in database when they are created from user registration
 */
@Entity
@Table(name="User")
public class User implements Serializable{

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "Id")
    private Long id;

    @Column(name = "Username", unique = true)
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

    @Column(name = "LastUpdated")
    private Date lastUpdated;

    @PrePersist
    protected void onCreate() {
        dateCreated = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = new Date();
    }

    public User() { }

    public User(String username, String password, String email, String fullName, UserType userType){
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.userType = userType;
    }

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getProfilePicPath() {
        return profilePicPath;
    }

    public void setProfilePicPath(String profilePicPath) {
        this.profilePicPath = profilePicPath;
    }

    public String getShortBio() {
        return shortBio;
    }

    public void setShortBio(String shortBio) {
        this.shortBio = shortBio;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
