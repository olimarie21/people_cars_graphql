import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE_CARS } from '../../queries'
import Car from '../listItems/Car'

const getStyles = () => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '70%',
        textAlign: 'center'
    }
})

const Details = () => {

    const styles = getStyles()

    let { id } = useParams()
    const personId = id

    const { loading, error, data } = useQuery(GET_PEOPLE_CARS, {
        variables: {
            id, personId
        }
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <>
            <Link 
            style={{alignSelf: 'end', fontSize: '18px'}}
            to={{pathname: `/`}}>
                Go Back Home</Link>

            {data.filterPeople.map(person => (
                <div style={styles.container} key={person.id}>
                    <h1>Owner: {person.firstName} {person.lastName}</h1>
                    {data.filterCars.map(car => (
                        <Car
                            key={car.id}
                            make={car.make}
                            model={car.model}
                            year={car.year}
                            price={car.price}
                            id={car.id}/>
                    ))}
                </div>
            ))}
        </>
    )
}

export default Details