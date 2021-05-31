#!/bin/sh     
sudo git pull origin main
mkdir raghav
echo tanuj1
sudo npm install
echo tanuj2
cd frontend
echo tanuj3
npm install
sudo npm run build
echo tanuj4
cd ..
sudo systemctl restart nginx
sudo pm2 restart all
