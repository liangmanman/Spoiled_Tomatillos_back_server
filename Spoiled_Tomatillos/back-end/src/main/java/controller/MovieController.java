package controller;

import java.util.HashMap;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;
import org.springframework.http.*;
import java.util.List;

import dao.IMovieDao;
import model.Movie;
import service.MovieService;
import service.UserService;


@RestController
@RequestMapping("/api/movies")
public class MovieController {

  @Autowired
  private MovieService movieService;

  @RequestMapping("/list")
  public List<Movie> findAllMovies() {
    return movieService.findAllMovies();
  }

//  @RequestMapping("/api/movies/insert")
//  public Movie insertMovie() {
//    System.out.print("test insert by nothing\n");
//    Movie mov = new Movie();
//    return mov;
//  }

  @RequestMapping(value = "/insert", method = RequestMethod.POST)
  public @ResponseBody ResponseEntity<String> insertMovie(@RequestBody JSONObject request_obj) {

    Long userId = new Long((Integer) request_obj.get("userId"));

    HashMap<String, String> movie = (HashMap)request_obj.get("movie");

    String apiMovieId = movie.get("imdbID");
    String briefDescription = movie.get("Plot");
    String title = movie.get("Title");
    String releaseYear = movie.get("Year");
    String posterImgPath = movie.get("Poster");

    movieService.insertMovieIfNotExist(apiMovieId, briefDescription, title, releaseYear, posterImgPath);
//    movieService.linkMovieWithUserId(userId, apiMovieId);;

    return new ResponseEntity<>("Response from POST method", HttpStatus.OK);
  }

//  public Movie insertMovie(@RequestBody Movie movie) {
//    System.out.print("test insert by object\n");
//    Movie mov = new Movie();
//    mov.setApiMovieId("testId");
//    mov.setTitle("title");
//    mov.setReleaseYear(1996L);
//    System.out.print(mov.getTitle());
//    movieDao.insertMovie(mov);
//
//    return mov;
//  }

//  @RequestMapping("/api/movies/insert")
//  public Movie insertMovie(@RequestBody JSONObject) {
//    System.out.print("test insert by something\n");
//    Movie mov = new Movie();
//    mov.setApiMovieId(apiMovieKey);
//    mov.setTitle(title);
//    mov.setReleaseYear(1996L);
//    System.out.print(mov.getTitle());
//    movieDao.insertMovie(mov);
//
//    return mov;
//  }
}
