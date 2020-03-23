FROM node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
EXPOSE 8080
CMD [ "npm", "start" ]
