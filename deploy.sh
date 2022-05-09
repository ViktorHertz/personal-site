#先执行tcb.sh（含打包），再deploy.sh

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
#set -e

# 生成静态文件
#npm run build

# 进入生成的文件夹
#cd .vuepress/dist

git init
git add -A
git commit -m '去掉demo'

git config --global user.name "gao_sen_g"
git config --global user.email "2322134363@qq.com"

# 填写你需要发布的仓库地址
git push -f https://gitee.com/gao_sen_g/gaosen.git master

git push -f https://github.com/ViktorHertz/personal-site.git master

#cd -

