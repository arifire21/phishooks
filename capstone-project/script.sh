#Use this before ./script.sh
#chmod 700 ./script.sh

#Connect to server
#ssh -i "../../../PhisHooksKey.pem" ubuntu@3.144.199.247

#Copy files to backend server 
rsync -a -e "ssh -i ../../../PhisHooksKey.pem" /Users/edgarjardines/Documents/Team-7-Project/Team-7-Capstone ubuntu@3.144.199.247:/home/ubuntu

#run pm2 and server
#npm run prod