package model;

/**
 * Created by Sebastian on 2/13/2018.
 */

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

/**
 * Movie represents the cached information that represents a movie. A movie is cached and stored
 * in the database when a user adds it as a favorite or reviews it.
 */
@Entity
@Table(name="Movie")
public class Movie implements Serializable {

  @Id
  @Column(name = "ApiMovieID")
  private String apiMovieId;

  @Column(name = "Title")
  private String title;

  @Column(name = "PosterImgPath")
  private String posterImgPath;

  @Column(name = "ReleaseYear")
  private Long releaseYear;

  @Column(name = "BriefDescription")
  private String briefDescription;

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

  /**
   * Create an empty movie
   */
  public Movie() {}

  /**
   * Create a movie with an initialized api movie id
   */
  public Movie(String apiMovieId) {
    this.apiMovieId = apiMovieId;
  }

  /**
   * Create a movie with an initialized api movie id, title, release year, and description
   */
  public Movie(String apiMovieId, String title, Long releaseYear, String briefDescription) {
    this.apiMovieId = apiMovieId;
    this.title = title;
    this.releaseYear = releaseYear;
    this.briefDescription = briefDescription;
  }

  /**
   * Gets the OMDb api url for the movie
   * @return OMDb api url as a String
   */
  public String getApiMovieId() {
    return apiMovieId;
  }

  /**
   * Sets the OMDb api url for the movie
   * @param apiMovieId the api url of the movie
   */
  public void setApiMovieId(String apiMovieId) {
    this.apiMovieId = apiMovieId;
  }

  /**
   * Gets the title of the movie
   * @return title of movie as a String
   */
  public String getTitle() {
    return title;
  }

  /**
   * Sets the title of the move
   * @param title title of the movie
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * Gets the path that the movie poster image is stored in the system
   * @return the path of the movie poster image
   */
  public String getPosterImgPath() {
    return posterImgPath;
  }

  /**
   * Sets the path that the movie poster image is stored in the system
   * @param posterImgPath path of the movie poster image on file system
   */
  public void setPosterImgPath(String posterImgPath) {
    this.posterImgPath = posterImgPath;
  }

  /**
   * Gets the year that the movie was released
   * @return release year of the movie as a Long
   */
  public Long getReleaseYear() {
    return releaseYear;
  }

  /**
   * Sets the year that the movie was released
   * @param releaseYear release year of the movie
   */
  public void setReleaseYear(Long releaseYear) {
    this.releaseYear = releaseYear;
  }

  /**
   * Gets the condensed, brief description of the movie
   * @return brief description of the movie
   */
  public String getBriefDescription() {
    return briefDescription;
  }

  /**
   * Sets the brief description of the movie
   * @param briefDescription the brief description
   */
  public void setBriefDescription(String briefDescription) {
    this.briefDescription = briefDescription;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public Date getDateUpdated() {
    return lastUpdated;
  }

  public void setDateUpdated(Date dateUpdated) {
    this.lastUpdated = dateUpdated;
  }
}

