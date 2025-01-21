import express from 'express';
import passport from 'passport';
import SizeController from '../controllers/SizeController.js';

const router = express.Router();
const sizeController = new SizeController();

router.get('/', passport.authenticate('jwt', { session: false }), sizeController.getAllSizes); //Traer todos
router.get('/id/:id', passport.authenticate('jwt', { session: false }), sizeController.getSizeById); //Traer por id
router.get('/code/:code', passport.authenticate('jwt', { session: false }), sizeController.getSizeByCode); //Traer por code
router.post('/', passport.authenticate('jwt', { session: false }), sizeController.createSize); //Crear
router.put('/id/:id', passport.authenticate('jwt', { session: false }), sizeController.updateSizeById); //Actualizar
router.delete('/id/:id', passport.authenticate('jwt', { session: false }), sizeController.deleteSizeById); //Eliminar por id



export default router;
