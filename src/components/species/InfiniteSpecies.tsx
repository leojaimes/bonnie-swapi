import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { getSpecies } from '../../api/requests';
import { SpeciesResult } from "../../types/species_result";
import { SpeciesComponent } from './SpeciesComponent';

export const InfiniteSpecies = () => {
    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['species'],
        queryFn: ({ pageParam }) => getSpecies(pageParam),
        getNextPageParam: (lastPage: SpeciesResult) => {
            const url = new URL(lastPage.next);
            const searchParams = url.searchParams;
            return searchParams.get('page') || '1'
        }

    })
    return (
        <InfiniteScroll loadMore={() => { fetchNextPage() }} hasMore={hasNextPage} >
            {
                data?.pages.map((page, index) => {
                    return page.results.map((specie, index) => (
                        <SpeciesComponent
                            key={index}
                            averageLifespan={specie.average_lifespan}
                            language={specie.language}
                            name={specie.name}
                        ></SpeciesComponent>
                    ))
                })
            }
        </InfiniteScroll>
    )
}
