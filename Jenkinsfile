pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "chungcr7"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/coffee-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/coffee-frontend"

        // API backend mới trên EC2-WEB
        API_BASE = "http://16.176.194.51:9000"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ChungCr7/Quantrimang2-LenderBaoChung.git',
                    credentialsId: 'github_pat'
            }
        }

        stage('Build Backend') {
            steps {
                dir('baochung_st22a') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                    // Build backend
                    sh "docker build -t ${BACKEND_IMAGE}:latest ./baochung_st22a"

                    // Build frontend (truyền API mới)
                    sh "docker build --build-arg VITE_API_BASE=${API_BASE} -t ${FRONTEND_IMAGE}:latest ./coffee-shop-master"

                    // Login DockerHub
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"

                    // Push images
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }
    }
}
