package init.controllers.movies;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Movie representing a movie class with name, id, description
 * TODO: add more on it
 */
@Entity(name="movies")
public class MovieObject {

  /**
   * Read name from a move
   * @return name in String
   */
  public String getName() {
    return name;
  }

  /**
   * Update name of a movie
   * @param name in String
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Create a movieObject within an initialized name
   */
  public MovieObject(String name) {
    this.name = name;
  }

  /**
   * Read description from a move
   * @return description in String
   */
  public String getDescription() {
    return description;
  }

  /**
   * Update description of a movie
   * @param description in String
   */
  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * Create a movie Object function
   */
  public MovieObject() {

  }

  private String name, description;

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int id;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }
}
