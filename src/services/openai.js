import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const AVAILABLE_MODELS = {
  'gpt-4o-mini': 'GPT-4o Mini',
  'gpt-4o': 'GPT-4o',
  'chatgpt-4o-latest': 'ChatGPT-4o Latest'
};

export const generateChatResponse = async (messages, model = 'gpt-4o-mini') => {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      success: true,
      data: response.choices[0].message
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
