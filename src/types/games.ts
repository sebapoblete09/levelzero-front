
type SubItem = {
    id: number;
    name: string;
}

export type company = {
    id: number;
    company: string;
}
//Datos de un juego en especifico
export type Game = {
    id: number;
    name: string;
    summary: string | null;
    cover: Cover | null;
    first_release_date: number | null;
    genres: SubItem[];
    platforms: SubItem[];
    involved_companies: company[];
};

//Portada del juego
export type Cover = {
    url: string;
}

//Card de un juego que se mostrara al buscar
export type GameCard = {
    id: number;
    name: string;
    cover: Cover | null;
}


//Lista de juegos obtenida de la API de FastAPI
export type SearchGame = {
    query: string;
    count: number;
    results: GameCard[];

}