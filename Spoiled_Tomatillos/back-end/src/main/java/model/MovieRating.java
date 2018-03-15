package model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="MovieRating")
public class MovieRating {

    @Id
    @Column(name="MovieRatingID")
    private String movieRatingID;

    @Column(name="Movie")
    private String movieID;

    @Column(name="Up")
    private int up;

    @Column(name="Down")
    private int down;

    public void setMovieRatingID(String id) {
        this.movieRatingID = id;
    }

    public void setMovieID(String movieID) {
        this.movieID = movieID;
    }

    public void setUp(int numUp) {
        this.up = numUp;
    }

    public void setDown(int numDown) {
        this.down = numDown;
    }
}
