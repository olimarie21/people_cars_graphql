import { useMutation } from "@apollo/client"
import { filter } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { GET_PEOPLE, DELETE_PERSON } from '../../queries'

const DeleteBtn = (props) => {

    const id = props.id

    const [deletePerson] = useMutation(DELETE_PERSON, {
        update(cache, { data: { deletePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE })
            cache.writeQuery({
                query: GET_PEOPLE,
                data: { people: filter(people, person => person.id !== deletePerson.id) }
            })
        }
    })
    
    const onClick = () => {
        let confirmation = window.confirm("Are you sure you want to delete this item?")

        if (confirmation) {
            deletePerson({ variables: { id: id } })
        }
    }
    return (
        <DeleteOutlined onClick={onClick} />
    )
}

export default DeleteBtn