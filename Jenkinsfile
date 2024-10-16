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
                        curl 'https://dev.agiletest.atlas.devsamurai.com/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' --data '{"clientId":"YkirK3aKH0GEbTj1ON3xn9n2iMYEgDQe0GVy49f1wcc=","clientSecret":"3e6758a64bcdb1fc559ee4ea737894200b5ec19d6f70d2eb1c8d28d47aa611d8"}' | tr -d '"'
                    ''', returnStdout: true).trim()
                    echo "API Token: ${token}"

                    def response = sh(script: '''
                        curl -H "Content-Type:text/xml" -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIzZWE1Y2I5Ny05MDkxLTM1N2YtYjE4Mi1mMmYzMTU2MzhkM2IiLCJpYXQiOjE3MjkwNTk2NzgsImV4cCI6MTcyOTE0NjA3OCwicXNoIjoiY29udGV4dC1xc2giLCJzdWIiOiI2M2ExM2MwNDQ4YjM2N2Q3OGExNDhiMjIiLCJjb250ZXh0Ijp7fX0.UveA7xqaqUpxs1BfwSFFmvgDNIJe74J0e9o_BNvVr_U" --data @reports/junit.xml "https://dev.api.agiletest.app/ds/test-executions/junit?projectKey=KTN1"
                    ''', returnStdout: true).trim()
                    echo "API Response: ${response}"

                    echo "Build URL: ${env.BUILD_URL}"
                }
            }
        }
    }
}