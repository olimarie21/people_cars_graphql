import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
{
    people {
        id
        firstName
        lastName
    }
}
`

export const GET_CAR_LIST = gql`
    query personCars($personId: String!) {
        personCars(personId: $personId) {
            id
            personId
            year
            make
            price
            model
        }
    }
`

export const ADD_PERSON = gql`
mutation AddPerson($id: String, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
    }
}
`

export const UPDATE_PERSON = gql`
mutation UpdatePerson($id: String!, $firstName: String, $lastName: String) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
        id 
        firstName
        lastName
    }
}
`

export const DELETE_PERSON = gql`
mutation DeletePerson($id: String!) {
    deletePerson(id: $id) {
        id
        firstName
        lastName
    }
}
`


export const ADD_CAR = gql`
mutation AddCar($id: String!, $year: String!, $make: String!, $price: String!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, price: $price, personId: $personId) {
        id
        year
        make
        price
        personId
        model
    }
}`



export const UPDATE_CAR = gql`
mutation UpdateCar($id: String!, $year: String, $make: String, $price: String, $personId: String) {
    updateCar(id: $id, year: $year, make: $make, price: $price, personId: $personId) {
        id
        year
        make
        price
        model
        personId
    }
}`

export const DELETE_CAR = gql`
mutation DeletePerson($id: String!) {
    deleteCar(id: $id) {
        id
        year
        make
        price
        personId
        model
    }
}`
