import "reflect-metadata";
import express from "express";
import router from "./routes/user.routes";
import routerLogin from "./routes/login.routes";
const app = express();

app.use(express.json());
app.use("/users", router);
app.use("/login", routerLogin);

export default app;
