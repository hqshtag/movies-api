import app from "../app";
import request from 'supertest';
import mongoose from "mongoose";


beforeAll(async () => {
  await mongoose.connect("mongodb+srv://admin:root@coster.weyyk07.mongodb.net/movies?retryWrites=true&w=majority");
})
/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});

const endpoint = "/v1/movies";
const api = request(app);


describe("Movies API Endpoints", () => {
  it("GET /v1/movies?=username - Returns a welcome message with username [200]", async () => {
    const testusername = "unit-test";
    const response = await api.get(`${endpoint}?username=${testusername}`);
      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('Success');
      expect(response.body.payload.message).toEqual(`Welcome to 🎥 ${testusername}`)

  });

  let ID = '';

  it("POST /v1/movies/createNew - Create a new movie [200]", async () => {
    const response = await api.post(`${endpoint}/createNew`).send({
      "title": "The Others",
      "rating": 2
    });
    expect(response.status).toEqual(200);
    expect(response.body.payload).toHaveProperty("_id");
    ID= response.body.payload._id;
  })

  
  it("POST /v1/movies/createNew - Existing Movie Error [400]", async () => {
    const response = await api.post(`${endpoint}/createNew`).send({
      "title": "The Others",
      "rating": 8
    });
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Movie Already saved");
  })

  it("GET /v1/movies/getAll - Load Movies from the database [200]", async () => {
    const limit = 1;
    const response = await api.get(`${endpoint}/getAll?page=1&limit=${limit}`);
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('Success');
    expect(response.body.payload.length).toEqual(limit);
  })


  it("GET /v1/movies/:id - Get Movie by ID [200]", async () => {
    const response = await api.get(`${endpoint}/${ID}`);
    expect(response.status).toEqual(200);
    expect(response.body.payload).toHaveProperty('_id');
  })

  it("PUT /v1/movies/update/:id - Update movie [200]", async () => {
    const response = await api.put(`${endpoint}/update/${ID}`).send({
      "description_intro": "The Others is a 2001 English-language Spanish gothic supernatural psychological horror film"
    })
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("Success");
    expect(response.body.payload).toHaveProperty('description_intro');
  })

  let newTorrentId = '';
  it("PUT /v1/movies/addTorrent/:id - Add Torrent to a Movie [200]", async () => {
    const response = await api.put(`${endpoint}/addTorrent/${ID}`).send({
      "url": "ut://unit-test-torrent",
      "hash": "fakehashcode8988889415"
    });
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("Success");
    expect(response.body.payload).toHaveProperty('result');
    expect(response.body.payload).toHaveProperty('newTorrentId');
    newTorrentId = response.body.payload.newTorrentId;
  })

  it("GET /v1/movies/:id - Load Single Movie by ID [200]", async ()=>{
    const response = await api.get(`${endpoint}/${ID}`);
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("Success");
    expect(response.body.payload).toHaveProperty('torrents');
    expect(response.body.payload.torrents).toEqual(expect.arrayContaining([newTorrentId]));
  })

  it("PUT /v1/movies/addTorrent/:id - Torrent should have a unique hash [400]", async () => {
    const response = await api.put(`${endpoint}/addTorrent/${ID}`).send({
      "url": "ut://unit-test-torrent2",
      "hash": "fakehashcode8988889415"
    });
    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual("Error");
  })


  it("DELETE /v1/movies/delete/:id - Delete the newly created Movie and it's torrents [200]", async () => {
    const resp = await api.delete(`${endpoint}/delete/${ID}`);
    expect(resp.status).toEqual(200);
    expect(resp.body.status).toEqual("Success");
    expect(resp.body.payload).toHaveProperty("_id");
    expect(resp.body.payload._id).toEqual(ID);
  })

 

});
