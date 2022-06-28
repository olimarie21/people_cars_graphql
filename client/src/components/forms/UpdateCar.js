import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button, Select } from 'antd'
import { UPDATE_CAR } from '../../queries'

const { Option } = Select;

const UpdateCar = (props) => {
    const [id] = useState(props.id)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [year, setYear] = useState(props.year)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [updateCar] = useMutation(UPDATE_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onCompletion = () => {
        updateCar({
            variables: {
                id,
                make,
                model, 
                year,
                price,
                personId
            }
        })

        props.onClick()
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
                setYear(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'personId':
                setPersonId(value)
                break
            default:
                break
        }
      }

    return (
        <Form
        form={form}
        name='update-car-form'
        layout='inline'
        onFinish={onCompletion}
        >
        <Form.Item
            name='make'
            rules={[{ required: true, message: 'Please input the make of the car.' }]}
        >
            <Input placeholder='i.e. Toyota'
                onChange={e => updateVars('make', e.target.value)}  
            />
        </Form.Item>
        <Form.Item
            name='model'
            rules={[{ required: true, message: 'Please input the model of the car.' }]}
        >
            <Input placeholder='i.e. Corolla' 
                onChange={e => updateVars('model', e.target.value)}
            />
        </Form.Item>

        <Form.Item
            name='year'
            rules={[{ required: true, message: 'Please input the year the car was manufactured.' }]}
        >
            <Input placeholder='i.e. 2020' 
                onChange={e => updateVars('year', e.target.value)}
            />
        </Form.Item>

        <Form.Item
            name='price'
            rules={[{ required: true, message: 'Please input the price of the car.' }]}
        >
            <Input placeholder='i.e. $17000' 
                onChange={e => updateVars('price', e.target.value)}
            />
        </Form.Item>

        <Select
                labelInValue
                defaultValue={{ value: 'car owner', label: 'Car Owner' }}
                style={{ width: 120 }}
                onChange={e => updateVars('personId', e.target.value)}
            >
            <Option value="test">Test</Option>
        </Select>
        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type='primary'
                htmlType='submit'
                disabled={
                    (!form.isFieldTouched('make') && !form.isFieldTouched('model')) && !form.isFieldTouched('year')
                    && !form.isFieldTouched('price') && !form.isFieldTouched('personId') ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                }
            >
                Update Contact
            </Button>
            )}
        </Form.Item>
        <Button onClick={props.onBtnClick}>Cancel</Button>
        </Form>
    )
    }

export default UpdateCar
