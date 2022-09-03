FROM node:lts
RUN export DEBIAN_FRONTEND=noninteractive && ln -fs /usr/share/zoneinfo/America/Edmonton /etc/localtime && apt-get update -y && apt-get install -y tzdata && dpkg-reconfigure --frontend noninteractive tzdata
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig.json .
RUN mkdir -p /usr/src/app/src
#start
CMD ["npm", "run", "run"]
