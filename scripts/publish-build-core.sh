#!/bin/bash

pnpm build:core
pnpm -C ../packages/core compress

read -p "Press Enter to exit.........."
