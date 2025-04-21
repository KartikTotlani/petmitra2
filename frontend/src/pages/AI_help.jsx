import React, { useState } from 'react'
import { assets } from '../assets/assets'

const AIHelp = () => {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  // Function to handle AI Help query submission
  const handleQuerySubmit = async (e) => {
    e.preventDefault()
    if (!query) return

    setLoading(true)
    // For now, we're simulating an AI response. Replace this with your actual API call or AI functionality.
    setTimeout(() => {
      // Simulated AI response
      setResponse(`AI response to your query: "${query}"`)
      setLoading(false)
      setQuery('')
    }, 1500)
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold text-center text-primary mb-6'>AI Help</h1>

      <div className='text-lg text-gray-700'>
        <p className='mb-4'>
          Welcome to our AI-powered help section. If you have any questions or need assistance, feel free to ask below, and 
          our AI will help guide you. Whether you need medical information, veterinary advice, or general inquiries, we're here 
          to assist!
        </p>

        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-primary mb-4'>Ask AI</h2>
          <form onSubmit={handleQuerySubmit} className='flex flex-col items-center'>
            <textarea
              placeholder='Type your question here...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={5}
              className='w-full p-3 border rounded-md mb-4 resize-none'
              required
            />
            <button
              type='submit'
              className='bg-primary text-white px-8 py-3 rounded-full font-light'
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Ask AI'}
            </button>
          </form>
        </div>

        {response && (
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-primary mb-4'>AI Response</h2>
            <p className='bg-gray-100 p-4 border rounded-md'>{response}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIHelp
