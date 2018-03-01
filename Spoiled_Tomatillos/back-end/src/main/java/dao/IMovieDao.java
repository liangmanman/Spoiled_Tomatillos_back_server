package dao;

import java.util.List;

import model.Movie;

public interface IMovieDao {
  List<Movie> findAllMovies();

  void insertMovie(Movie movie);
}
