package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import dao.IMovieDao;
import model.Movie;


@RestController
public class MovieController {

  @Autowired
  private IMovieDao movieDao;

  @RequestMapping("/api/movies")
  public List<Movie> findAllMovies() {
    return movieDao.findAllMovies();
  }

  @RequestMapping("/api/movies/insert/{apiMovieKey}")
  public Movie insertMovie(@PathVariable("apiMovieKey") String apiMovieKey) {
    Movie mov = new Movie();
    mov.setApiMovieId(apiMovieKey);
    mov.setTitle("This is a test");
    mov.setReleaseYear(1996L);
    movieDao.insertMovie(mov);

    return mov;
  }
}
