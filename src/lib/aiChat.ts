export async function replyToChat(input: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    })

    const data = await response.json()

    if (!response.ok) {
      return data.reply || 'Sorry, I could not process your message right now.'
    }

    return data.reply
  } catch (error) {
    console.error('Chatbot API error:', error)
    return 'I cannot connect to the AI server right now. Please try again.'
  }
}