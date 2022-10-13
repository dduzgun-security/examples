# FROM node:lts-alpine

# WORKDIR /usr/src/app
# COPY . .
# RUN npm install

# EXPOSE 3000

# CMD [ "npm", "start" ]
# pull the base image

FROM node:14.9
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]