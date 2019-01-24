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
# Setup application
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm link
EXPOSE 8080
CMD ["elprice-api", "start"]
