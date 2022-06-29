import { gql } from 'apollo-server-express'
import { _, find, filter, remove } from 'lodash'
import { people, cars } from './peopleCarsScheme'

const typeDefs = gql`

    type Person {
        id: String!
        firstName: String!
        lastName: String!
    }
    
    type Car {
        id: String!
        year: Int
        make: String
        price: Float
        personId: String
        model: String
    }

    type Query {
        people: [Person]
        cars: [Car]
        filterCars(personId: String): [Car]
        filterPeople(id: String): [Person]
    }

    type Mutation {
        addPerson(id: String, firstName: String!, lastName: String!): Person
        updatePerson(id: String!, firstName: String, lastName: String): Person
        deletePerson(id: String!): Person

        addCar(id: String!, year: Int!, make: String!, price: Float!, personId: String!, model: String!): Car
        updateCar(id: String!, year: Int, make: String, price: Float, personId: String, model: String): Car
        deleteCar(id:String!): Car
        deleteCars(personId: String!): [Car]
    }
`

const resolvers = {
    Query: {
        people: () => {
            return people
        },
        cars: () => {
            return cars
        },
        filterPeople(parent, args, context, info) {
            return filter(people, ['id', args.id])
        },
        filterCars(parent, args, context, info) {
            return filter(cars, ['personId', args.personId])
        }
    },
    Mutation: {
        addPerson(root, args) {
            const person = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }
            people.push(person)

            return person
        },
        updatePerson(root, args) {
            const person = find(people, {id: args.id})
            if(!person) {
                throw new Error(`No person with ${args.id} found.`)
            }
            
            person.firstName = args.firstName 
            person.lastName = args.lastName

            return person
        },
        deletePerson(root, args) {
            const deletedPerson = find(people, {id: args.id})
            if(!deletedPerson) {
                throw new Error(`No person with ${args.id} found.`)
            }

            remove(people, {id: args.id})

            return deletedPerson
        },
        addCar(root, args) {
            const car = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            }
            cars.push(car)

            return car
        },
        updateCar(root, args) {
            const car = find(cars, {id: args.id})
            if(!car) {
                throw new Error(`No car with ${args.id} found.`)
            }
            
            car.year = args.year 
            car.make = args.make
            car.model = args.model
            car.price = args.price
            car.personId = args.personId

            return car
        },
        deleteCar(root, args) {
            const deletedCar = find(cars, {id: args.id})
            if(!deletedCar) {
                throw new Error(`No car with ${args.id} found.`)
            }

            remove(cars, {id: args.id})

            return deletedCar
        },
        deleteCars(root, args) {
            const deletedCars = filter(cars, ['personId', args.personId])
            remove(cars, ['personId', args.personId])

            return deletedCars
        }
    }
}

export { typeDefs, resolvers }