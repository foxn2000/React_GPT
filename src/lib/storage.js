const STORAGE_KEY = 'chat_history';

export const saveToLocalStorage = (conversations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
};

export const deleteConversation = (conversationId) => {
  try {
    const conversations = loadFromLocalStorage();
    const updatedConversations = conversations.filter(
      conv => conv.id !== conversationId
    );
    return saveToLocalStorage(updatedConversations);
  } catch (error) {
    console.error('Failed to delete conversation:', error);
    return false;
  }
};
