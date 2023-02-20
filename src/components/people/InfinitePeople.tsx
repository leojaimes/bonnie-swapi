import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from "react-infinite-scroller";
import { getPeople } from "../../api/requests";

export const InfinitePeople = () => {

    const fetchProjects = async ({ pageParam = 0 }) => {
        const res = await fetch('/api/projects?cursor=' + pageParam)
        return res.json()
    }

    const { data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: ({ pageParam = 1 }) => { return getPeople(pageParam) }, //siempre debe retornar la funcion de la consulta
        getNextPageParam: (lastPage, pages) => lastPage.next, //la proxima consulta que tiene que hacer pero esta dentro del return de la queryFn
    })

    return (
        <InfiniteScroll loadMore={() => { }} />
    )
}
