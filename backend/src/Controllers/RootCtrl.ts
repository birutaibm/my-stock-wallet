import { Request, Response } from 'express';

class RootCtrl {
  public index(req: Request, res: Response) {
    return res.json({
      project: "my-stock-wallet-backend",
      version: "1.0.0",
      author: "Rafael Arantes",
    });
  }
}

export default new RootCtrl();