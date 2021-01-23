#!/bin/bash

echo "build 生成生产环境代码"

rm -rf dist && npm run build

# echo "上传代码到云主机"

# cd dist && scp -r * root@47.100.49.208:/www/wwwroot/zhihu.visionwu.top