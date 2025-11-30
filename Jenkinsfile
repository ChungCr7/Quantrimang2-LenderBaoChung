pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "chungcr7"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/coffee-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/coffee-frontend"
        API_BASE = "https://nhom2qtmapi.duckdns.org"
        EC2_IP = "16.176.45.36"
    }

    stages {

        /* ===============================
           1. CHECKOUT SOURCE CODE
        ================================ */
        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ChungCr7/Quantrimang2-LenderBaoChung.git',
                    credentialsId: 'github_pat'
            }
        }

        /* ===============================
           2. BUILD BACKEND (SPRING BOOT)
        ================================ */
        stage('Build Backend') {
            steps {
                dir('baochung_st22a') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        /* ===============================
           3. DOCKER BUILD + PUSH
        ================================ */
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

        /* ===============================
           4. UPLOAD COMPOSE + CADDYFILE
        ================================ */
        stage('Upload Config Files to EC2') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh """
                    echo ===== Upload config files =====
                    
                    # Upload docker-compose.yml
                    scp -o StrictHostKeyChecking=no -i $SSH_KEY docker-compose.yml \
                        $SSH_USER@${EC2_IP}:/home/ec2-user/coffee/docker-compose.yml
                    
                    # Upload Caddyfile
                    scp -o StrictHostKeyChecking=no -i $SSH_KEY Caddyfile \
                        $SSH_USER@${EC2_IP}:/home/ec2-user/coffee/Caddyfile
                    """
                }
            }
        }

        /* ===============================
           5. DEPLOY TO EC2
        ================================ */
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
                    echo ===== Deploying on EC2 =====

                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SSH_USER@${EC2_IP} '
                        cd ~/coffee

                        echo "Killing ports 80 & 443 (Caddy)..."
                        sudo fuser -k 80/tcp || true
                        sudo fuser -k 443/tcp || true

                        echo "Stopping old containers..."
                        docker compose down || true

                        echo "Removing old Jenkins (avoid conflict)..."
                        docker rm -f jenkins || true

                        echo "Pulling newest images..."
                        docker compose pull

                        echo "Starting services..."
                        docker compose up -d

                        echo "Deployment DONE!"
                    '
                    """
                }
            }
        }
    }
}
