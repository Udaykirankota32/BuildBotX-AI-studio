import api from './api.js';

const USERS_KEY = 'bbx_users';
const SESSION_KEY = 'bbx_session';

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const writeSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

const readSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const register = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    const data = response.data.data;
    writeSession({ token: data.token, user: data.user });
    return data;
  } catch (error) {
    if (error?.response) {
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    const existing = users.find((u) => u.email === normalizedEmail);

    if (existing) {
      const duplicateError = new Error('Email already registered.');
      duplicateError.response = { data: { message: 'Email already registered.' } };
      throw duplicateError;
    }

    const user = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    users.push(user);
    writeUsers(users);

    const data = {
      token: `local-token-${Date.now()}`,
      user: { id: user.id, name: user.name, email: user.email },
    };
    writeSession(data);
    return data;
  }
};

const emailLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data.data;
    writeSession({ token: data.token, user: data.user });
    return data;
  } catch (error) {
    if (error?.response) {
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    const user = users.find((u) => u.email === normalizedEmail && u.password === password);

    if (!user) {
      const loginError = new Error('Invalid email or password.');
      loginError.response = { data: { message: 'Invalid email or password.' } };
      throw loginError;
    }

    const data = {
      token: `local-token-${Date.now()}`,
      user: { id: user.id, name: user.name, email: user.email },
    };
    writeSession(data);
    return data;
  }
};

const getMe = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error) {
    if (error?.response?.status && error.response.status !== 401) {
      throw error;
    }

    const session = readSession();
    if (session?.user) {
      return session.user;
    }

    throw error;
  }
};

const logout = async () => {
  try {
    const response = await api.post('/auth/logout', {});
    localStorage.removeItem(SESSION_KEY);
    return response.data;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return { success: true };
  }
};

export { register, emailLogin, getMe, logout };
