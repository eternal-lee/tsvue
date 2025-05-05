// 当前项目目录名称
def projectName = "tsvue"
// 当前项目生产分支名
def masterBranchName = "master"
// 当前项目质控分支名
def testBranchName = "test"
// 当前项目开发分支名
def devBranchName = "dev"

// 远程目录路径
def REMOTE_DIR="/workspace/nginx_home/html/frontend/"

pipeline {
     agent any
    environment {
        NODE_VERSION = '18.20.5' // 指定 Node.js 版本
    }
    // tools {
    //     nodejs NODE_VERSION // 使用 Jenkins 中配置的 Node.js 工具
    // }
    stages {
        stage('getBranch') {
            steps {
                script {
                    try {
                        echo "masterBranchName: ${masterBranchName}"
                        echo "testBranchName: ${testBranchName}"
                        echo "devBranchName: ${devBranchName}"
                        echo "BRANCH_NAME: ${BRANCH_NAME}" // 当前分支名
                        if ("${masterBranchName}" == "${BRANCH_NAME}") {
                            env.deployBranchName = "prod"
                            env.buildCommand = "build"
                        }
                        if ("${testBranchName}" == "${BRANCH_NAME}") {
                            env.deployBranchName = "test"
                            env.buildCommand = "build:sit"
                        }
                        if ("${devBranchName}" == "${BRANCH_NAME}") {
                            env.deployBranchName = "dev"
                            env.buildCommand = "build:dev"
                        }
                    }
                    catch (err) {
                        echo err.getMessage()
                    }
                }
            }
        }
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
                    echo "Deploying to Nginx using SSH..."
                    sshagent(['jenkin-ssh']) {
                         sh '''
                            #!/bin/bash
                            if [ -d "dist" ]; then
                                echo "dist directory exists, deploying..."
                                # 复制打包文件
                                cp -r dist ${deployBranchName}
                                tar -czf deploy.tar.gz ${deployBranchName} > /dev/null 2>&1
                                echo "项目打包完成：deploy.tar.gz"

                                # 使用 SSH 连接到远程服务器并执行命令
                                ssh root@47.109.60.109 "echo SSH connection successful"
                                # 检查打包文件是否存在
                                if [ ! -f "deploy.tar.gz" ]; then
                                    echo "错误：打包文件 deploy.tar.gz 不存在。"
                                    exit 1
                                fi

                                # 上传打包文件到远程服务器
                                # 上传到远程服务器
                                echo "开始创建远程目录 ${REMOTE_DIR}${projectName}/..."
                                ssh -q root@47.109.60.109 "mkdir -p ${REMOTE_DIR}${projectName}/"
                                
                                echo "开始上传文件到远程服务器 root@47.109.60.109..."
                                scp -r -C deploy.tar.gz "root@47.109.60.109:${REMOTE_DIR}${projectName}/"
                                # 清理本地临时文件
                                echo "清理本地临时文件..."
                                rm -rf ${deployBranchName} deploy.tar.gz

                                # 远程解压和部署
                                echo "开始远程解压和部署..."
                                ssh root@47.109.60.109 "cd ${REMOTE_DIR}${projectName}/ && rm -rf ${deployBranchName} && tar -xzf deploy.tar.gz && rm -rf deploy.tar.gz"
                                echo "Deployment completed successfully."
                            else
                                echo "dist directory does not exist, skipping deployment."
                            fi
                        '''
                     }
                    echo 'Deployment completed.'
                    echo 'Cleaning up...'
                    sh '''
                        rm -rf dist .npm
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
