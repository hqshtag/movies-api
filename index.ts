import app from "./src/app"
import connect2DB from './config/database'
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.PORT || 5001

function init(){



  connect2DB().then(()=>{
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
}


init();