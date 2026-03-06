#!/bin/bash
# ============================================================
# deploy.sh — ビルド済み dist/ を FTPサーバーに同期
# 使い方: npm run deploy
# lftp の mirror --delete でサーバー側の不要ファイルも自動削除
# ============================================================

set -e  # エラーがあれば即中断

FTP_HOST="yakuzaisupport.com"
FTP_USER="xeksluro"
FTP_PASS='0XF]vNmwB38e1('
REMOTE_PATH="/public_html/match-box/"
LOCAL_PATH="./dist/"

echo "🚀 デプロイ開始: $LOCAL_PATH → $FTP_HOST$REMOTE_PATH"

lftp -c "
  set ftp:ssl-allow yes;
  set ssl:verify-certificate no;
  set net:timeout 30;
  set net:max-retries 3;
  open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST;
  mirror --reverse --delete --verbose --parallel=4 $LOCAL_PATH $REMOTE_PATH;
  quit
"

echo "✅ デプロイ完了！"
