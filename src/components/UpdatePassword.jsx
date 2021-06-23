import React, { useRef, useState } from 'react'
import '../styles/signup.css'
import { Form, Card, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    const promises = []
    setError('')
    setLoading(true)

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update password')
      setLoading(false)
    }).finally(() => {
      console.log('Successfully updated password');
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} autoComplete="on" placeholder="Leave blank to keep the same"></Form.Control>
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} autoComplete='on' placeholder="Leave blank to keep the same"></Form.Control>
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
