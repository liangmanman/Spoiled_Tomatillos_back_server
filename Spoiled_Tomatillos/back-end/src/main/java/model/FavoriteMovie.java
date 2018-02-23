package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;


/**
 * User represents the cached information that represents a User's favorite movie.
 * A favorite movie is created and stored in database when it is created from
 * a user
 */

@Entity
@Table(name="Review")
public class FavoriteMovie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id")
    private Long id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "Username")
    private String username;

    @ManyToOne(targetEntity = Movie.class)
    @JoinColumn(name = "ApiMovieId")
    private String apiMovieId;

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

    public FavoriteMovie() {}

    public FavoriteMovie(String username, String apiMovieId) {
        this.username = username;
        this.apiMovieId = apiMovieId;
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

    public String getApiMovieId() {
        return apiMovieId;
    }

    public void setApiMovieId(String apiMovieId) {
        this.apiMovieId = apiMovieId;
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
