export interface SimplePokemon {
    id:  string;
    name: string;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    imageUrl: string;
    cries: string | null;
    abilities?: string[];
}