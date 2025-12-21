export const sendMessageToAI = async (
  message: string, 
  endpoint?: string
): Promise<string> => {
  try {
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      return data.response || data.message || "I received your message."
    }

    // Fallback simulated response
    return await simulateAIResponse(message)
  } catch (error) {
    console.error('Error in sendMessageToAI:', error)
    return "Sorry, I'm having trouble processing your request. Please try again."
  }
}

const simulateAIResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        `I understand: "${message}"`,
        `Interesting question about "${message}"`,
        `Let me think about "${message}"...`,
      ]
      resolve(responses[Math.floor(Math.random() * responses.length)])
    }, 1000)
  })
}