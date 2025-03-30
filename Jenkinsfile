pipeline {
    agent any
    environment {
        NODE_VERSION = '18.20.5' // 默认 Node.js 版本
    }
    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    sh '''
                        # 加载 nvm
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

                        # 检查 .nvmrc 文件是否存在
                        if [ -f .nvmrc ]; then
                            echo ".nvmrc file found, using specified Node.js version."
                            NODE_VERSION=$(cat .nvmrc)
                        else
                            echo ".nvmrc file not found, using default Node.js version."
                        fi

                        # 安装并使用指定版本的 Node.js
                        nvm install $NODE_VERSION
                        nvm use $NODE_VERSION

                        # 验证 Node.js 和 npm 版本
                        node -v
                        npm -v
                    '''
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
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use $NODE_VERSION

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
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                        nvm use $NODE_VERSION

                        if [ "$BRANCH_NAME" = "master" ]; then
                            echo "Building for production..."
                            npm run build:prod
                        elif [ "$BRANCH_NAME" = "dev" ]; then
                            echo "Building for development..."
                            npm run build:dev
                        elif [ "$BRANCH_NAME" = "test" ]; then
                            echo "Building for test branch..."
                            npm run build:test
                        else
                            echo "Skipping build for branch: $BRANCH_NAME"
                        fi

                        if [ -d dist ]; then
                            echo "dist directory exists, writing version.txt..."
                        else
                            echo "dist directory does not exist, creating it..."
                            mkdir -p dist
                        fi
                        echo "Build completed on $(date '+%Y-%m-%d %H:%M:%S')" > dist/version.txt
                    '''
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
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                        nvm use $NODE_VERSION

                        if [ "$BRANCH_NAME" = "master" ]; then
                            echo "Deploying to production server..."
                            scp -r dist/* /workspace/nginx_home/html/web/tsvue/master
                        elif [ "$BRANCH_NAME" = "dev" ]; then
                            echo "Deploying to development server..."
                            scp -r dist/* /workspace/nginx_home/html/web/tsvue/dev
                        elif [ "$BRANCH_NAME" = "test" ]; then
                            echo "Deploying to test branch..."
                            scp -r dist/* /workspace/nginx_home/html/web/tsvue/test
                        else
                            echo "Skipping deployment for branch: $BRANCH_NAME"
                        fi
                    '''
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