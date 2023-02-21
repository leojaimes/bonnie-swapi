import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios';
import InfiniteScroll from "react-infinite-scroller";
import { getPeople } from "../../api/requests";
import { PeopleResult, Person, Result } from '../../types/people_results';
import { PersonComponent } from './PersonComponent';

export const InfinitePeople = () => {

    const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetching } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: ({ pageParam }) => getPeople(pageParam), //siempre debe retornar la funcion de la consulta
        getNextPageParam: (lastPage, pages) => {
            //esta funcion debe devolver el proximo parametro para hacer la consulta
            const url = new URL(lastPage.next);
            const searchParams = url.searchParams;
            return searchParams.get('page') || '1'
        },
        onError: (err: AxiosError) => err,
    })

    if (isLoading) {
        return (
            <div className='loading'>Loading...</div>
        )
    }
    if (isError) {
        return (
            <h1>{error.message}</h1>
        )
    }
    return (
        <>
            {isFetching && <div className='loading'>Fetching...</div>}
            <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
                {
                    data?.pages.map((item: PeopleResult, index) => {
                        return item.results.map((personData: Result, index) => (
                            <PersonComponent
                                key={index}
                                person={{ name: personData.name, eyeColor: personData.eye_color, hairColor: personData.hair_color }}
                            ></PersonComponent>
                        ))
                    })
                }
            </InfiniteScroll>


        </>

    )
}
