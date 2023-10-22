#!/bin/bash

pnpm build:cli
pnpm -C ../packages/cli compress

read -p "Press Enter to exit.........."
