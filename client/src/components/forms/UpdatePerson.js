import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import { UPDATE_PERSON } from '../../queries'

const UpdatePerson = (props) => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [updatePerson] = useMutation(UPDATE_PERSON)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onCompletion = () => {
        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            }
        })

        props.onClick()
        console.log(firstName, lastName)
    }

    const updateVars = (variable, value) => {
        props.updateVars(variable, value)
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
        <Form
        form={form}
        name='update-person-form'
        layout='inline'
        onFinish={onCompletion}
        >
        <Form.Item
            name='firstName'
            rules={[{ required: true, message: 'Please input a firstname for the person.' }]}
        >
            <Input placeholder='i.e. Henry'
                onChange={e => updateVars('firstName', e.target.value)}  
            />
        </Form.Item>
        <Form.Item
            name='lastName'
            rules={[{ required: true, message: 'Please input a lastname for the person.' }]}
        >
            <Input placeholder='i.e. Williams' 
                onChange={e => updateVars('lastName', e.target.value)}
            />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type='primary'
                htmlType='submit'
                disabled={
                    (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
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

export default UpdatePerson
