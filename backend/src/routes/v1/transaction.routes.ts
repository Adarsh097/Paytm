import express, { type RequestHandler } from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import controllers from '../../controllers/index.js';

const TransactionRouter = express.Router();


TransactionRouter.post('/wallet',authMiddleware,controllers.transactionController.wallet as unknown as RequestHandler);
// TransactionRouter.post('/transaction',);
TransactionRouter.get('/balance',authMiddleware,controllers.transactionController.getBalance as unknown as RequestHandler);


export default TransactionRouter;