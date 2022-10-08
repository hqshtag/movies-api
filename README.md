## Movie API

Express Typescript API application for managing movies & torrents like yts.mx API.

**Used Technologies**: 

- [x] Node, Express Typescript
- [x] MongoDB & Mongoose
- [x] Docker
- [x] Jest


**Running on your localhost**
After cloning the the repository
- run `yarn install` or `npm install`
- create `.env` file and add `MONGODB_URL` && `PORT`
- start developement server by executing `yarn dev` or `npm run dev`

To test the API Endpoints run `yarn test` / `npm run test` 
To build the app run `yarn build` / `npm run build`;

**Running with Docker**

- Build the docker image `docker build . -t movies-api`
- Running the container `docker run -p 5000:5000 movies-api`


Integrated [AdminBro](https://beta.adminbro.com/) Dashboard on `/admin`, you can login with `admin:admin`
