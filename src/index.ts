import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import App from './providers/App';
import NativeException from './exception/NativeException';

NativeException.process();

App.loadENV();
App.loadPrisma();
App.loadExpress();
App.loadCron();

export default App;



// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import * as OpenApiValidator from "express-openapi-validator";

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 3000;

// app.use(
//     OpenApiValidator.middleware({
//         apiSpec: "./docs/openapi.yaml",
//         validateRequests: true,
//         validateResponses: true,
//         validateApiSpec: false,
//     })
// );

// app.use((err:any, req:any, res:any, next:any) => {
//     // format error
//     res.status(err.status || 500).json({
//         message: err.message,
//         errors: err.errors,
//     });
// });

// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello, World2!");
// });


// app.listen(port, () => {
//     console.log(`Server is running on port ${port} (http://localhost:${port})`);
// });
