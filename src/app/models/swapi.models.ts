export interface IPersonResponse {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starchips: string[],
    created: string,
    edited: string,
    url: string,
}

export interface IPeopleListResponse {
    count: number,
    next: string,
    previous: string,
    results: IPersonResponse[],
}
