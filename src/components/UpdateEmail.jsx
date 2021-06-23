import React, { useRef, useState } from 'react'
import '../styles/signup.css'
import { Form, Card, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateEmail() {
  const emailRef = useRef()
  const { currentUser, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setError('')
    setLoading(true)

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    
    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update email')
      setLoading(false)
    }).finally(() => {
      console.log('Successfully updated email');
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Email</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/'>Cancel</Link>
      </div>
      {loading && (<div className="loader">
            <Spinner animation="border" />
          </div>)}
    </>
  )
}
