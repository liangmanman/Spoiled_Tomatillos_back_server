pipeline {
  agent {
    docker {
      image 'maven:3-alpine'
      args '-v /root/.m2:/root/.m2'
    }
  }
  stages {
    stage ( 'Build' ) {
      steps {
        echo "Building"
        sh 'mvn -f Spoiled_Tomatillos/back-end/pom.xml clean install -DskipTests'
      }
    }
    stage ( 'Test' ){
      steps {
        echo "Testing"
        sh 'mvn -f Spoiled_Tomatillos/back-end/pom.xml test'
      }
    }
    stage ( 'Deploy' ) {
      steps {
        echo "Deploy"
      }
    }
  }
}
