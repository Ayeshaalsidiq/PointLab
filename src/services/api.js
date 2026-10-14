/**
 * PointLab API Client
 * Mengintegrasikan PointLab dengan backend_ngolab (Membership, Points, Promos, & Orders)
 * Sesuai spesifikasi Docs/AYESHA.md & Docs/NURDIN.md
 */

const BASE_URL = (import.meta.env?.VITE_API_BASE_URL || '')
  .replace(/\/+$/, '')
  .replace(/\/api$/i, '');

/**
 * Helper untuk mengambil token auth dari storage
 */
export const getStoredToken = () => {
  return localStorage.getItem('pointlab_token') || null;
};

/**
 * Helper untuk menyimpan token auth ke storage
 */
export const setStoredToken = (token) => {
  if (token) {
    localStorage.setItem('pointlab_token', token);
  } else {
    localStorage.removeItem('pointlab_token');
  }
};

/**
 * Universal request function dengan penanganan token otomatis
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`.replace(/\/api\/api(\/|$)/, '/api$1');
  const headers = { ...options.headers };

  const token = getStoredToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Jika bukan FormData, set default Content-Type JSON
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error(`[API Network Error] ${options.method || 'GET'} ${url}:`, error);
    throw new Error('Gagal terhubung ke server backend PointLab. Periksa koneksi backend.');
  }

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  } else {
    const text = await response.text().catch(() => '');
    data = { message: text };
  }

  if (!response.ok) {
    const message = data?.message || data?.error?.message || data?.error || `HTTP error ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  // ==========================================
  // AUTENTIKASI & AKUN
  // ==========================================
  async login(identifier, password) {
    const payload = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
    if (payload.token) {
      setStoredToken(payload.token);
    }
    return payload;
  },

  async register({ nama, name, nim, phone, phone_number, password }) {
    const payload = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        nama: nama || name,
        nim,
        phone: phone || phone_number,
        password,
      }),
    });
    if (payload.token) {
      setStoredToken(payload.token);
    }
    return payload;
  },

  logout() {
    setStoredToken(null);
    localStorage.removeItem('pointlab_user');
  },

  async getProfile() {
    return await apiRequest('/api/users/profile');
  },

  async updateProfile(profileData) {
    return await apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  async changePassword(currentPassword, newPassword) {
    return await apiRequest('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword: newPassword || currentPassword,
      }),
    });
  },

  async updatePasswordOnly(newPassword) {
    return await apiRequest('/api/users/password', {
      method: 'PUT',
      body: JSON.stringify({ password: newPassword }),
    });
  },

  async uploadAvatar(fileOrFormData) {
    let body = fileOrFormData;
    if (fileOrFormData instanceof File) {
      const formData = new FormData();
      formData.append('avatar', fileOrFormData);
      body = formData;
    }
    return await apiRequest('/api/users/avatar', {
      method: 'POST',
      body,
    });
  },

  // ==========================================
  // POIN & LOYALTY BALANCE
  // ==========================================
  async getCoinBalance() {
    return await apiRequest('/api/coins/balance');
  },

  async getCoinHistory() {
    return await apiRequest('/api/coins/history');
  },

  // ==========================================
  // KATALOG PROMO & PENUKARAN (REDEEM)
  // ==========================================
  async getPromos() {
    return await apiRequest('/api/promos');
  },

  async redeemPromo(promoId) {
    return await apiRequest('/api/promos/redeem', {
      method: 'POST',
      body: JSON.stringify({ promo_id: promoId }),
    });
  },

  async claimPromoCode(code) {
    return await apiRequest('/api/promos/claim-code', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  // ==========================================
  // VOUCHER SAYA
  // ==========================================
  async getMyVouchers() {
    return await apiRequest('/api/vouchers/my-vouchers');
  },

  async getVoucherDetail(voucherId) {
    return await apiRequest(`/api/vouchers/${voucherId}`);
  },

  // ==========================================
  // LOYALTY MEMBER ENDPOINTS (/api/members/{id}/...)
  // ==========================================
  async getMember(id = 'me') {
    return await apiRequest(`/api/members/${id}`);
  },

  async getMemberTier(id = 'me') {
    return await apiRequest(`/api/members/${id}/tier`);
  },

  async getMemberPoints(id = 'me') {
    return await apiRequest(`/api/members/${id}/points`);
  },

  async getMemberHistory(id = 'me') {
    return await apiRequest(`/api/members/${id}/history`);
  },

  async getMemberVouchers(id = 'me') {
    return await apiRequest(`/api/members/${id}/vouchers`);
  },

  // ==========================================
  // REWARDS LOYALTY (/api/rewards)
  // ==========================================
  async getRewards() {
    return await apiRequest('/api/rewards');
  },

  async getRewardDetail(id) {
    return await apiRequest(`/api/rewards/${id}`);
  },

  async redeemReward(rewardId) {
    return await apiRequest('/api/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ reward_id: rewardId, promo_id: rewardId }),
    });
  },

  // ==========================================
  // MENU KANTIN & PESANAN (WARMINGUP)
  // ==========================================
  async getMenus() {
    return await apiRequest('/api/menus');
  },

  async getMyOrders() {
    return await apiRequest('/api/orders/my-orders');
  },
};

export default api;

