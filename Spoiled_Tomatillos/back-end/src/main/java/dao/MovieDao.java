package dao;

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
  public void insertMovie(Movie movie) {
    entityManager.persist(movie);
  }
}
