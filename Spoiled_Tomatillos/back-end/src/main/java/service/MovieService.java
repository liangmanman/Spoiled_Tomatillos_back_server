package service;

import dao.IFavoriteMovieDao;
import dao.IMovieDao;
import dao.MovieDao;
import java.util.List;
import model.FavoriteMovie;
import org.springframework.stereotype.Service;
import model.Movie;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class MovieService {

  @Autowired
  private IMovieDao movieDao;

  @Autowired
  private IFavoriteMovieDao favoriteMovieDao;

  public MovieService() {

  }

  public List<Movie> findAllMovies() {
    return movieDao.findAllMovies();
  }

  public Movie insertMovieIfNotExist(String apiMovieId, String briefDescription,
      String title, String releaseYear, String posterImgPath) {

      Movie movie = movieDao.findMovieByApiMovieId(apiMovieId);
      if (movie != null) {
        return movie;
      } else {
        return insertMovie(apiMovieId, briefDescription, title, releaseYear, posterImgPath);
      }
  }

  private Movie insertMovie(String apiMovieId, String briefDescription,
      String title, String releaseYear, String posterImgPath) {
    Movie movieToCreate = new Movie();
    movieToCreate.setApiMovieId(apiMovieId);
    movieToCreate.setBriefDescription(briefDescription);
    movieToCreate.setPosterImgPath(posterImgPath);
    movieToCreate.setReleaseYear(releaseYear);
    movieToCreate.setTitle(title);
    movieDao.insertMovie(movieToCreate);
    return movieToCreate;
  }

  public void linkMovieWithUserId(Long userId, String apiMovieId) {
    FavoriteMovie favoriteMovie = favoriteMovieDao.findFavoriteMovieWithId(userId, apiMovieId);
    if (favoriteMovie == null) {
      favoriteMovieDao.linkMovieWithUserId(userId, apiMovieId);
    }
  }
}
