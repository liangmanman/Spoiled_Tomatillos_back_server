package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * UserType represents the cached information that represents what type of user
 * a user is. It is created and stored in database when a user is created from user registration
 */

@Entity
@Table(name="UserType")
public class UserType implements Serializable {

    public UserType() {

    }

    public UserType(String type){
        this.type = type;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "Id")
    private Long Id;

    @Column(name = "Type")
    private String type;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}