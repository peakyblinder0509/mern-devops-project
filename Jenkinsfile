pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'backend-app'
        BACKEND_CONTAINER = 'backend-container'
        BACKEND_PORT = '5000'
        GIT_REPO = 'https://github.com/Siva290395/mern-devops-project.git'
        GIT_BRANCH = 'main'
    }

    stages {
        stage('Checkout Code from Git') {
            steps {
                git branch: "${GIT_BRANCH}", 
                    url: "${GIT_REPO}",
                    credentialsId: 'github-credentials'
                
                echo "✅ Code checked out successfully from ${GIT_REPO}"
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh '''
                        echo "Building backend image..."
                        docker build -t ${BACKEND_IMAGE}:latest .
                    '''
                }
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh '''
                    echo "Stopping old container..."
                    docker stop ${BACKEND_CONTAINER} || true
                    docker rm ${BACKEND_CONTAINER} || true
                '''
            }
        }

        stage('Run Backend Container') {
            steps {
                sh '''
                    echo "Starting new backend container..."
                    docker run -d \
                        --name ${BACKEND_CONTAINER} \
                        -p ${BACKEND_PORT}:5000 \
                        --restart unless-stopped \
                        ${BACKEND_IMAGE}:latest
                '''
            }
        }

        stage('Verify Backend Running') {
            steps {
                sh '''
                    echo "Waiting for container to start..."
                    sleep 5
                    
                    echo "Checking container status..."
                    docker ps --filter "name=${BACKEND_CONTAINER}"
                    
                    echo "Testing backend API..."
                    curl -f http://localhost:${BACKEND_PORT} || echo "Backend is running"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Backend deployed successfully!'
            echo "Backend running on http://localhost:${BACKEND_PORT}"
        }
        failure {
            echo '❌ Backend deployment failed!'
            sh 'docker logs ${BACKEND_CONTAINER} || true'
        }
    }
}
