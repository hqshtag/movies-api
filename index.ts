import app from "./src/app"
import connect2DB from './config/database'
import dotenv from 'dotenv';
import AdminBro from "admin-bro";
import AdminBroExpress from "@admin-bro/express";
import AdminBroMongoose from '@admin-bro/mongoose';


// even if we pass entire database to adminBro, models have to be in scope
require('./src/models');

AdminBro.registerAdapter(AdminBroMongoose)


dotenv.config();


const port = process.env.PORT || 5001

function init(){

  //setup adminbro


  connect2DB().then((con)=>{
    const adminBro = new AdminBro({
      databases: [con],
      rootPath: '/admin'
    })
    const AdminRouter = AdminBroExpress.buildRouter(adminBro)
    app.use(adminBro.options.rootPath, AdminRouter)
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
}

console.log('hello');
init();