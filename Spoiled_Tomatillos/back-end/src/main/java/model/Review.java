package model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


/**
 * Review represents the cached information that represents a review. A review is created
 * and stored in database when a User creates one
 */

@Entity
@Table(name="Review")
public class Review implements Serializable {

    public Review() {}

    public Review(String author, String apiMovieId, boolean thumbs, String comment, Date create,
                  Date update) {
        this.author = author;
        this.apiMovieId = apiMovieId;
        this.thumbsUp = thumbs;
        this.comment = comment;
        this.dateCreated = create;
        this.dateUpdated = update;
    }

    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "Id")
    private Long id;

    @ManyToOne
    //@JoinColumn(name="")
    @Column(name = "Author")
    private String author;

    @ManyToOne
    @Column(name = "ApiMovieId")
    private String apiMovieId;

    @Column(name = "ThumbsUp")
    private boolean thumbsUp;

    @Column(name = "Comment")
    private String comment;

    @Column(name = "DateCreated")
    private Date dateCreated;

    @Column(name = "DateUpdated")
    private Date dateUpdated;

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }
}
