import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Form, Input, Button, Select } from 'antd'
import { UPDATE_CAR, GET_PEOPLE, GET_CARS } from '../../queries'

const { Option } = Select

const getStyles = () => ({
    form: {
        display: 'flex',
        justifyContent: 'start',
        margin: '12px auto',
        rowGap: '12px'
    }
})

const UpdateCar = (props) => {
    const styles = getStyles()

    const [id] = useState(props.id)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [year, setYear] = useState(props.year)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [updateCar] = useMutation(UPDATE_CAR)
    const [selected, setSelected] = useState(false)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    
    const onCompletion = () => {
        updateCar({
            variables: {
                id,
                make,
                model, 
                year,
                price,
                personId
            },
            update: (proxy, { data: { updateCar } }) => {
                const data = proxy.readQuery({ query: GET_CARS })
                proxy.writeQuery({
                query: GET_CARS, 
                data: {
                    ...data,
                    cars: [...data.cars, updateCar]
                }
                })
            }
    })

        props.onBtnClick()
    }

    const updateVars = (variable, value) => {
        props.updateVars(variable, value)
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

    const handleChange = (value) => {
        setPersonId(value)
        setSelected(true)
    }

    return (
        <Form
        form={form}
        name='update-car-form'
        layout='inline'
        onFinish={onCompletion}
        style={styles.form}
        >
        <Form.Item name='make'>
            <Input placeholder='i.e. Toyota'
                type={'text'}
                onChange={e => updateVars('make', e.target.value)}  
            />
        </Form.Item>
        <Form.Item name='model'>
            <Input placeholder='i.e. Corolla' 
                type={'text'}
                onChange={e => updateVars('model', e.target.value)}
            />
        </Form.Item>
        <Form.Item name='year'>
            <Input placeholder='i.e. 2020'
                type={'number'}
                onChange={e => updateVars('year', e.target.value)}
            />
        </Form.Item>

        <Form.Item name='price'>
            <Input placeholder='i.e. $17000' 
                onChange={e => updateVars('price', e.target.value)}
            />
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
                disabled={(!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('year') 
                && !form.isFieldTouched('price') && !selected) || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                Update Car
            </Button>
            )}
        </Form.Item>
        <Button onClick={props.onBtnClick}>Cancel</Button>
        </Form>
    )
    }

export default UpdateCar
