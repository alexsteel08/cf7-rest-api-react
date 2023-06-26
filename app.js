import React, { useState } from 'react'
import axios from 'axios'

const MessageForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await axios.post(
        'https://react.test-area.pp.ua/wp-json/contact-form-7/v1/contact-forms/154/feedback',
        {
          yourname: name,
          youremail: email,
          yourmessage: message,
        },
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      )

      console.log(response.data) // Опрацьовуємо відповідь від сервера

      // Скидаємо поля форми після успішної відправки
      setName('')
      setEmail('')
      setMessage('')
      setIsSent(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleMessageChange = event => {
    setMessage(event.target.value)
  }

  return (
    <div>
      <h2>Form</h2>
      {isSent ? (
        <p>Message sent!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
            ></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  )
}

export default MessageForm
