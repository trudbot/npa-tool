#!/bin/bash

print_cyan() {
  echo -e "\e[36m$1\e[0m"
  echo ""
}

print_green() {
  echo -e "\e[32m$1\e[0m"
  echo ""
}

remove_directory() {
  local dir_to_remove="$1"

  # 检查目录是否存在
  if [ -d "$dir_to_remove" ]; then
    # 目录存在，删除它
    rm -r "$dir_to_remove"
    echo "目录 $dir_to_remove 已被删除."
  fi
}

print_cyan "Installing dependencies"
pnpm install
print_green "Completed!"

print_cyan "Building Module: core"
pnpm build:core
print_green "Completed!"

print_cyan "Building Module: cli"
pnpm build:cli
print_green "Completed!"

print_cyan "Building Module: ui"
pnpm build:ui
print_green "Completed!"

# 将前端打包结果复制到cli中
print_cyan "Copying dist of ui"
remove_directory packages/cli/ui
cp -r packages/ui/dist packages/cli/ui
print_green "Completed!"

read -p "Press Enter to exit.........."
