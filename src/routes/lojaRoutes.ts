import {Router} from 'express';
import { lojaController } from '../controllers/LojaController';

const router = Router();

router.get('/lojas/:id', (req, res) => lojaController.show(req, res));
router.get('/lojas', (req, res) => lojaController.index(req, res));
router.post('/lojas', (req, res) => lojaController.store(req, res));
router.put('/lojas/:id', (req, res) => lojaController.update(req, res));
router.delete('/lojas/:id', (req, res) => lojaController.destroy(req, res));
router.post('/lojas/buscarLojas/', (req, res) => lojaController.buscarLojaMaisProxima(req, res));

export default router;