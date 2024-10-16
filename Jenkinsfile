pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }

        stage('Hello World') {
            steps {
                echo 'Hello, World!'
            }
        }

        stage('API Call') {
            steps {
                script {
                    def token = sh(script: '''
                        curl 'https://dev.agiletest.atlas.devsamurai.com/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' --data '{"clientId":"xaIkb2y6ASAKJ15sfJYLZFKsxO9uoWZ2mOtXNEepyTk=","clientSecret":"015522653a0f81a9a7670c6840fc6a7f7d8ba8c1cea63489814fe5d877d2ac88"}' | tr -d '"'
                    ''', returnStdout: true).trim()
                    echo "API Token: ${token}"

                    def response = sh(script: '''
                        curl -H "Content-Type:text/xml" -H "Authorization:JWT $token" --data @reports/junit.xml "https://dev.api.agiletest.app/ds/test-executions/junit?projectKey=KTN1"
                    ''', returnStdout: true).trim()
                    echo "API Response: ${response}"
                }
            }
        }
    }
}