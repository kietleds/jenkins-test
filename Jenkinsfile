pipeline {
    agent any

    environment {
        CLIENT_ID = 'xaIkb2y6ASAKJ15sfJYLZFKsxO9uoWZ2mOtXNEepyTk='
        CLIENT_SECRET = '3dffae770579a57b2f8a98b65f6f76e787ffa39010aa0661438bd39eba0eb972'
    }

    parameters {
        string defaultValue: "TEST", description: 'Project key', name: 'PROJECT_KEY'
        string defaultValue: "TEST-1", description: 'Test execution key', name: 'TEST_EXECUTION_KEY'
        string defaultValue: "TEST-2", description: 'custom', name: 'CUSTOM_1'
    }

    stages {
        stage('API Call') {
            steps {
                script {

                    def token = getApiToken()
                    echo "API Token: ${token}"

                    def response = sh(script: """
                        curl -H "Content-Type:text/xml" -H "Authorization: JWT $token" --data @reports/junit.xml "https://kietleds.tail305ff.ts.net/parser/ds/test-executions/junit?projectKey=${params.PROJECT_KEY}&testExecutionKey=${params.TEST_EXECUTION_KEY}"
                    """, returnStdout: true).trim()
                    echo "API Response: ${response}"
                }
            }
        }


       
    }

    post {
        success {
            script {
                echo 'This will run if the build is success.'

                def token = getApiToken()
                sendBuildStatus(token, "success")
            }
        }
        failure {
            script {
                echo 'This will run if the build is failed.'

                def token = getApiToken()
                sendBuildStatus(token, "failed")
            }
        }
    }
}


def getApiToken() {
    return sh(script: """
        curl -s 'https://kietleds.tail305ff.ts.net/api/apikeys/authenticate' -X POST -H 'Content-Type:application/json' \
        --data '{"clientId":"'"$env.CLIENT_ID"'", "clientSecret":"'"$env.CLIENT_SECRET"'"}' \
        | tr -d '"'
    """, returnStdout: true).trim()
}

def sendBuildStatus(token, status) {
    def response = sh(script: """
        curl -s -H "Content-Type:application/json" -H "Authorization:JWT $token" \
        --data '{ "buildURL": "'"$env.BUILD_URL"'", "tool":"jenkins", "result":"${status}" }' \
        "https://kietleds.tail305ff.ts.net/ds/test-executions/${TEST_EXECUTION_KEY}/pipeline/history?projectKey=${PROJECT_KEY}"
    """, returnStdout: true).trim()

    echo "API Response for ${status} build: ${response}"
}