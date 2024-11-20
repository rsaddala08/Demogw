# Copy of https://hub.docker.com/r/galenframework/cli/~/dockerfile/
# as of 04 Dec 2018
# modified to meet our needs
# Testcafe ubuntu based testcafe Dockerfile. Image is published as `gt-testcafe`.

FROM ubuntu:16.04

# This should match image tag
# node version v16.3.0 comes with npm version 7.15.1
ENV NODE_VERSION 16.3.0

ENV DOCKER_COMPOSE_VERSION=1.24.1

ENV NVM_DIR /home/galen
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
# No interactive frontend during docker build
ENV DEBIAN_FRONTEND=noninteractive \
    DEBCONF_NONINTERACTIVE_SEEN=true

#================================================
# Customize sources for apt-get
#================================================
RUN echo "deb http://archive.ubuntu.com/ubuntu xenial main universe\n" > /etc/apt/sources.list && \
  echo "deb http://archive.ubuntu.com/ubuntu xenial-updates main universe\n" >> /etc/apt/sources.list && \
  echo "deb http://security.ubuntu.com/ubuntu xenial-security main universe\n" >> /etc/apt/sources.list

#========================
# Miscellaneous packages
# Includes minimal runtime used for executing non GUI Java programs
#========================
RUN apt-get -qqy update \
  && apt-get -qqy --no-install-recommends install \
    bzip2 \
    ca-certificates \
    openjdk-8-jre-headless \
    tzdata \
    sudo \
    unzip \
    curl \
    wget \
    zip \
    apt-transport-https \
    software-properties-common \
    jq \
    expect \
    npm \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
  && sed -i 's/securerandom\.source=file:\/dev\/random/securerandom\.source=file:\/dev\/urandom/' ./usr/lib/jvm/java-8-openjdk-amd64/jre/lib/security/java.security

# docker-compose & docker
RUN curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m) > ./docker-compose && \
  mv ./docker-compose /usr/bin/docker-compose && \
  chmod +x /usr/bin/docker-compose && \
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
  add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable" && \
  apt update && \
  apt-get install -y docker-ce docker-ce-cli containerd.io

#========================
# Install NPM
#========================
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get -qqy install nodejs
RUN npm config set unsafe-perm true
RUN npm install -g npm-cli-login
RUN npm config delete unsafe-perm

#===================
# Timezone settings
# Possible alternative: https://github.com/docker/docker/issues/3359#issuecomment-32150214
#===================
ENV TZ "UTC"
RUN echo "${TZ}" > /etc/timezone \
  && dpkg-reconfigure --frontend noninteractive tzdata

#========================================
# Add normal user with passwordless sudo
#========================================
RUN useradd -u 1000 galen \
         --shell /bin/sh  \
         --create-home \
  && usermod -a -G sudo galen \
  && echo 'ALL ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
  && echo 'galen:secret' | chpasswd

RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list && \
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# clean up
RUN apt-get autoremove -y

#===================================================
# Install nvm with node and npm
#===================================================
# adding browsers install script
COPY ./installBrowsers.sh /
RUN chmod +x installBrowsers.sh

USER galen
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default

# https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable
ENV CHROME_VERSION="*"

RUN sudo -E ./installBrowsers.sh

# libraries needed for canvas library(visual-testing dependency)
RUN sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN sudo apt-get update && \
    sudo apt-get install yarn

#===================================================
# Install Python3
#===================================================
USER root
RUN cd /opt && \
    curl -C - -O https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz && \
    tar -xvf Python-3.10.0.tgz && \
    apt-get install -y build-essential && \
    cd Python-3.10.0 && \
    ./configure && \
    apt-get install zlib1g-dev && \
    make && \
    make install

#===================================================
# Install Java 11
#===================================================
RUN sudo -E add-apt-repository ppa:openjdk-r/ppa

RUN apt-get update && apt-get install -y \
	xvfb \
	bash \
	bash-completion \
	g++ \
	make \
	openjdk-11-jdk-headless

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:${PATH}"

RUN mkdir -p /opt/gtui
ADD startUi.sh /opt/gtui/startUi.sh
RUN chmod a+x /opt/gtui/startUi.sh
RUN chmod -R 777 /opt/gtui

USER user
ENV DISPLAY=:1.0
ENTRYPOINT ["/bin/bash"]