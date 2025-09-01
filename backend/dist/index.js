import express from "express";
import cors from "cors";
import ENV from "./configs/env.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});
//# sourceMappingURL=index.js.map