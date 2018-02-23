package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
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

    public UserType(int type){
        this.type = type;
    }

    @Id
    @Column(name = "Username")
    private int type;

    
}