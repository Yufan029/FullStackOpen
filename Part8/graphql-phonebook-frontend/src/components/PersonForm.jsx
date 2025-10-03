import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_PERSONS, CREATE_PERSON } from '../queries'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    // since we have the update call back to update the cache manually, there's no need to refetch everytime
    // refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.errors.map((e) => e.message).join('\n')
      const extensionErrMsg = error.errors
        .map((e) => e.extensions.error.message)
        .join('\n')
      console.log(Object.keys(error))
      console.log('errors:', error.errors)
      console.log('data:', error.data)
      console.log('extensions:', error.extensions)
      console.log('name:', error.name)
      console.log([messages, extensionErrMsg].join('\n'))
      setError([messages, extensionErrMsg].join('\n'))
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        console.log('createPerson update, response data', response.data)
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        }
      })
    },
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name,
        street,
        city,
        phone: phone.length > 0 ? phone : undefined,
      },
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{' '}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{' '}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm
