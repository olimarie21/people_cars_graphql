import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import DeleteBtn from '../buttons/DeleteBtn'
import { GET_CAR_LIST } from '../../queries'
import { useQuery } from '@apollo/client'
import Car from './Car'


const getStyles = () => ({
  personCard: {
    width: '500px'
  }
})

const Person = props => {
    const styles = getStyles()
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)

    const handleClick = () => {
        setEditMode(!editMode)
    }

    const personId = props.id
    const { loading, error, data } = useQuery(GET_CAR_LIST, {
        variables: {personId}
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    console.log('personCars', data.personCars)

    const updateVars = (variable, value) => {
        switch (variable) {
        case 'firstName':
            setFirstName(value)
            break
        case 'lastName':
            setLastName(value)
            break
        default:
            break
        }
    }

    return (
        <div>
        <Card
        extra={<a href="#">Learn More</a>}
        title={`${firstName} ${lastName}`}
        actions={[
            <EditOutlined key='edit' onClick={handleClick} />,
            <DeleteBtn id={id} />
        ]}
        style={styles.personCard}
        >
        {editMode ? (
            <UpdatePerson
            id={props.id}
            firstName={props.firstName}
            lastName={props.lastName}
            onClick={handleClick}
            updateVars={updateVars}
            onBtnClick={handleClick}
            />
            ) : ( null )} 
        {data.personCars.map((car, index) => (
            <Car
                key={index}
                make={car.make}
                model={car.model}
                year={car.year}
                price={car.price}
                id={car.id}
            />
        ))}
        </Card>
        </div>
    )
}

export default Person