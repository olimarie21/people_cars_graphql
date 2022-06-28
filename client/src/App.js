import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import 'antd/dist/antd.min.css'
import People from '../src/components/lists/People'
import AddPerson from '../src/components/forms/AddPerson'
import Header from './components/layout/Header'


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/',
  cache: new InMemoryCache()
})

const App = () => {


  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Header/>
        <AddPerson/>
        <People/>
      </div>
    </ApolloProvider>  
  );
}

export default App;
