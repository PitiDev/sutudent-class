#!/bin/bash

IMAGE=62.72.51.83:5000/student-web-api

if [ -n "$1" ]; then VERSION=$1; else VERSION="latest";fi

echo "Building image $IMAGE:$VERSION"

docker build --platform=linux/amd64  -t $IMAGE:$VERSION .
docker push $IMAGE:$VERSION
