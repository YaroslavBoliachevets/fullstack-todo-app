// const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:5000/api';
const BASE_URL = 'http://127.0.0.1:8000';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMessage = `Server error: ${res.status}`;

    try {
      const errorData = await res.json();
      if (errorData && errorData.detail) {
        // can be array of mistakes -> string
        errorMessage =
          typeof errorData.detail === 'string'
            ? errorData.detail
            : JSON.stringify(errorData.detail);
      }
    } catch {
      // leave a default message
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${BASE_URL}${url}`);
    return handleResponse<T>(res);
  },
  post: async <T, D = unknown>(url: string, data: D): Promise<T> => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(res);
  },
  patch: async <T, D = unknown>(url: string, data: D): Promise<T> => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(res);
  },

  delete: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${BASE_URL}${url}`, { method: 'DELETE' });
    return handleResponse<T>(res);
  },
};
