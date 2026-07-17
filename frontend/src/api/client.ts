const BASE_URL = 'http://localhost:5000/api';

export const api = {
  get: async (url: string) => {
    const res = await fetch(`${BASE_URL}${url}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  post: async (url: string, data: { title: string }) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
};
