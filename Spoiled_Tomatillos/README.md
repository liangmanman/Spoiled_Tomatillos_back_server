## Build for Production
```sh
npm run-script build --prefix front-end
npm run-script deploy --prefix front-end
cd back-end && ./mvnw spring-boot:run
```