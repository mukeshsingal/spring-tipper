# FROM maven:3.8.5-openjdk-17 AS build
# COPY . .
# RUN mvn clean package -DskipTests

FROM --platform=linux/amd64 openjdk:17.0.1-jdk-slim
# Install Chrome and dependencies
# Install dependencies and download Chrome
# Install dependencies and download Chrome
RUN apt-get update && \
    apt-get install -y \
    wget \
    gnupg \
    libxi6 \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    libcurl4 \
    libdrm2 \
    libgbm1 \
    libvulkan1 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Download and install Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb || true && \
    apt-get -f install -y

COPY /target/Tipper-0.0.1-SNAPSHOT.jar tipper.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","tipper.jar"]