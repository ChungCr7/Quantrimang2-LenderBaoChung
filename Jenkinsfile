pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "chungcr7"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/coffee-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/coffee-frontend"
        API_BASE = "https://nhom2qtmapi.duckdns.org"
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
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh "docker build -t ${BACKEND_IMAGE}:latest ./baochung_st22a"

                    sh "docker build --build-arg VITE_API_BASE=${API_BASE} \
                        -t ${FRONTEND_IMAGE}:latest ./coffee-shop-master"

                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"

                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Upload Caddyfile to EC2') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh """
                    scp -o StrictHostKeyChecking=no -i $SSH_KEY Caddyfile \
                        $SSH_USER@16.176.45.36:/home/ec2-user/coffee/Caddyfile
                    """
                }
            }
        }

        stage('Upload Docker Compose to EC2') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh """
                    scp -o StrictHostKeyChecking=no -i $SSH_KEY docker-compose.yml \
                        $SSH_USER@16.176.45.36:/home/ec2-user/coffee/docker-compose.yml
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SSH_USER@16.176.45.36 '
                        cd ~/coffee

                        sudo fuser -k 80/tcp || true
                        sudo fuser -k 443/tcp || true

                        docker compose pull
                        docker compose down
                        docker compose up -d

                        # 🔥 Caddy reload chính xác 100%
                        docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile || true
                    '
                    """
                }
            }
        }
    }
}
