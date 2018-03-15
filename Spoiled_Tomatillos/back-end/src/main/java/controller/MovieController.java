package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;
import org.springframework.http.*;
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

//  @RequestMapping("/api/movies/insert")
//  public Movie insertMovie() {
//    System.out.print("test insert by nothing\n");
//    Movie mov = new Movie();
//    return mov;
//  }

  @RequestMapping(value = "/api/movies/insert/", method = RequestMethod.POST)
  public @ResponseBody ResponseEntity<String> insertMovie(@RequestParam(value="Title", required=false) String Title) {
    System.out.print("test insert by object\n");
    System.out.print("Title is: " + Title+'\n');

    return new ResponseEntity<String>("Response from POST method", HttpStatus.OK);
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

  @RequestMapping("/api/movies/insert/{apiMovieKey}&{title}")
  public Movie insertMovie(@PathVariable("apiMovieKey") String apiMovieKey, @PathVariable("title") String title) {
    System.out.print("test insert by something\n");
    Movie mov = new Movie();
    mov.setApiMovieId(apiMovieKey);
    mov.setTitle(title);
    mov.setReleaseYear(1996L);
    System.out.print(mov.getTitle());
    movieDao.insertMovie(mov);

    return mov;
  }
}
