def getAuthToken() {
    return sh(script: '''
        curl -s 'https://kiet-le-dss-macbook-air.tail305ff.ts.net/api/apikeys/authenticate' -X POST \
        -H 'Content-Type:application/json' \
        --data '{"clientId":"YkirK3aKH0GEbTj1ON3xn9n2iMYEgDQe0GVy49f1wcc=","clientSecret":"3e6758a64bcdb1fc559ee4ea737894200b5ec19d6f70d2eb1c8d28d47aa611d8"}' \
        | tr -d '"'
    ''', returnStdout: true).trim()
}

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

                    echo "Project key: $PROJECT_KEY"
                    echo "Test execution key: $TEST_EXECUTION_KEY"

                    def response = sh(script: """
                        curl -H "Content-Type:text/xml" -H "Authorization: JWT ${token}" --data @reports/junit.xml "https://dev.api.agiletest.app/ds/test-executions/junit?projectKey=${PROJECT_KEY}&testExecutionKey=${TEST_EXECUTION_KEY}"
                    """, returnStdout: true).trim()
                    echo "API Response: ${response}"

    //                  if [ "$CI_JOB_STATUS" == "success" ]; then RESULT="success"; else RESULT="failed"; fi
    // - echo $RESULT
    // - export token=$(curl 'https://kiet-le-dss-macbook-air.tail305ff.ts.net/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' --data '{"clientId":"xaIkb2y6ASAKJ15sfJYLZFKsxO9uoWZ2mOtXNEepyTk=","clientSecret":"015522653a0f81a9a7670c6840fc6a7f7d8ba8c1cea63489814fe5d877d2ac88"}' | tr -d '"')
    // - echo $token
    // - curl -H "Content-Type:application/json" -H "Authorization:JWT $token" --data '{ "jobURL":'"$CI_JOB_STATUS"', "tool":"gitlab", "result":"'"$RESULT"'"  }' "https://kiet-le-dss-macbook-air.tail305ff.ts.net/ds/test-executions/${TEST_EXECUTION_KEY}/pipeline/history?projectKey=${PROJECT_KEY}"

    //                 echo "Build URL: ${env.BUILD_URL}"
                }
            }
        }


       
    }

    post {
        success {
            def token = getAuthToken()
            // def token = sh(script: '''
            //         curl 'https://kiet-le-dss-macbook-air.tail305ff.ts.net/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' --data '{"clientId":"YkirK3aKH0GEbTj1ON3xn9n2iMYEgDQe0GVy49f1wcc=","clientSecret":"3e6758a64bcdb1fc559ee4ea737894200b5ec19d6f70d2eb1c8d28d47aa611d8"}' | tr -d '"'
            //     ''', returnStdout: true).trim()
            echo "API Token when success: ${token}"
            echo 'This will run if the build is success.'
        }
        failure {
            // echo 'This will only run if the build fails.'
            //  def token = sh(script: '''
            //         curl 'https://kiet-le-dss-macbook-air.tail305ff.ts.net/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' --data '{"clientId":"YkirK3aKH0GEbTj1ON3xn9n2iMYEgDQe0GVy49f1wcc=","clientSecret":"3e6758a64bcdb1fc559ee4ea737894200b5ec19d6f70d2eb1c8d28d47aa611d8"}' | tr -d '"'
            //     ''', returnStdout: true).trim()
            // echo "API Token when failed: ${token}"
             echo 'This will run if the build is failed.'
        }
        unstable {
            echo 'This will run if the build is marked as unstable.'
        }
    }
}