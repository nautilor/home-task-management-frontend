#!/bin/bash
docker buildx build --platform linux/amd64,linux/arm64,linux/arm . -t ghcr.io/nautilor/htm-frontend:1.0 --output=type=registry --push