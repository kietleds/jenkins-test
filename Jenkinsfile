pipeline {
    agent any

    environment {
        CLIENT_ID = 'xaIkb2y6ASAKJ15sfJYLZFKsxO9uoWZ2mOtXNEepyTk='
        CLIENT_SECRET = 'c5427046f7582145bf01b5b472365f3e960360e6bf0f1581b1e724b31362559d'
    }

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
                        curl 'https://kietleds.tail305ff.ts.net/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' --data '{"clientId":"xaIkb2y6ASAKJ15sfJYLZFKsxO9uoWZ2mOtXNEepyTk=","clientSecret":"c5427046f7582145bf01b5b472365f3e960360e6bf0f1581b1e724b31362559d"}' | tr -d '"'
                    ''', returnStdout: true).trim()
                    echo "API Token: ${token}"

                    // echo "Project key: $PROJECT_KEY"
                    // echo "Test execution key: $TEST_EXECUTION_KEY"

                    // def response = sh(script: """
                    //     curl -H "Content-Type:text/xml" -H "Authorization: JWT ${token}" --data @reports/junit.xml "https://allowing-wallaby-game.ngrok-free.app/ds/test-executions/junit?projectKey=${PROJECT_KEY}&testExecutionKey=${TEST_EXECUTION_KEY}"
                    // """, returnStdout: true).trim()
                    // echo "API Response: ${response}"

                    def response = sh(script: """
                        curl -H "Content-Type:text/xml" -H "Authorization: JWT ${token}" --data @reports/junit.xml "https://kietleds.tail305ff.ts.net/parser/ds/test-executions/junit?projectKey=XGJN&testExecutionKey=XGJN-955"
                    """, returnStdout: true).trim()
                    echo "API Response: ${response}"
                }
            }
        }


       
    }

    // post {
    //     success {
    //         script {
    //             echo 'This will run if the build is success.'

    //             def token = getApiToken()
    //             sendBuildStatus(token, "success")
    //         }
    //     }
    //     failure {
    //         script {
    //             echo 'This will run if the build is failed.'

    //             def token = getApiToken()
    //             sendBuildStatus(token, "failed")
    //         }
    //     }
    // }
}


// def getApiToken() {
//     return sh(script: """
//         curl -s 'https://kiet-le-dss-macbook-air.tail305ff.ts.net/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' \
//         --data '{"clientId":"'"$env.CLIENT_ID"'", "clientSecret":"'"$env.CLIENT_SECRET"'"}' \
//         | tr -d '"'
//     """, returnStdout: true).trim()
// }

// def sendBuildStatus(token, status) {
//     def response = sh(script: """
//         curl -s -H "Content-Type:application/json" -H "Authorization:JWT $token" \
//         --data '{ "buildURL": "'"$env.BUILD_URL"'", "tool":"jenkins", "result":"${status}" }' \
//         "https://kiet-le-dss-macbook-air.tail305ff.ts.net/ds/test-executions/${TEST_EXECUTION_KEY}/pipeline/history?projectKey=${PROJECT_KEY}"
//     """, returnStdout: true).trim()

//     echo "API Response for ${status} build: ${response}"
// }