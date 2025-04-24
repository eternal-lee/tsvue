#!/bin/bash

# 统一包名：deploy.tar.gz
# 参数化变量
# 远程服务器的地址
REMOTE_HOST="root@47.109.60.109"  # 默认远程用户名:IP
REMOTE_DIR=${3:-'/workspace/nginx_home/html/fontend/'}  # 远程目录路径
projectName=${4:-'tsvue'} # 默认项目名称
current_branch=$(git branch --show-current) # 默认项目下打包路径

# 一个变量名，用于引用私钥文件路径
SSH_KEY='~/.ssh/id_rsa' 

# 日志函数
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# 检查 SSH 密钥是否配置
if [ ! -f ~/.ssh/id_rsa ]; then
  log "错误：未找到 SSH 密钥，请配置无密码登录。"
  exit 1
fi

if [[ "${current_branch}" == "master" ]]; then
  distName='prod'
else
  distName="${current_branch}"
fi

# 上传到远程服务器
log "检查远程路径是否存在..."
ssh -i ${SSH_KEY} "${REMOTE_HOST}" "mkdir -p ${REMOTE_DIR}${projectName}/"

log "开始上传文件到远程服务器 ${hostname}..."
scp -r -C -i ${SSH_KEY} deploy.tar.gz "${REMOTE_HOST}:${REMOTE_DIR}${projectName}/"
if [ $? -ne 0 ]; then
  log "错误：文件上传失败。"
  rm -rf deploy.tar.gz
  exit 1
fi
log "文件上传成功。"

# 清理本地临时文件
log "清理本地临时文件..."
rm -rf ${distName} deploy.tar.gz

# 远程解压和部署
log "开始远程解压和部署..."
ssh -i ~/.ssh/id_rsa "${REMOTE_HOST}" <<EOF
  set -e
  cd "${REMOTE_DIR}${projectName}/"
  rm -rf ${distName}
  tar -xzf deploy.tar.gz
  rm -rf deploy.tar.gz
EOF

if [ $? -eq 0 ]; then
  log "远程部署完成。"
else
  log "错误：远程部署失败。"
  exit 1
fi