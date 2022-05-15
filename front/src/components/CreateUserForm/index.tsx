import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import { GET_USER } from "../../App"
import { client } from "../../lib/apollo"

interface IUser {
  createUser: {
    id: string
    name: string
  }
}

const CREATE_USER = gql`
mutation ($name: String!) {
  createUser(name: $name) {
    id
    name
  }
}
`

export const CreateUserForm = () => {
  const [name, setName] = useState("")
  const [createUser, { data, loading, error }] = useMutation<IUser>(CREATE_USER)

  const postUser = async (event: FormEvent) => {
    event.preventDefault()
    // if (!name) return
    try {
      await createUser({
        variables: {
          name
        },
        // refetchQueries: [GET_USER],
        update: (cache, { data }) => {
          const { users } = client.readQuery({ query: GET_USER })
          cache.writeQuery({
            query: GET_USER,
            data: {
              users: [
                ...users,
                data?.createUser
              ]
            }
          })
        },
        onError: (error) => { throw error },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form
        onSubmit={postUser}
      >
        <input
          type="text"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        <button
          type="submit"
        >
          Cadastrar
        </button>

      </form>
    </>
  )
}