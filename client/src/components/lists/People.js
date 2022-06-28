import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'
import { List } from 'antd'
import Person from '../listItems/Person'


const getStyles = () => ({
        people: {
        display: 'flex',
        justifyContent: 'center'
        }
    })

const People = () => {

    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    console.log('people', data.people)

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.people}>
            {data.people.map((person, index) => (
                <List.Item key={index}>
                    <Person
                        key={person.id}
                        firstName={person.firstName}
                        lastName={person.lastName} 
                        id={person.id}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default People 