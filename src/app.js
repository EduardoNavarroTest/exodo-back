import express from "express";
import SizesRoutes from "./routes/SizesRoutes.js";
import cors from 'cors';
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//Routes
app.use("/api/sizes", SizesRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
