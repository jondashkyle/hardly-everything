#!/bin/bash

cd ../../ && \
git pull origin master && \
cd api && npm install && \
cd ../app && npm install && npm run build