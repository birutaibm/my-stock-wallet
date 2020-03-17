import { Router } from 'express';
import PositionCtrl from './Controllers/PositionCtrl';
import NotesCtrl from './Controllers/NotesCtrl';
const routes = Router();

routes.get('/', (req, res) => {
  return res.json({endPoints: {
    positions: {
      get: {
        response: {
          '[]': {
            ticker: 'string',
            quantidy: 'number',
            price: 'number'
          },
        },
      }
    },
    notes: {
      post: {
        body: {
          date: {
            year: 'number',
            month: 'number',
            day: 'number',
          },
          value: 'number',
          itens: {
            '[]': {
              direction: "'Buy' | 'Sell'",
              ticker: 'string',
              quantidy: 'number',
              unitPrice: 'number',            
            },
          },
        },
        response: {
          '[]': {
            ticker: 'string',
            quantidy: 'number',
            price: 'number'
          },
        },
      }
    },
  }});
});
routes.get('/positions', PositionCtrl.index);
routes.post('/notes', NotesCtrl.store)

export default routes;