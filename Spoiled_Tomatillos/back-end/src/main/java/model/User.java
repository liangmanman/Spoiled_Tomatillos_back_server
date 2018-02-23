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
}
