import { FC } from 'react'
import { Person } from '../../types/people_results';

interface Props {
    person: Person;
}
export const PersonComponent: FC<Props> = ({ person }) => {


    const { name, hairColor, eyeColor } = person
    return (
        <li>
            {name}
            <ul>
                <li>hair: {hairColor}</li>
                <li>eyes: {eyeColor}</li>
            </ul>
        </li>
    )
}
