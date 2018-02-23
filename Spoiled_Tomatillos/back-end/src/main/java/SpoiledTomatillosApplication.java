import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication(scanBasePackages = {"controller", "service"})
@EnableJpaRepositories(basePackages = {"model"})
@EntityScan("model")
public class SpoiledTomatillosApplication  extends SpringBootServletInitializer{

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
					.allowedOrigins("*");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(SpoiledTomatillosApplication.class, args);
	}
}
