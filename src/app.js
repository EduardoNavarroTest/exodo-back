import express from "express";
import SizesRoutes from "./routes/SizesRoutes.js";
import ProductsRoutes from "./routes/ProductRouter.js"
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



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});


/**
 * PRIMER FASE
 * -----------------------------
 * Products => Listo todo, falta solo invocar las validaciones para categoria, subcategoria, talla y color
 * Sizes => Listo todo, tomar como base para el resto de los modelos
 * Categories => Próximo a trabajar
 * Subcategories => Próxima a trabajar
 * Colors => Próximo a trabajar
 *  
 * React FRONT de lo anterior
 * 
 * SEGUNDA FASE
 * -----------------------------
 * Employes => Próximo a trabajar
 * Users => Próximo a trabajar
 * Clients => Próximo a trabajar
 * TypesId => Próximo a trabajar
 * MaritalStatus => Próximo a trabajar
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