import { Torrent } from "../models";

class TorrentController {
  async list(): Promise<any> {
    return await Torrent.find();
  }
  async listByPeers(): Promise<any> {
    return await Torrent.find().sort("peers").exec();
  }
  async listBySeeds(): Promise<any> {
    return await Torrent.find().sort("seeds").exec();
  }
  async deleteById(id: string): Promise<any> {
    return await Torrent.findByIdAndDelete(id);
  }
  async clear(): Promise<any> {
    return await Torrent.deleteMany({});
  }
}

export default new TorrentController();
