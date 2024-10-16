pipeline {
    agent any
    stages {
        stage('Export features from Xray'){
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'a3285253-a867-4ea7-a843-da349fd36490', url: 'ssh://git@localhost/home/git/repos/automation-samples.git']]])
                step([$class: 'XrayExportBuilder', filePath: 'cucumber_xray_tests/features', filter: '11400', serverInstance: '552d0cb6-6f8d-48ba-bbad-50e94f39b722'])
            }
        }
         
        stage('Test'){
            steps{
                sh "cd cucumber_xray_tests && cucumber -x -f json -o data.json"
            }
        }
         
        stage('Import results to Xray') {
            steps {
                step([$class: 'XrayImportBuilder', endpointName: '/cucumber', importFilePath: 'cucumber_xray_tests/data.json', serverInstance: '552d0cb6-6f8d-48ba-bbad-50e94f39b722'])
            }
        }
    }
}