#!/bin/bash

cd ../../ && \
git pull origin master && \
cd api && npm install && \
cd ../hello && npm install && npm run build &&
cd ../app && npm install && npm run build &&
pm2 restart api
