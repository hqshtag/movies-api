import express, { Request, Response } from "express";
import { MovieController, TorrentController } from "../controllers";
import {
  TListAllRequest,
  TPostNewRequest,
  TUpdateByIdRequest,
  TAddTorrentRequest,
  TDeleteByIdRequest,
} from "../commun";

const router = express.Router();

router.get("/", async (req, res) => {
  const { username } = req.query;
  const response = await MovieController.welcome(username?.toString());
  res.json({
    status: "Success",
    payload: response,
  });
});

router.get("/getAll", async (req: TListAllRequest, res: Response) => {
  const { limit, page } = req.query;
  const response = await MovieController.list(limit, page);
  res.json({
    status: "Success",
    payload: response,
  });
});

router.get("/:id", async (req: TDeleteByIdRequest, res: Response) => {
  const { id } = req.params;
  const response = await MovieController.getById(id);
  res.json({
    status: "Success",
    payload: response,
  });
});


router.post("/createNew", async (req: TPostNewRequest, res: Response) => {
  const movie = req.body;
  try {
    const response = await MovieController.create(movie);
    res.json({
      status: "Success",
      payload: response,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      error: error.message,
    });
  }
});

router.put("/update/:id", async (req: TUpdateByIdRequest, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  const response = await MovieController.updateById(id, update);

  res.json({
    status: "Success",
    payload: response,
  });
});

router.put(
  "/addTorrent/:id",
  async (req: TAddTorrentRequest, res: Response) => {
    const { id } = req.params;
    const torrent = req.body;
    try {
      const { result, newTorrentId } = await MovieController.addTorrent(id, torrent);
      res.json({
        status: "Success",
        payload: {
          result,
          newTorrentId
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "Error",
        error: error.message,
      });
    }
  }
);

router.delete("/delete/:id", async (req: TDeleteByIdRequest, res: Response) => {
  const { id } = req.params;

  const response = await MovieController.deleteById(id);
  res.json({
    status: "Success",
    payload: response,
  });
});

router.delete("/clear", async (req, res) => {
  await MovieController.clear();
  await TorrentController.clear();
  res.json({
    "status": "OK"
  })
});

export default router;
