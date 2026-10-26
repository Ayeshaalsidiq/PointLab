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
import { renderSpaView } from '../helpers/viewHelper.js';

// Helper untuk menemukan member berdasarkan ID atau alias ('me', NIM)
const resolveMember = async (req) => {
  let paramId = req.params.memberId || req.params.id;
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
    return renderSpaView(req, res);
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
      return res.status(500).json({ message: error.message, code: 'TIER_ERROR' });
    }
  },

  // GET /api/members/:id — Detail Member & Poin
  async getMemberById(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({
          message: `Member dengan identifier '${req.params.id}' tidak ditemukan.`,
          code: 'MEMBER_NOT_FOUND'
        });
      }

      const totalPts = member.totalPoin ?? member.total_points ?? member.poin ?? 0;
      const currentTier = coinModel.calculateTier(totalPts);

      return res.status(200).json({
        member: {
          id: member.id,
          memberId: member.id,
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
      return res.status(500).json({ message: error.message, code: 'MEMBER_ERROR' });
    }
  },

  // GET /api/members/:id/tier — Rincian Tier & Progress Member
  async getMemberTier(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: `Member '${req.params.id}' tidak ditemukan.`, code: 'MEMBER_NOT_FOUND' });
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
      return res.status(500).json({ message: error.message, code: 'TIER_ERROR' });
    }
  },

  // GET /api/members/:id/points & /api/members/:id/balance — Saldo Poin Member
  async getMemberPoints(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: `Member '${req.params.id}' tidak ditemukan.`, code: 'MEMBER_NOT_FOUND' });
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
      return res.status(500).json({ message: error.message, code: 'BALANCE_ERROR' });
    }
  },

  // GET /api/members/:id/history — Riwayat Poin Transaksi Member
  async getMemberHistory(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: `Member '${req.params.id}' tidak ditemukan.`, code: 'MEMBER_NOT_FOUND' });
      }

      const history = await coinModel.getHistory(member.id);
      return res.status(200).json({
        memberId: member.id,
        history
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, code: 'HISTORY_ERROR' });
    }
  },

  // GET /api/members/:id/vouchers & /api/members/:id/rewards — Voucher Yang Dimiliki Member
  async getMemberVouchers(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: `Member '${req.params.id}' tidak ditemukan.`, code: 'MEMBER_NOT_FOUND' });
      }

      const vouchers = await promoModel.getUserVouchers(member.id);
      return res.status(200).json({
        memberId: member.id,
        vouchers,
        rewards: vouchers
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, code: 'VOUCHER_ERROR' });
    }
  },

  // ==========================================
  // LOYALTY CONTRACT — NGOLAB-GAMI Kontrak
  // ==========================================

  // GET /api/members/:memberId/loyalty/balance
  async getLoyaltyBalance(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: 'Member tidak ditemukan.', code: 'MEMBER_NOT_FOUND' });
      }

      const totalPts = member.totalPoin ?? member.total_points ?? member.poin ?? 0;
      const currentTier = coinModel.calculateTier(totalPts);
      const allTiers = coinModel.getTiers();

      return res.status(200).json({
        memberId: member.id,
        currentPoints: member.poin,
        balance: member.coin_balance,
        totalPoints: totalPts,
        tier: currentTier.name,
        allTiers
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, code: 'LOYALTY_BALANCE_ERROR' });
    }
  },

  // POST /api/members/:memberId/loyalty/points/earn
  async earnPoints(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: 'Member tidak ditemukan.', code: 'MEMBER_NOT_FOUND' });
      }

      const { points, source, referenceType, referenceId, description } = req.body;
      if (!points || parseInt(points, 10) <= 0) {
        return res.status(400).json({ message: 'Poin harus lebih besar dari 0.', code: 'EARN_INVALID_POINTS' });
      }

      const updated = await userModel.updatePoints(member.id, parseInt(points, 10));
      await coinModel.addHistory({
        userId: member.id,
        userName: member.nama,
        title: description || `Poin dari ${source || 'aktivitas'}`,
        category: source || 'Aktivitas',
        type: 'earn',
        points: parseInt(points, 10)
      });

      return res.status(200).json({
        memberId: member.id,
        earnedPoints: parseInt(points, 10),
        currentPoints: updated ? updated.poin : member.poin + parseInt(points, 10),
        source: source || 'Aktivitas',
        referenceType: referenceType || null,
        referenceId: referenceId || null
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, code: 'EARN_POINTS_ERROR' });
    }
  },

  // GET /api/members/:memberId/redemptions
  async getRedemptions(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: 'Member tidak ditemukan.', code: 'MEMBER_NOT_FOUND' });
      }

      const vouchers = await promoModel.getUserVouchers(member.id);
      const redemptions = vouchers.map(v => ({
        redemptionId: v.id,
        rewardName: v.title || 'Voucher',
        redemptionCode: v.code || v.voucher_code,
        remainingPoints: v.pointsSpent || 0,
        status: v.status || 'unused',
        claimedAt: v.claimedAt || null,
        expiresAt: v.expiresAt || null
      }));

      return res.status(200).json({ redemptions });
    } catch (error) {
      return res.status(500).json({ message: error.message, code: 'REDEMPTIONS_ERROR' });
    }
  },

  // POST /api/members/:memberId/rewards/:rewardId/redeem (atomic)
  async redeemReward(req, res) {
    try {
      const member = await resolveMember(req);
      if (!member) {
        return res.status(404).json({ message: 'Member tidak ditemukan.', code: 'MEMBER_NOT_FOUND' });
      }

      const rewardId = req.params.rewardId;
      const promo = await promoModel.getPromoById(rewardId);
      if (!promo) {
        return res.status(404).json({ message: 'Reward tidak ditemukan.', code: 'REWARD_NOT_FOUND' });
      }

      const cost = promo.pointsRequired || promo.coin_cost || 0;
      if (member.poin < cost) {
        return res.status(400).json({
          message: `Saldo poin tidak mencukupi. Dibutuhkan ${cost} poin, Anda memiliki ${member.poin} poin.`,
          code: 'REDEEM_INSUFFICIENT_POINTS'
        });
      }

      // Atomic: cek saldo -> potong -> generate kode -> response
      const updated = await userModel.updatePoints(member.id, -cost);
      const voucher = await promoModel.redeemPromo(rewardId, member.id);
      await coinModel.addHistory({
        userId: member.id,
        userName: member.nama,
        title: `Tukar: ${promo.title}`,
        category: 'Penukaran Poin',
        type: 'redeem',
        points: -cost
      });

      return res.status(200).json({
        redemptionId: voucher.id,
        rewardName: promo.title,
        redemptionCode: voucher.code || voucher.voucher_code,
        remainingPoints: updated ? updated.poin : member.poin - cost
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, code: 'REDEEM_ERROR' });
    }
  }
};

export default membershipController;
