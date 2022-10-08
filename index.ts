import app from "./src/app"
import connect2DB from './config/database'
import dotenv from 'dotenv';
import AdminBro from "admin-bro";
import AdminBroExpress from "@admin-bro/express";
import AdminBroMongoose from '@admin-bro/mongoose';

// to pass the entire database to AdminBro, models have to be in scope
require('./src/models');
AdminBro.registerAdapter(AdminBroMongoose)

//loading env
dotenv.config();


const port = process.env.PORT || 5001

function init(){
  connect2DB().then((con)=>{

    const adminBro = new AdminBro({
      databases: [con],
      rootPath: '/admin'
    })
    const AdminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
      authenticate: authMethod,
      cookiePassword: 'some-secret-password'
    })
    app.use(adminBro.options.rootPath, AdminRouter)

    //Server ready to start
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
}

//fake auth methode
const authMethod = async(username: string, password: string)=>{
  if(username==="admin" && password==="admin") return true
  return false;
};

console.log('hello');
init();