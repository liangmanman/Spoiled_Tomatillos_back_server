echo "----- Installing All Dependencies ------"
cd back-end && ./mvnw clean install
cd ..
cd front-end && npm install
echo "----- FINISHED Installing Dependencies"