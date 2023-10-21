#!/bin/bash

print_cyan() {
  echo -e "\e[36m$1\e[0m"
  echo ""
}

print_green() {
  echo -e "\e[32m$1\e[0m"
  echo ""
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

print_cyan "Copying dist of ui"
cp -r packages/ui/dist packages/cli/ui
print_green "Completed!"

read -p "Press Enter to exit.........."
