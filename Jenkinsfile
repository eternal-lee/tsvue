// 当前项目目录名称
def projectName = "tsvue"
// 当前项目生产分支名
def masterBranchName = "master"
// 当前项目质控分支名
def testBranchName = "test"
// 当前项目开发分支名
def devBranchName = "dev"

pipeline {
     agent any
    environment {
        NODE_VERSION = '18.20.5' // 指定 Node.js 版本
        projectName = "${projectName}"
        masterBranchName = "${masterBranchName}"
        testBranchName = "${testBranchName}"
        devBranchName = "${devBranchName}"
        sshCredentialId = "${sshCredentialId}"
        SSH_KEY = "${SSH_KEY}"
    }
    tools {
        nodejs NODE_VERSION // 使用 Jenkins 中配置的 Node.js 工具
    }
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
        stage('Setup Node.js') {
            steps {
                script {
                    echo "deployBranchName---${env.deployBranchName}"
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
                        sh '''
                            echo "Build completed on $(date '+%Y-%m-%d %H:%M:%S')" > dist/version.txt
                        '''
                        echo "Build info file created in dist directory."
                    } else {
                        echo '错误：dist directory does not existx'
                    }
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
                    echo "Deploying to Nginx..."
                        sh '''
                            #!/bin/bash
                            if [ -d "dist" ]; then
                                echo "dist directory exists, deploying..."
                                # 复制打包文件
                                cp -r dist ${deployBranchName}
                                tar -czf deploy.tar.gz ${deployBranchName} > /dev/null 2>&1
                                echo "项目打包完成：deploy.tar.gz"

                                # 假设你有一个部署脚本 deploy.sh
                                sh deploy.sh
                            else
                                echo "dist directory does not exist, skipping deployment."
                            fi
                        '''
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