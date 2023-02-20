import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from "react-infinite-scroller";
import { getPeople } from "../../api/requests";
import { PeopleResult, Person, Result } from '../../types/people_results';
import { PersonComponent } from './PersonComponent';

export const InfinitePeople = () => {

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: getPeople, //siempre debe retornar la funcion de la consulta
        getNextPageParam: (lastPage, pages) => lastPage.next || undefined, //la proxima consulta que tiene que hacer pero esta dentro del return de la queryFn
    })

    if (isLoading) {
        return (
            <div className='loading'>Loading...</div>
        )
    }
    return (
        <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
            {
                data?.pages.map((item: PeopleResult, index) => (
                    <>
                        {
                            item.results.map((personData: Result, index) => (
                                <PersonComponent
                                    key={index}
                                    person={{ name: personData.name, eyeColor: personData.eye_color, hairColor: personData.hair_color }}
                                ></PersonComponent>
                            ))
                        }
                    </>
                ))
            }
        </InfiniteScroll>
    )
}
