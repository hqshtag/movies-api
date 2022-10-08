import { ITorrent } from "./commun";



export function generateSlug(title: string){
    return title.toLowerCase().replace(' ','-');
}

export function isTorrent(object: any): object is ITorrent {
    return 'hash' in object;
}
