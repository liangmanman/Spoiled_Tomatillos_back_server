package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Review")
public class FavoriteMovie implements Serializable {

    public FavoriteMovie(String user, long movie, Date create, Date update) {
        this.userId = user;
        this.movieId = movie;
        this.dateCreated = create;
        this.dateUpdated = update;
    }

    public FavoriteMovie(String user, long movie) {
        this.userId = user;
        this.movieId = movie;
    }

    @Id
    @Column(name = "userId")
    private String userId;

    @Column(name = "movieId")
    private long movieId;

    @Column(name = "DateCreated")
    private Date dateCreated;

    @Column(name = "LastUpdate")
    private Date dateUpdated;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getMovieId() {
        return movieId;
    }

    public void setMovieId(long movieId) {
        this.movieId = movieId;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }
}
