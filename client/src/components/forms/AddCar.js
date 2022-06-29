import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Form, Input, Button, Select } from 'antd'
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../queries'
import { v4 as uuidv4 } from 'uuid'

const { Option } = Select

const getStyles = () => ({
    formItem: {
        marginBottom: '20px',
        justifyContent: 'center'
    }
})

const AddCar = (props) => {
    const styles = getStyles()

    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
    const [personId, setPersonId] = useState('')
    const [selected, setSelected] = useState(false)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const onCompletion = values => {
        let { make, model, year, price } = values
        year = parseInt(year)
        price = parseFloat(price)

        addCar({
        variables: {
            id,
            make,
            model,
            year,
            price,
            personId
        },
        update: (proxy, { data: { addCar } }) => {
            const data = proxy.readQuery({ query: GET_CARS })
            proxy.writeQuery({
            query: GET_CARS, 
            data: {
                ...data,
                cars: [...data.cars, addCar]
            }
            })
        }
        })
    }

    const handleChange = (value) => {
        setPersonId(value); 
        setSelected(true)
    }

    return (
        <>
        <h2>Add Car</h2>
        <Form
        form={form}
        name='add-car-form'
        layout='inline'
        size='large'
        onFinish={onCompletion}
        style={{ width: '90%', marginBottom: '40px', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #00000080' }}
        >
            <Form.Item
                style={styles.formItem}
                name='make'
                rules={[{ required: true, message: 'Please input the make of the car.' }]}
            >
                <Input placeholder='i.e. Toyota' type={'text'}/>
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please input the model of the car.' }]}
            >
                <Input placeholder='i.e. Corolla' type={'text'}/>
            </Form.Item>
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please input the year the car was manufactured.' }]}
            >
                <Input placeholder='i.e. 2020' type={'number'}/>
            </Form.Item>

            <Form.Item
                name='price'
                rules={[{ message: 'Please input the price of the car.' }]}
            >
                <Input placeholder='i.e. $17000'/>
            </Form.Item>

            <Select
                defaultValue={{ value: 'car owner', label: 'Car Owner' }}
                style={{ width: 120 }}
                onChange={(e) => handleChange(e)}
            >
                {data.people.map(person => (
                    <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                ))}
            </Select>
            <Form.Item shouldUpdate={true}>
                {() => (
                <Button
                    style={{ marginLeft: '16px' }}
                    type='primary'
                    htmlType='submit'
                    disabled={(!form.isFieldsTouched(true) && !selected) || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                    Add Car
                </Button>
                )}
            </Form.Item>
        </Form>
        </>
    )
    }

export default AddCar
