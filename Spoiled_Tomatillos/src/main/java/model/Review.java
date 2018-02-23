package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Review")
public class Review implements Serializable {

    public Review(String iauthor, String icomment) {
        this.author = iauthor;
        this.comment = icomment;
    }

    public Review(String iauthor, boolean thumbs, String icomment, Date create, Date update) {
        this.author = iauthor;
        this.thumbsUp = thumbs;
        this.comment = icomment;
        this.dateCreated = create;
        this.dateUpdated = update;
    }

    @Id
    @Column(name = "author")
    private String author;

    @Column(name = "thumbsUp")
    private boolean thumbsUp;

    @Column(name = "comment")
    private String comment;

    @Column(name = "dateCreated")
    private Date dateCreated;

    @Column(name = "dateUpdated")
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
