import { PeopleResult } from '../types/people_results';
import swapiApi from './swapiApi';
import { SpeciesResult } from '../types/species_result';

export const getPeople = async (pageParam = 1): Promise<PeopleResult> => {
    const res = await swapiApi.get<PeopleResult>(`/people?page=${pageParam}`)
    return res.data
}


export const getSpecies = async (): Promise<SpeciesResult> => {
    const res = await swapiApi.get<SpeciesResult>('/species')
    return res.data
}

