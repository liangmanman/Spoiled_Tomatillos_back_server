package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * User represents the cached information that represents a user. A User is created
 * and stored in database when they are created from user registration
 */
@Entity
@Table(name="UserType")
public class UserType {

    public UserType() {

    }

    public UserType(int type){
        this.type = type;
    }

    @Id
    @Column(name = "Username")
    private int type;



}