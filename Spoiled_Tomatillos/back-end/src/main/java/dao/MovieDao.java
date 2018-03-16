package dao;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import model.Movie;

@Transactional
@Repository
public class MovieDao implements IMovieDao {

  @PersistenceContext
  private EntityManager entityManager;

  @SuppressWarnings("unchecked")
  @Override
  public List<Movie> findAllMovies() {
    String hql = "FROM Movie m ORDER BY m.title";
    return (List<Movie>) entityManager.createQuery(hql).getResultList();
  }

  @Override
  public Movie findMovieByApiMovieId(String apiMovieId) {
    try {
      String hql = "FROM Movie m WHERE m.apiMovieId = :api_movieid";
      Query query = entityManager.createQuery(hql);
      query.setParameter("api_movieid", apiMovieId);
      return (Movie) query.getSingleResult();
    } catch (NoResultException e) {
      return null;
    }

  }

  @Override
  public void insertMovie(Movie movie) {
    entityManager.persist(movie);
  }
}
