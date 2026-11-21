pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
    }

    // Poll GitHub periodically. No public Jenkins URL/webhook needed.
    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Checkout from Git') {
            steps {
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
                bat 'docker info'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Containers') {
            steps {
                bat 'docker compose up -d --remove-orphans --wait'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'docker compose ps'
                bat 'curl.exe --fail --silent --show-error http://127.0.0.1:3001/health'
                bat 'curl.exe --fail --silent --show-error http://127.0.0.1:3000/'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All three services are deployed and healthy!'
        }
        failure {
            echo 'FAILURE: Check Console Output and Docker Desktop.'
        }
    }
}
