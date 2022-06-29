import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import 'antd/dist/antd.min.css'
import { Routes, Route } from "react-router-dom"
import People from '../src/components/lists/People'
import Details from './components/detail/Details'


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
      <Routes>
        <Route path="/" element={<People/>} />
        <Route path="/:id" element={<Details/>}/>
      </Routes>
      </div>
    </ApolloProvider>  
  );
}

export default App;
