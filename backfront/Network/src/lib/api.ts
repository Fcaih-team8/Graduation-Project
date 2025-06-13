import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export const fetchDashboardStats = async () => {
  const { data } = await api.get('/stats');
  return data;
};

export const fetchAlerts = async () => {
  const { data } = await api.get('/alerts');
  return data;
};

export const fetchThreats = async () => {
  const { data } = await api.get('/threats');
  return data;
};

export const fetchTrafficData = async () => {
  const { data } = await api.get('/traffic');
  return data;
};

export const fetchBlockedIPs = async () => {
  const { data } = await api.get('/blocked-ips');
  return data;
};

export const fetchSuspiciousPackets = async () => {
  const { data } = await api.get('/suspicious-packets');
  return data;
};