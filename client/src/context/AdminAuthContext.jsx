import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('aaryan_admin_token'));
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('aaryan_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = Boolean(adminToken);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAdminToken(data.token);
        setAdminUser(data.user);
        localStorage.setItem('aaryan_admin_token', data.token);
        localStorage.setItem('aaryan_admin_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid credentials' };
      }
    } catch (err) {
      console.error("Login request error:", err);
      return { success: false, message: 'Server connection error. Please try again.' };
    }
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('aaryan_admin_token');
    localStorage.removeItem('aaryan_admin_user');
  };

  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    };
  };

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      adminUser,
      adminToken,
      login,
      logout,
      getAuthHeaders
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
