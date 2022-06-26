import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'
import { people, cars } from './peopleCarsScheme'

const typeDefs = gql`
    type Person {
        id: String!
        firstName: String
        lastName: String
    }
    
    type Car {
        id: String!
        year: String
        make: String
        price: String
        personId: String!
    }

    type Query {
        person(id: String!): Person
        people: [Person]
        personCars(personId: String!): [Car]
        car(id: String!): Car
        cars: [Car]
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        updatePerson(id: String!, firstName: String, lastName: String): Person
        deletePerson(id: String!): Person

        addCar(id: String!, year: String!, make: String!, price: String!, personId: String!): Car
        updateCar(id: String!, year: String, make: String, price: String, personId: String): Car
        deleteCar(id:String!): Car
    }
`

const resolvers = {
    Query: {
        people: () => {
            return people
        },
        person(parent, args, context, info) {
            return find(people, {id: args.id})
        },
        personCars(parent, args, context, info) {
            return cars.filter(car => car.personId === args.personId)
        },
        cars: () => cars,
        car(parent, args, context, info) {
            return find(cars, {id: args.id})
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

            if(args.firstName) { 
                person.firstName = args.firstName 
            } if(args.lastName) {
                person.lastName = args.lastName
            }

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

            if(args.year) { 
                car.year = args.year 
            } if(args.make) {
                car.make = args.make
            } if(args.model) {
                car.model = args.model
            } if(args.price) {
                car.price = args.price
            } if(args.personId) {
                car.personId = args.personId
            }

            return car
        },
        deleteCar(root, args) {
            const deletedCar = find(cars, {id: args.id})
            if(!deletedCar) {
                throw new Error(`No car with ${args.id} found.`)
            }

            remove(cars, {id: args.id})

            return deletedCar
        }
    }
}

export { typeDefs, resolvers }