# pull official base image
FROM node:20.11.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent --only=dev
RUN npm install react-scripts -g --silent

# add app
COPY . ./

RUN npm run build

# start app
CMD ["npm", "start"]
