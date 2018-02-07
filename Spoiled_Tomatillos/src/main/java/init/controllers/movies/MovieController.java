package init.controllers.movies;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MovieController {

  @RequestMapping("/api/test")
  public String sayHello() {
    return "Hello Green Monster!";
  }

  @Autowired
  MovieRepository movieRepository;
  @RequestMapping("/api/movies")
  public List<MovieObject> movieList() {
    List<MovieObject> movies = (List<MovieObject>)movieRepository.findAll();
    return movies;
  }

  @RequestMapping("/api/movies/insert/{msg}")
  public MovieObject insertMovie(@PathVariable("msg") String name) {
    MovieObject obj = new MovieObject(name);
    movieRepository.save(obj);
    return obj;
  }
}
