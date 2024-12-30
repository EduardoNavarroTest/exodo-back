import express from "express";
import SizesRoutes from "./routes/SizesRoutes.js";
import ProductsRoutes from "./routes/ProductRouter.js"
import CategoriesRoutes from "./routes/CategoryRouter.js"
import SubcategoriesRoutes from "./routes/SubcategoryRouter.js"
import ColorsRoutes from "./routes/ColorRoutes.js"
import GenderRoutes from "./routes/GenderRoutes.js"
import IdTypesRoutes from "./routes/IdTypesRoutes.js"
import MaritalStatusRoutes from "./routes/MaritalStatusRoutes.js"
import EmployeeRoutes from "./routes/EmployeeRoutes.js"
import UserRoutes from "./routes/UserRouter.js"
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
app.use("/api/products", ProductsRoutes);
app.use("/api/categories", CategoriesRoutes);
app.use("/api/subcategories", SubcategoriesRoutes);
app.use("/api/colors", ColorsRoutes);
app.use("/api/genders", GenderRoutes);
app.use("/api/id-types", IdTypesRoutes);
app.use("/api/marital-status", MaritalStatusRoutes);
app.use("/api/employees", EmployeeRoutes);
app.use("/api/users", UserRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});


/**
 * PRIMER FASE
 * -----------------------------
 * Products => LISTO BACKEND, FALTA FRONTEND
 * Sizes => LISTO BACKEND, FALTA FRONTEND
 * Categories => LISTO BACKEND, FALTA FRONTEND
 * Subcategories => LISTO BACKEND, FALTA FRONTEND
 * Colors => LISTO BACKEND, FALTA FRONTEND
 * TypesId => LISTO BACKEND, FALTA FRONTEND
 * MaritalStatus => PENDIENTE BACKEND, FALTA FRONTEND.......
 *  
 * React FRONT de lo anterior
 * 
 * SEGUNDA FASE
 * -----------------------------
 * Employes => Próximo a trabajar
 * Users => Próximo a trabajar
 * Clients => Próximo a trabajar
 * 
 * 
 * TERCERA FASE
 * -----------------------------
 * Logins => Próximo a trabajar
 * JWT => Próximo a trabajar
 * BCRYPT => Próximo a trabajar
 * COOKIE PARSER => Próximo a trabajar (BUSCAR TODOS ESOS PERENDENGUES)
 * 
 * 
 * CUARTA FASE
 * -----------------------------
 * Factory de Mongo => Próximo a trabajar
 * 
 */