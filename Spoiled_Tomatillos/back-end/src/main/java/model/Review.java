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
 * Review represents the cached information that represents a review. A review is created
 * and stored in database when a User creates one
 */

@Entity
@Table(name="Review")
public class Review implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id")
    private Long id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name= "Username")
    private String username;

    @ManyToOne(targetEntity = Movie.class)
    @JoinColumn(name = "ApiMovieId")
    private String apiMovieId;

    @Column(name = "ThumbsUp")
    private boolean thumbsUp;

    @Column(name = "Comment")
    private String comment;

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

    public Review() { }

    public Review(String username, String apiMovieId, boolean thumbs, String comment) {
        this.username = username;
        this.apiMovieId = apiMovieId;
        this.thumbsUp = thumbs;
        this.comment = comment;
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

    public boolean isThumbsUp() {
        return thumbsUp;
    }

    public void setThumbsUp(boolean thumbsUp) {
        this.thumbsUp = thumbsUp;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
