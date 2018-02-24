echo "----- Building and Deploying Front End! -----"
npm run-script build --prefix front-end
npm run-script deploy --prefix front-end
echo "----- Running Spring Boot ------"
cd back-end && ./mvnw spring-boot:run
cd ..
