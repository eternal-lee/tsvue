#!/bin/bash

# 统一包名：deploy.tar.gz
# 参数化变量
# 远程服务器的地址
REMOTE_HOST="root@47.109.60.109"  # 默认远程用户名:IP
projectName=${1:-''} # 默认项目名称
DIST_DIR=${2:-''}  # 默认打包目录
REMOTE_DIR=${3:-'/workspace/nginx_home/html/frontend/'}  # 远程目录路径


# 一个变量名，用于引用私钥文件路径
SSH_KEY="/var/jenkins_home/.ssh/id_rsa"

# 日志函数
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# 检查 SSH 密钥是否配置
if [ ! -f "$SSH_KEY" ]; then
  log "错误：未找到 SSH 密钥，请配置无密码登录。"
  exit 1
fi

# 检查远程服务器是否可达
log "检查远程服务器 ${REMOTE_HOST} 是否可达..."
ssh -i ${SSH_KEY} -o "StrictHostKeyChecking=no" "${REMOTE_HOST}" exit
if [ $? -ne 0 ]; then
  log "错误：无法连接到远程服务器 ${REMOTE_HOST}。"
  exit 1
fi
log "远程服务器 ${REMOTE_HOST} 可达。"

# 检查打包文件是否存在
if [ ! -f "deploy.tar.gz" ]; then
  log "错误：打包文件 deploy.tar.gz 不存在。"
  exit 1
fi

# 上传到远程服务器
log "开始创建远程目录 ${REMOTE_DIR}${projectName}/..."
ssh -q -i ${SSH_KEY} "${REMOTE_HOST}" "mkdir -p ${REMOTE_DIR}${projectName}/"

log "开始上传文件到远程服务器 ${REMOTE_HOST}..."
scp -r -C -i ${SSH_KEY} deploy.tar.gz "${REMOTE_HOST}:${REMOTE_DIR}${projectName}/"
if [ $? -ne 0 ]; then
  log "错误：文件上传失败。"
  rm -rf deploy.tar.gz
  exit 1
fi
log "文件上传成功。"

# 清理本地临时文件
log "清理本地临时文件..."
rm -rf ${DIST_DIR} deploy.tar.gz

# 远程解压和部署
log "开始远程解压和部署..."
ssh -q -i ${SSH_KEY} "${REMOTE_HOST}" <<EOF
  set -e
  cd "${REMOTE_DIR}${projectName}/"
  rm -rf  ${DIST_DIR}
  tar -xzf deploy.tar.gz
  rm -rf deploy.tar.gz
EOF

if [ $? -eq 0 ]; then
  log "远程部署完成。"
else
  log "错误：远程部署失败。"
  exit 1
fi
