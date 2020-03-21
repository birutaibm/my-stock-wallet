import { Router } from 'express';

import IRCtrl from './Controllers/IRCtrl';
import MovementCtrl from './Controllers/MovementCtrl';
import NotesCtrl from './Controllers/NotesCtrl';
import PositionCtrl from './Controllers/PositionCtrl';
import RootCtrl from './Controllers/RootCtrl';

const routes = Router();

routes.get('/', RootCtrl.index);
routes.get('/positions', PositionCtrl.index);
routes.post('/positions', PositionCtrl.store);
routes.get('/notes', NotesCtrl.index);
routes.post('/notes', NotesCtrl.store);
routes.get('/moves', MovementCtrl.index);
routes.get('/ir', IRCtrl.index);

export default routes;