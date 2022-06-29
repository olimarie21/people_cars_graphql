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

export const GET_CARS = gql`
{
    cars {
        id
        year
        make
        model
        price
        personId
    }
}
`

export const GET_PEOPLE_CARS = gql`
    query ($personId: String, $id: String) {
        filterCars(personId: $personId) {
            id
            personId
            year
            make
            price
            model
        }
        filterPeople(id: $id) {
            id
            firstName
            lastName
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
mutation AddCar($id: String!, $year: Int!, $make: String!, $price: Float!, $personId: String!, $model: String!) {
    addCar(id: $id, year: $year, make: $make, price: $price, personId: $personId, model: $model) {
        id
        year
        make
        price
        personId
        model
    }
}`



export const UPDATE_CAR = gql`
mutation UpdateCar($id: String!, $year: Int, $make: String, $price: Float, $personId: String, $model: String) {
    updateCar(id: $id, year: $year, make: $make, price: $price, personId: $personId, model: $model) {
        id
        year
        make
        price
        personId
        model
    }
}`

export const DELETE_CAR = gql`
mutation DeleteCar($id: String!) {
    deleteCar(id: $id) {
        id
        year
        make
        price
        personId
        model
    }
}`

export const DELETE_CARS = gql`
mutation DeleteCar($personId: String!) {
    deleteCar(personId: $personId) {
        id
        year
        make
        price
        personId
        model
    }
}`
