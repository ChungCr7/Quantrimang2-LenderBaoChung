pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "chungcr7"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/coffee-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/coffee-frontend"
        API_BASE = "http://16.176.45.36:9000"
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                    sh "docker build -t ${BACKEND_IMAGE}:latest ./baochung_st22a"

                    sh "docker build --build-arg VITE_API_BASE=${API_BASE} -t ${FRONTEND_IMAGE}:latest ./coffee-shop-master"

                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"

                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        // 🚀 AUTO DEPLOY TO EC2 (KHÔNG CẦN PLUGIN)
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh', keyFileVariable: 'SSH_KEY')]) {

                    sh '''
                    echo "===== Deploy to EC2 ====="

                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ec2-user@16.176.45.36 << 'EOF'
                    cd ~/coffee
                    docker compose pull
                    docker compose down
                    docker compose up -d
                    exit
                    EOF
                    '''
                }
            }
        }
    }
}
pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "chungcr7"
        BACKEND_IMAGE = "${DOCKERHUB_USER}/coffee-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/coffee-frontend"
        API_BASE = "http://16.176.45.36:9000"
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                    sh "docker build -t ${BACKEND_IMAGE}:latest ./baochung_st22a"

                    sh "docker build --build-arg VITE_API_BASE=${API_BASE} -t ${FRONTEND_IMAGE}:latest ./coffee-shop-master"

                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"

                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        // 🚀 AUTO DEPLOY TO EC2 (KHÔNG CẦN PLUGIN)
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh', keyFileVariable: 'SSH_KEY')]) {

                    sh '''
                    echo "===== Deploy to EC2 ====="

                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ec2-user@16.176.45.36 << 'EOF'
                    cd ~/coffee
                    docker compose pull
                    docker compose down
                    docker compose up -d
                    exit
                    EOF
                    '''
                }
            }
        }
    }
}
