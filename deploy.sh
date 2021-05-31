#!/bin/sh     
sudo git pull origin main
mkdir tanuj1
sudo npm install
mkdir tanuj2
cd frontend
mkdir tanuj3
npm install
sudo npm run build
mkdir tanuj4
cd ..
sudo systemctl restart nginx
sudo pm2 restart all
