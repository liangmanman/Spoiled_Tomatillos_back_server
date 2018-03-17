package dao;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import model.FavoriteMovie;
import model.Movie;
import org.springframework.stereotype.Repository;


@Transactional
@Repository
public class FavoriteMovieDao implements IFavoriteMovieDao {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public void linkMovieWithUserId(Long userId, String apiMovieId) {
    FavoriteMovie favoriteMovie = new FavoriteMovie();
    favoriteMovie.setUserId(userId);
    favoriteMovie.setApiMovieId(apiMovieId);
    entityManager.persist(favoriteMovie);
  }

  @Override
  public FavoriteMovie findFavoriteMovieWithId(Long userId, String apiMovieId) {
    try {
      String hql = "FROM FavoriteMovie fm"
          + " WHERE fm.apiMovieId = :api_movieid AND fm.userId = :user_id";
      Query query = entityManager.createQuery(hql);
      query.setParameter("api_movieid", apiMovieId);
      query.setParameter("user_id", userId);
      return (FavoriteMovie) query.getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }

}
