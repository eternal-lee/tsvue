pipeline {
     agent any
    environment {
        NODE_VERSION = '18.20.5' // 指定 Node.js 版本
    }
    // tools {
    //     nodejs NODE_VERSION // 使用 Jenkins 中配置的 Node.js 工具
    // }
    stages {
        stage('Read Node.js Version') {
            steps {
                script {
                    // 从 .nvmrc 文件中读取 Node.js 版本号
                    if (fileExists('.nvmrc')) {
                        env.NODE_VERSION = sh(script: 'cat .nvmrc', returnStdout: true).trim()
                        echo "Using Node.js version from .nvmrc: ${env.NODE_VERSION}"
                    } else {
                        error ".nvmrc file not found!"
                    }
                }
            }
        }
        stage('Setup Node.js') {
            tools {
                // 使用从 .nvmrc 文件中读取的 Node.js 版本
                nodejs "${NODE_VERSION}"
            }
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
            tools {
                // 使用从 .nvmrc 文件中读取的 Node.js 版本
                nodejs "${NODE_VERSION}"
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
            tools {
                // 使用从 .nvmrc 文件中读取的 Node.js 版本
                nodejs "${NODE_VERSION}"
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
                    sh "rm -rf node_modules"
                    sh "rm -rf package-lock.json"
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
                    echo 'Deploying to Nginx...'
                    sh '''
                        if [ -d "dist" ]; then
                            echo "dist directory exists, deploying..."
                            # 假设你有一个部署脚本 deploy.sh
                            # sh deploy.sh
                        else
                            echo "dist directory does not exist, skipping deployment."
                        fi
                    '''
                    echo 'Deployment completed.'
                    echo 'Cleaning up...'
                    sh '''
                        rm -rf dist
                        rm -rf node_modules
                        rm -rf package-lock.json
                    '''
                    echo 'Cleanup completed.'
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
        cleanup() {
            echo 'Cleaning up workspace...'
            deleteDir() // 删除工作区
            echo 'Workspace cleanup completed.'
        }
    }
}