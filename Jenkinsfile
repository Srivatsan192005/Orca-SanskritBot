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
                echo 'Verifying workspace...'
                sh '''
                    echo "Build Number: ${BUILD_NUMBER}"
                    echo "Branch: ${BRANCH_NAME}"
                    docker --version || true
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${APP_NAME}:${IMAGE_TAG}"
                sh """
                    docker build -t ${APP_NAME}:${IMAGE_TAG} -t ${APP_NAME}:latest .
                """
            }
        }

        stage('Smoke Test & Health Check') {
            steps {
                echo 'Spinning up container for smoke testing...'
                sh """
                    # Remove any leftover test container
                    docker rm -f ${APP_NAME}-smoke-test 2>/dev/null || true

                    # Start container on temporary test port 8089
                    docker run -d --name ${APP_NAME}-smoke-test -p 8089:80 ${APP_NAME}:${IMAGE_TAG}

                    # Wait for container startup
                    sleep 5

                    # Smoke test HTTP endpoint
                    curl -I http://localhost:8089 || (docker logs ${APP_NAME}-smoke-test && docker rm -f ${APP_NAME}-smoke-test && exit 1)

                    # Teardown smoke test container
                    docker rm -f ${APP_NAME}-smoke-test
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
                script {
                    docker.withRegistry('', env.REGISTRY_CREDS) {
                        def img = docker.image("${REGISTRY_USER}/${APP_NAME}:${IMAGE_TAG}")
                        img.push()
                        img.push('latest')
                    }
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
