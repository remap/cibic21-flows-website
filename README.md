# CiBiC Visualization website
This repo contains the code for [flows.cibic.bike](https://flows.cibic.bike) site which is part of the CiBiC Project.

## Installation
Clone into this repo on your local machine and run `yarn install` to download and install the required packages.

### Dependencies
All project dependencies can be found in [package.json](./package.json)
 
 - [nodejs ^16.16.0](https://nodejs.org/en)
 - [yarn ^1.22.18](https://yarnpkg.com/) 
 - [react ^18.2.0](https://react.dev/)

### Building and running the project
Use `yarn start` to build and run a local development version of the site. 

Use `yarn build` to create a production ready version of the site in `./build` directory of the project.

## Deploying to Production Site
This repo utilizes GitActions to deploy the site to [https://flows.cibic.bike](https://flows.cibic.bike). This automation can be found in [.github/workflows](./.github/workflows/push-to-prod.yml).

_Automatic deployment will run on **ANY** push to main_

Its highly advised to use another branch to develop on and then use a PR to merge changes into main.

The production site is hosted in an S3 bucket that is distributed with CloudFront.

## Contributors
- [@leohque](https://github.com/leohque)
- [@IanShelanskey](https://github.com/IanShelanskey)
- [@radialbalance](https://github.com/radialbalance)
- [@raganmd](https://github.com/raganmd)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
