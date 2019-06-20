[![Build Status](https://travis-ci.com/JHSRobo/Bioseer-Web-Interface.svg?branch=master)](https://travis-ci.com/JHSRobo/Bioseer-Web-Interface)

# BioseerWebInterface

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

Built off of [this angular project](https://stackblitz.com/edit/angular-bing-maps?file=src%2Fapp%2Fbing-map.component.ts) that incorporated bing maps.

[Documentation](https://jhsrobo.github.io/Bioseer-Web-Interface/) built by compdoc. Before every push to master, run `npm run doc` to build docs for github pages.

Built with a combination of a nodejs backend serve with MongoDB and an Angular 7 frontend. Hosted using firebase.

## Development Environment
Follow the following setup instructions to get developing.

### Make sure you're running node 10

Install for managing and installing node versions easily. `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`

Run `nvm install 10 && nvm alias default 10`

### Install CLI Tools

`npm i -g @angular/cli`

`npm i -g firebase-tools`

Sign into firebase cli with your account (make one if you don't have one) using `firebase login`

### Clone the Github and install packages

`git clone https://github.com/JHSRobo/Bioseer-Web-Interface/`

Run `npm i` to install all the packages

`cd functions && npm i` to install packages for Firebase Functions

## Development server

To begin developing, first start the Angular development server `ng s` and then run `firebase emulator:start` to emulate the server functions locally

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
