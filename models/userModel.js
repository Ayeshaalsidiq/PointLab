/**
 * UserModel - PointLab MVC Model Layer
 * Mengelola data pengguna, autentikasi, profil, dan validasi kredensial.
 */

// In-Memory store untuk fallback data (mendukung persistent state selama server hidup)
const defaultUsers = [
  {
    id: 1,
    nama: "Ayesha Alsidiq",
    nim: "6706210001",
    email: "ayesha@student.telkomuniversity.ac.id",
    phone: "081234567890",
    role: "Mahasiswa",
    tier: "Study Buddy",
    poin: 1250,
    totalPoin: 8450,
    avatar: null,
    passwordHash: "hashed_pwd_pointlab",
    createdAt: "2026-01-15T08:00:00Z"
  }
];

class UserModel {
  constructor() {
    this.users = [...defaultUsers];
  }

  findByNimOrEmail(identifier) {
    if (!identifier) return null;
    const clean = identifier.trim().toLowerCase();
    return this.users.find(u => 
      u.nim.toLowerCase() === clean || 
      u.email.toLowerCase() === clean
    ) || null;
  }

  findById(id) {
    const numId = parseInt(id, 10);
    return this.users.find(u => u.id === numId) || null;
  }

  create({ nama, nim, email, phone, password }) {
    const existing = this.findByNimOrEmail(nim) || (email ? this.findByNimOrEmail(email) : null);
    if (existing) {
      throw new Error('NIM atau Email sudah terdaftar.');
    }

    const newUser = {
      id: this.users.length + 1,
      nama: nama || "Mahasiswa Telkom",
      nim: nim || "",
      email: email || `${nim || 'user'}@student.telkomuniversity.ac.id`,
      phone: phone || "",
      role: "Mahasiswa",
      tier: "Classmate",
      poin: 100, // Welcome bonus
      totalPoin: 100,
      avatar: null,
      passwordHash: password || "123456",
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    return newUser;
  }

  updateProfile(id, updateData) {
    const user = this.findById(id);
    if (!user) return null;

    if (updateData.nama) user.nama = updateData.nama.trim();
    if (updateData.phone) user.phone = updateData.phone.trim();
    if (updateData.avatar) user.avatar = updateData.avatar;
    if (updateData.tier) user.tier = updateData.tier;

    return user;
  }

  updatePassword(id, newPassword) {
    const user = this.findById(id);
    if (!user) return false;
    user.passwordHash = newPassword;
    return true;
  }

  updatePoints(id, addedPoints) {
    const user = this.findById(id);
    if (!user) return null;
    user.poin += addedPoints;
    if (addedPoints > 0) {
      user.totalPoin += addedPoints;
    }
    return user;
  }
}

export default new UserModel();
