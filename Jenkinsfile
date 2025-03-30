pipeline {
     agent any
    environment {
        NODE_VERSION = '18.20.5' // 指定 Node.js 版本
    }
    tools {
        nodejs NODE_VERSION // 使用 Jenkins 中配置的 Node.js 工具
    }
    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    sh "node -v"
                    sh "npm -v"
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'test'
                }
            }
            steps {
                echo 'Installing dependencies for branch...'
                sh '''
                    rm -rf node_modules
                    if [ -f .npmrc ]; then
                        echo "Using .npmrc file for npm configuration"
                    else
                        echo "No .npmrc file found, using default npm configuration"
                        npm config set registry https://registry.npm.org
                    fi
                    npm install
                '''
           
            }
        }
        stage('Build') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'test'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo 'Building for production...'
                        sh 'npm run build:prod'
                    } else if (env.BRANCH_NAME == 'dev') {
                        echo 'Building for development...'
                        sh 'npm run build:dev'
                    } else if (env.BRANCH_NAME == 'test') {
                        echo 'Building for test branch...'
                        sh 'npm run build:test'
                    } else {
                        echo "Building for branch: ${env.BRANCH_NAME}"
                    }

                    if (fileExists('dist')) {
                        echo 'dist directory exists, writing version.txt...'
                    } else {
                        echo 'dist directory does not exist, creating it...'
                        sh 'mkdir -p dist'
                    }
                    sh '''
                        echo "Build completed on $(date '+%Y-%m-%d %H:%M:%S')" > dist/version.txt
                    '''
                    echo "Build info file created in dist directory."
                }
            }
        }
        stage('Deploy') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'test'
                }
            }
            steps {
                script {
                     if (env.BRANCH_NAME == 'master') {
                        echo 'Deploying to production server...'
                        sh "scp -r dist/* /workspace/nginx_home/html/web/tsvue/master"
                    } else if (env.BRANCH_NAME == 'dev') {
                        echo 'Deploying to development server...'
                        sh "scp -r dist/* /workspace/nginx_home/html/web/tsvue/dev"
                    } else if (env.BRANCH_NAME == 'test') {
                        echo 'Deploying to test branch server...'
                        sh "scp -r dist/* /workspace/nginx_home/html/web/tsvue/test"
                    } else {
                         echo "Skipping deployment for branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}