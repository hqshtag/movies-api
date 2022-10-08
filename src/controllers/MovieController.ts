import { Movie, Torrent } from "../models";
import { IMovie, ITorrent } from "../commun";
import TorrentController from "./TorrentController";

class MoviesController {
  async welcome(name: string = "Anon") {
    return { message: `Welcome to 🎥 ${name}` };
  }

  async list(limit?: number, page?: number): Promise<any> {
    if (limit && page) {
      return await Movie.find()
        .skip(limit * page - limit)
        .limit(limit)
        .populate("torrents");
    } else return await Movie.find().populate("torrents");
  }
  async create(movie: IMovie): Promise<any> {
    const { title } = movie;
    let unique = await this.verifyUnique(title);
    if (unique) {
      const mv = new Movie(movie);
      return await mv.save();
    } else {
      throw new Error("Movie Already saved");
    }
  }
  async getById(id: string): Promise<any> {
    return await Movie.findById(id);
  }
  async deleteById(id: string): Promise<any> {
    const result = await Movie.findByIdAndDelete(id, {projection: "torrents"});
    if(result && result?.torrents?.length > 0){
      let deletes = [];
      let ids = result.torrents.map(id=>id.toString());
      for (let k = 0; k < ids.length; k++) {
        deletes.push(TorrentController.deleteById(ids[k]));       
      }
      Promise.all(deletes);
    }
    return result;
  }
  async updateById(id: string, update: any): Promise<any> {
    return await Movie.findByIdAndUpdate(id, update, { new: true });
  }

  async addTorrent(id: string, torrent: ITorrent) {
    const doc = new Torrent(torrent);
    const result = await Movie.findByIdAndUpdate(
      id,
      {
        $push: {
          torrents: doc._id,
        },
      },
      {
        new: true,
      }
    );
    if(result){
      await doc.save();
      return {
        result,
        newTorrentId: doc._id
      }
    } else throw new Error('Invalid Movie ID');
    
  }

  async verifyUnique(title: string): Promise<boolean> {
    const movie = await Movie.findOne({ title: title });
    if (movie) {
      return false;
    }
    return true;
  }

  async verifyUniqueBySlug(slug: string): Promise<boolean> {
    const movie = await Movie.findOne({ slug: slug });
    if (movie) {
      return false;
    }
    return true;
  }

  async clear() {
    return await Movie.deleteMany({});
  }
}

export default new MoviesController();
