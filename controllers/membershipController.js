/**
 * MembershipController - PointLab MVC Controller Layer
 * Menangani loyalty endpoints /api/members/:id/*, profil keanggotaan, QR Code digital,
 * tier calculation, riwayat poin, dan voucher reward per-member.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';
import coinModel from '../models/coinModel.js';
import promoModel from '../models/promoModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEW_PATH = path.resolve(__dirname, '../views/index.html');

// Helper untuk menemukan member berdasarkan ID atau alias ('me', NIM)
const resolveMember = async (req) => {
  let paramId = req.params.id;
  if (paramId === 'me' || !paramId) {
    paramId = req.userId || 1;
  }
  let member = await userModel.findById(paramId);
  if (!member) {
    member = await userModel.findByNimOrEmail(paramId);
  }
  return member;
};

export const membershipController = {
  // Render View Halaman Membership & Tier Details
  renderView(req, res) {
    res.sendFile(VIEW_PATH);
  },

  // API Rincian Seluruh Tier Keanggotaan
  async getTierDetails(req, res) {
    try {
      const targetUserId = req.userId || 1;
      const user = await userModel.findById(targetUserId);
      const tiers = coinModel.getTiers();
      const currentTier = coinModel.calculateTier(user ? user.totalPoin : 0);

      return res.status(200).json({
        user,
        currentTier,
        tiers
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET /api/members/:id — Detail Member & Poin
  async getMemberById(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({
          error: 'Not Found',
          message: `Member dengan identifier '${req.params.id}' tidak ditemukan.`
        });
      }

      const totalPts = member.totalPoin ?? member.total_points ?? member.poin ?? 0;
      const currentTier = coinModel.calculateTier(totalPts);

      return res.status(200).json({
        member: {
          id: member.id,
          nama: member.nama,
          nim: member.nim,
          email: member.email,
          phone: member.phone,
          role: member.role,
          tier: currentTier.name || member.tier,
          poin: member.poin,
          coin_balance: member.coin_balance,
          totalPoin: totalPts,
          total_points: totalPts,
          avatar: member.avatar,
          avatar_url: member.avatar_url,
          createdAt: member.createdAt
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET /api/members/:id/tier — Rincian Tier & Progress Member
  async getMemberTier(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ error: `Member '${req.params.id}' tidak ditemukan.` });
      }

      const totalPts = member.totalPoin ?? member.total_points ?? member.poin ?? 0;
      const currentTier = coinModel.calculateTier(totalPts);
      const allTiers = coinModel.getTiers();

      let nextTier = null;
      let nextPoints = null;
      let progress = 100;

      if (currentTier.id < allTiers.length - 1) {
        nextTier = allTiers[currentTier.id + 1].name;
        nextPoints = allTiers[currentTier.id + 1].minPoints;
        const currentTierMin = currentTier.minPoints;
        progress = Math.min(100, Math.max(0, ((totalPts - currentTierMin) / (nextPoints - currentTierMin)) * 100));
      } else {
        nextTier = 'MAX';
        nextPoints = totalPts;
        progress = 100;
      }

      return res.status(200).json({
        memberId: member.id,
        currentTier,
        tierName: currentTier.name,
        totalPoints: totalPts,
        currentPoints: member.poin,
        nextTier,
        nextPoints,
        progress: Math.round(progress),
        allTiers
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET /api/members/:id/points & /api/members/:id/balance — Saldo Poin Member
  async getMemberPoints(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ error: `Member '${req.params.id}' tidak ditemukan.` });
      }

      const totalPts = member.totalPoin ?? member.total_points ?? member.poin ?? 0;
      const currentTier = coinModel.calculateTier(totalPts);

      return res.status(200).json({
        memberId: member.id,
        points: member.poin,
        coin_balance: member.coin_balance,
        totalPoints: totalPts,
        total_points: totalPts,
        tier: currentTier.name
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET /api/members/:id/history — Riwayat Poin Transaksi Member
  async getMemberHistory(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ error: `Member '${req.params.id}' tidak ditemukan.` });
      }

      const history = await coinModel.getHistory(member.id);
      return res.status(200).json({
        memberId: member.id,
        history
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET /api/members/:id/vouchers & /api/members/:id/rewards — Voucher Yang Dimiliki Member
  async getMemberVouchers(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ error: `Member '${req.params.id}' tidak ditemukan.` });
      }

      const vouchers = await promoModel.getUserVouchers(member.id);
      return res.status(200).json({
        memberId: member.id,
        vouchers,
        rewards: vouchers
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default membershipController;
