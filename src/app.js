import express from "express";
import SizesRoutes from "./routes/SizesRoutes.js";
import ProductsRoutes from "./routes/ProductRoutes.js"
import CategoriesRoutes from "./routes/CategoryRouter.js"
import SubcategoriesRoutes from "./routes/SubcategoryRouter.js"
import ColorsRoutes from "./routes/ColorRoutes.js"
import GenderRoutes from "./routes/GenderRoutes.js"
import IdTypesRoutes from "./routes/IdTypesRoutes.js"
import MaritalStatusRoutes from "./routes/MaritalStatusRoutes.js"
import EmployeeRoutes from "./routes/EmployeeRoutes.js"
import UserRoutes from "./routes/UserRouter.js"
import SessionRoutes from "./routes/SessionRoutes.js"
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cors from 'cors';
//import "./database.js";
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
initializePassport();
app.use(passport.initialize());


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
app.use("/api/session", SessionRoutes);




app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});


/**
 * 
 * 
 * 
 * 
 * 
 * PRIMER FASE
 * -----------------------------
 * Proteger todas las rutas con JWT
 * En React, refactorizar el login (UI)
 * En React, aplicar la lógica de login	
 * En react, aplicar la lógica de logout
 * En React, aplicar la lógica de proteger rutas
 * 
 * 
 * 
 * SEGUNDA FASE
 * -----------------------------
 * Front de lo anterior
 * Empleados
 * Productos
 * Buscar dependencias y librerias no utilizadas
 * 
 * 
 * TERCERA FASE
 * -----------------------------
 * Back y front de Clientes
 * 
 * 
 * CUARTA FASE
 * -----------------------------
 * Factory de Mongo => Próximo a trabajar
 * 
 */

/*
//Setear una cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("miCookie", "La mejor cookie del mundo");
    res.send("Cookie seteada");
});

//Leer todas las cookies
app.get("/read-cookie", (req, res) => {
    res.send(req.cookies);
});

//Leer solo una cookie
app.get("/read-one-cookie", (req, res) => {
    const cookie = req.cookies["miCookie"];
    res.send(`La cookie es: ${cookie}`);
});

//Borrar una cookie
app.get("/delete-cookie", (req, res) => {
    res.clearCookie("miCookie");
    res.send("Cookie eliminada");
});

//Borrar todas las cookies
app.get("/delete-all-cookies", (req, res) => {
    res.clearCookie();
    res.send("Todas las cookies han sido eliminadas");
});

//Crear una cookie con un tiempo de expiración
app.get("/set-cookie-expiration", (req, res) => {
    res.cookie("cookieExpiracion", "Cookie con tiempo de expiración", { maxAge: 5000 }); //5 segundos
    res.send("Cookie con tiempo de expiración seteada");
});


//Clave secreta
app.get("/set-cookie-secret", (req, res) => {
    res.cookie("cookieSecret", "Esto es un mensaje ultra secreto", { signed: true }); //Signed es para saber que es una cookie privada
    res.send("Cookie ultra secreta, nadie saba lo que tiene");
});

//Leer una cookie secreta
app.get("/read-cookie-secret", (req, res) => {
    const cookie = req.signedCookies["cookieSecret"];
    res.send(`La cookie es: ${cookie}`);
});

app.get("/read-cookie-secret2", (req, res) => {
    const cookie = req.signedCookies.cookieSecret;
    res.send(cookie ? `La cookie es: ${cookie}` : "Cookie no válida");
});

//Ejemplo de session con un contador
app.get("/counter", (req, res) => {
    if (req.session.contador) {
        req.session.contador++;
        res.send(`Contador: ${req.session.contador}`);
    } else {
        req.session.contador = 1;
        res.send(`Bienvenido Prro: ${req.session.contador}`);
    }

});

//Cerrar la sesión
app.get("/logout", (req, res) => {
    req.session.destroy((e) => {
        if (e) {
            res.status(500).json({ error: e });
        } else {
            res.send("Sesión cerrada");
        }

    });
});

// Login con session
app.get("/login", (req, res) => {
    const { username, password } = req.query;
    if (username === "admin" && password === "123") {
        req.session.user = { username, password };
        res.send("Login successful");
    } else {
        res.status(401).json({ error: "Invalid username or password" });
    }
});


//Ruta privada
app.get("/private", auth, (req, res) => {
    res.send(`Esta es una ruta privada, eres un pro, user : ${req.session.user.username}`);
});

*/