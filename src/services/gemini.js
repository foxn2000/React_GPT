const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/";

export const AVAILABLE_MODELS = {
  'gemini-2.0-flash': 'Gemini 2.0 Flash'
};

export const generateChatResponse = async (messages, model = 'gemini-2.0-flash') => {
  try {
    // Gemini APIは最後のメッセージのみを使用
    const lastMessage = messages[messages.length - 1];
    const response = await fetch(`${BASE_URL}models/${model}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{text: lastMessage.content}]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: {
        role: 'assistant',
        content: data.candidates[0].content.parts[0].text
      }
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
