pipeline {
    agent any

    environment {
        APP_NAME         = 'orca-sanskritbot'
        IMAGE_TAG        = "${env.BUILD_NUMBER}"
        // Optional Docker Hub / registry configuration
        // REGISTRY_CREDS   = 'dockerhub-credentials'
        // REGISTRY_USER    = 'your-dockerhub-username'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                echo 'Verifying Windows workspace and Docker...'
                bat '''
                    @echo off
                    echo Build Number: %BUILD_NUMBER%
                    echo Branch: %BRANCH_NAME%
                    docker --version
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${APP_NAME}:${IMAGE_TAG}"
                bat """
                    docker build -t ${APP_NAME}:${IMAGE_TAG} -t ${APP_NAME}:latest .
                """
            }
        }

        stage('Smoke Test & Health Check') {
            steps {
                echo 'Spinning up container for smoke testing on Windows...'
                bat """
                    @echo off
                    :: Remove any lingering test container
                    docker rm -f ${APP_NAME}-smoke-test >nul 2>&1 || rem

                    :: Start container on temporary test port 8089
                    docker run -d --name ${APP_NAME}-smoke-test -p 8089:80 ${APP_NAME}:${IMAGE_TAG}

                    :: Wait for container initialization (5 seconds)
                    timeout /t 5 /nobreak >nul

                    :: Smoke test HTTP endpoint
                    curl -I http://localhost:8089
                    if errorlevel 1 (
                        echo [ERROR] Smoke test failed!
                        docker logs ${APP_NAME}-smoke-test
                        docker rm -f ${APP_NAME}-smoke-test >nul 2>&1
                        exit /b 1
                    )

                    echo [SUCCESS] Smoke test passed!
                    docker rm -f ${APP_NAME}-smoke-test >nul 2>&1
                """
            }
        }

        /*
        // Optional: Push to registry if credentials are configured
        stage('Push Image to Registry') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: env.REGISTRY_CREDS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                        @echo off
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push ${REGISTRY_USER}/${APP_NAME}:${IMAGE_TAG}
                        docker push ${REGISTRY_USER}/${APP_NAME}:latest
                    """
                }
            }
        }
        */
    }

    post {
        always {
            echo 'Pipeline finished. Cleaning workspace...'
            cleanWs()
        }
        success {
            echo "Pipeline succeeded for build #${env.BUILD_NUMBER}!"
        }
        failure {
            echo "Pipeline failed for build #${env.BUILD_NUMBER}. Please check logs above."
        }
    }
}
