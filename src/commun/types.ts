import { Request } from "express";
import {IMovie, ITorrent , IListAllRequestQuery } from "./interfaces";

export type TListAllRequest = Request<{}, {}, {}, IListAllRequestQuery>
export type TPostNewRequest = Request<{},{},IMovie,{}>;
export type TUpdateByIdRequest = Request<{id:string},{},IMovie,{}>;
export type TAddTorrentRequest = Request<{id:string},{},ITorrent,{}>;
export type TDeleteByIdRequest = Request<{id:string},{},{},{}>;
