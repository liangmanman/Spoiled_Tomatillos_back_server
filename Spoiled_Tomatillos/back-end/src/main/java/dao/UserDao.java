package dao;

import org.springframework.stereotype.Repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import model.User;

@Transactional
@Repository
public class UserDao implements IUserDao {

  @PersistenceContext
  private EntityManager entityManager;

  @SuppressWarnings("unchecked")
  @Override
  public List<User> findAllUsers() {
    String hql = "FROM User u ORDER BY u.username";
    return (List<User>) entityManager.createQuery(hql).getResultList();
  }

  @Override
  public User findCredentialsByUsername(String username) {
    String hql = "SELECT u FROM User u WHERE u.username = :username";
    Query query = entityManager.createQuery(hql);
    query.setParameter("username", username);

    return (User) query.getSingleResult();
  }

  @Override
  public User findUserByUsername(String username) {
    String hql = "SELECT u FROM User u WHERE u.username = :username";
    Query query = entityManager.createQuery(hql);
    query.setParameter("username", username);

    return (User) query.getSingleResult();
  }

  @Override
  public void createUser(User user) {
    entityManager.persist(user);
  }
}
