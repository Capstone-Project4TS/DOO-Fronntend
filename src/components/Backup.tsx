// import express from "express";
// import morgan from "morgan";
// import http from "http";  // Import http module
// import { Server } from "socket.io"; 
// import mongoose from 'mongoose';
// import connect from "./config/conn.js";
// import router from "./routes/route.js";
// import notificationRoutes from "./routes/notification.routes.js"
// import documentRoutes from "./routes/document.routes.js";
// import documentTemplateRoutes from "./routes/documentTemplate.route.js";
// import documentCategoryRoutes from "./routes/documentCategory.routes.js";
// import subCategoryRoutes from "./routes/subCategory.routes.js";
// import workflowTemplateRoutes from "./routes/workflowTemplate.route.js";
// import folderRoutes from "./routes/folder.routes.js";
// import roleRoutes from "./routes/role.routes.js";
// import userWorkflow from "./routes/userWorkflow.routes.js";
// import workflowRoutes from "./routes/workflow.routes.js";
// import reportRoutes from "./routes/report.route.js"
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
// import initPassportJS from "./startup/passport.js";
// import initCORS from "./startup/cors.js";
// import MongoStore from "connect-mongo";
// import startCronJob from "./startup/dataBaseUpdater.js";
// import cors from "cors";
// import path from "path";

// const app = express();
// const server = http.createServer(app); // Create HTTP server using http.createServer
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true
//   },
//   path: '/socket.io' // Ensure the path is set
// });

// dotenv.config();
// app.use(cors({
//   origin: ['http://localhost:5173'],
//   credentials: true, // enable set cookie
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(morgan("tiny"));
// app.disable("x-powered-by");
// initPassportJS();
// initCORS(app);

// app.locals.OTP = {};
// // Middleware to initialize session
// app.use(
//   session({
//     secret: process.env.SESSION_KEY, // Secret key used to sign the session ID cookie
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.ATLAS_URI, // MongoDB connection URL
//       collectionName: "sessions", // Name of the collection to store sessions
//       ttl: 60 * 60, // Session expiration time in seconds (e.g., 1 day)
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day
//       httpOnly: true, // Cookie accessible only through HTTP(S) requests, not client-side scripts
//       secure: false,
//     },
//   })
// );
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(passport.session());

// // Start the cron job
// startCronJob();

// /** start server only when we have valid connection */
// connect()
//   .then(() => {
//     try {
//       server.listen(process.env.PORT, () => {
//         console.log(`Server connected to http://localhost:${process.env.PORT}`);
//       });
//     } catch (error) {
//       console.log("Cannot connect to the server");
//     }
//   })
//   .catch((error) => {
//     console.log("Invalid database connection...!");
//     console.log(process.env.ATLAS_URI);
//   });

// /** api routes */
// app.use("/api", router,reportRoutes);
// app.use("/documents", documentRoutes);
// app.use(
//   "/admin",
//   workflowTemplateRoutes,
//   documentCategoryRoutes,
//   subCategoryRoutes,
//   documentTemplateRoutes,
//   roleRoutes,
// );
// app.use("/folder", folderRoutes);
// app.use("/initiate", userWorkflow, workflowRoutes, notificationRoutes);
 
// // Socket.io connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join', (userId) => {
//     socket.join(userId);
//     console.log(`User ${userId} joined room`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Export io for use in other modules
// export { io };
