const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const AuthService = {
  login: async (username: string, password: string): Promise<{ success: boolean; isAdmin: boolean; name: string; message?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData.message || 'Login failed');
        return { success: false, isAdmin: false, name: '', message: errorData.message || 'Login failed' };
      }

      const { access_token, isAdmin } = await response.json();
      const decodedToken = AuthService.decodeToken(access_token);
      const userName = decodedToken?.username || 'Unknown';

      // Store token, admin status, and user's name in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', access_token);
        localStorage.setItem('isAdmin', isAdmin.toString());
        localStorage.setItem('userName', userName);
      }

      return { success: true, isAdmin: isAdmin || false, name: userName };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, isAdmin: false, name: '', message: 'Login failed' };
    }
  },

  signup: async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup error:', errorData.message || 'Signup failed');
        return { success: false, message: errorData.message || 'User already exists!' };
      }

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Signup failed' };
    }
  },


  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userName');
    }
  },

 
  getToken: (): string | null => (typeof window !== 'undefined' ? localStorage.getItem('token') : null),


  decodeToken: (token: string): { [key: string]: any } | null => {
    try {
      // Decode JWT payload
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Token decode error:', e);
      return null;
    }
  },

  getUserName: (): string | null => (typeof window !== 'undefined' ? localStorage.getItem('userName') : null),
};

export default AuthService;
