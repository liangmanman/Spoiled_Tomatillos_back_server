package dao;

import model.FavoriteMovie;

public interface IFavoriteMovieDao {
  void linkMovieWithUserId(Long userId, String apiMovieId);

  FavoriteMovie findFavoriteMovieWithId(Long userId, String apiMovieId);
}
