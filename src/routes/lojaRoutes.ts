import { Router, Request, Response, NextFunction } from 'express';
import { lojaController } from '../controllers/LojaController';

const router = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/lojas/:id', asyncHandler((req:Request, res:Response) => lojaController.show(req, res)));
router.get('/lojas', asyncHandler((req:Request, res:Response) => lojaController.index(req, res)));
router.post('/lojas', asyncHandler((req:Request, res:Response) => lojaController.store(req, res)));
router.put('/lojas/:id', asyncHandler((req:Request<{id:string}>, res:Response) => lojaController.update(req, res)));
router.delete('/lojas/:id', asyncHandler((req:Request, res:Response) => lojaController.destroy(req, res)));
router.post('/lojas/buscarLojas/', asyncHandler((req:Request, res:Response) => lojaController.buscarLojaMaisProxima(req, res)));

export default router;