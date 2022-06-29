import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../forms/UpdateCar'
import DeleteBtn from '../buttons/DeleteBtn'
import { useState } from 'react'
import { formatCurrency } from '../../formatCurrency'

const getStyles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    }
})

const Car = (props) => {

    const styles = getStyles()
    const [id] = useState(props.id)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [year, setYear] = useState(props.year)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [editCar, setEditCar] = useState(false)

    const handleUpdateCar = () => {
        setEditCar(!editCar)
    }

    const updateVars = (variable, value) => {
        switch (variable) {
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'year':
                setYear(parseInt(value))
                break
            case 'price':
                setPrice(parseFloat(value))
                break
            case 'personId':
                setPersonId(value)
                break
            default:
                break
        }
    }

    return (
        <Card style={styles.container} key={props.index} type='inner' title={`${props.make} ${props.model}`}>
            <div>Year: {props.year}</div>
            <div>Price: {formatCurrency(props.price)}</div>
            <div>
                <EditOutlined key='edit' onClick={handleUpdateCar} />
                <DeleteBtn carId={props.id} />
            </div>
        {editCar ? (
            <UpdateCar
                id={id}
                make={make}
                model={model}
                year={year}
                price={price}
                onBtnClick={handleUpdateCar}
                personId={personId}
                updateVars={updateVars}
                prevOwner={personId}
            />) : null}
        </Card>
    )
}

export default Car 