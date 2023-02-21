import { FC } from 'react'
interface Props {
    name: string;
    language: string;
    averageLifespan: string;
}

export const SpeciesComponent: FC<Props> = ({ name, language, averageLifespan }) => {
    return (
        <li>
            {name}
            <ul>
                <li>language: {language}</li>
                <li>average lifespan: {averageLifespan}</li>
            </ul>
        </li>
    )
}
