import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PEOPLE } from '../../queries'

const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // disable submit at start
    useEffect(() => {
        forceUpdate({})
    }, [])

    const onCompletion = values => {
        const { firstName, lastName } = values

        addPerson({
        variables: {
            id,
            firstName,
            lastName
        },
        update: (proxy, { data: { addPerson } }) => {
            const data = proxy.readQuery({ query: GET_PEOPLE })
            proxy.writeQuery({
            query: GET_PEOPLE,
            data: {
                ...data,
                people: [...data.people, addPerson]
            }
            })
        }
        })
    }

    return (
        <Form
        form={form}
        name='add-person-form'
        layout='inline'
        onFinish={onCompletion}
        size='large'
        style={{ marginBottom: '40px' }}
        >
        <Form.Item
            name='firstName'
            rules={[{ required: true, message: 'Please input a firstname for the person.' }]}
        >
            <Input placeholder='i.e. Henry' />
        </Form.Item>
        <Form.Item
            name='lastName'
            rules={[{ required: true, message: 'Please input a lastname for the person.' }]}
        >
            <Input placeholder='i.e. Williams' />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type='primary'
                htmlType='submit'
                disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
                }
            >
                Add Contact
            </Button>
            )}
        </Form.Item>
        </Form>
    )
    }

export default AddPerson
