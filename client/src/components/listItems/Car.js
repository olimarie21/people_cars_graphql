import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../forms/UpdateCar'
import DeleteBtn from '../buttons/DeleteBtn'
import { useState } from 'react'


const Car = (props) => {

    const [editCar, setEditCar] = useState(false)

    const handleUpdateCar = () => {
        setEditCar(!editCar)
    }

    return (
        <Card key={props.index} type='inner' title={`${props.make} ${props.model}`}>
            <div>Year: {props.year}</div>
            <div>Price: ${props.price}</div>
            <EditOutlined key='edit' onClick={handleUpdateCar} />,
            <DeleteBtn id={props.id} />
        {editCar ? (
            <UpdateCar/>) : null}
        </Card>
    )
}

export default Car 