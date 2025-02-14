const BASE_URL = "https://api.groq.com/openai/v1/chat/completions";

export const AVAILABLE_MODELS = {
  'llama-3.3-70b-versatile': 'Llama 3.3 70B Versatile'
};

export const generateChatResponse = async (messages, model = 'llama-3.3-70b-versatile') => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.choices[0].message
    };
  } catch (error) {
    console.error('Groq API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
