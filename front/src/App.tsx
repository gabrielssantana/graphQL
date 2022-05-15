import { gql, useQuery } from "@apollo/client"
import { CreateUserForm } from "./components/CreateUserForm"

export interface IUsers {
  users: {
    id: string
    name: string
  }[]
}

export const GET_USER = gql`
query {
  users {
    id
    name
  }
}
`

const App = () => {
  const {
    data,
    loading
  } = useQuery<IUsers>(GET_USER)

  if (loading) return <></>

  return (
    <>
      <ul>
        {
          data?.users.map(({ name }, index) => (
            <li key={index.toString()}>{name}</li>
          ))
        }
      </ul>
      <CreateUserForm />
    </>
  )
}

export default App
