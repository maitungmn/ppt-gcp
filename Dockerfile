FROM debian:stretch
# General tools
RUN apt-get update
RUN apt-get install -y \
    apt-utils \
    wget \
    gnupg \
    curl

# Node.js v10.x
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

## Puppeteer ENV
#RUN PUPPETEER_DOWNLOAD_HOST = https://npm.taobao.org/mirrors

# Setup application
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
