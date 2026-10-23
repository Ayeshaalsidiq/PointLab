/**
 * ApiRoutes - PointLab MVC API Router
 * Menyediakan endpoint RESTful API terstruktur untuk integrasi frontend, mobile,
 * serta modul loyalty /members/:id/* dan /rewards.
 */

import express from 'express';
import { authController } from '../controllers/authController.js';
import { dashboardController } from '../controllers/dashboardController.js';
import { promoController } from '../controllers/promoController.js';
import { membershipController } from '../controllers/membershipController.js';
import { chatController } from '../controllers/chatController.js';
import { requireAuth, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// ==========================================
// 1. AUTENTIKASI & AKUN PENGGUNA
// ==========================================
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/feedback', authController.submitFeedback);
router.get('/users/profile', requireAuth, authController.getProfile);
router.put('/users/profile', requireAuth, authController.updateProfile);
router.post('/auth/change-password', requireAuth, authController.changePassword);
router.put('/users/password', requireAuth, authController.changePassword);

// ==========================================
// 2. POIN, TIER & RIWAYAT PENGGUNA
// ==========================================
router.get('/coins/balance', optionalAuth, dashboardController.getBalance);
router.get('/coins/history', optionalAuth, dashboardController.getHistory);
router.get('/memberships/tiers', optionalAuth, membershipController.getTierDetails);

// ==========================================
// 3. LOYALTY MEMBER ENDPOINTS (/api/members/{id}/...)
// ==========================================
router.get('/members/:id', optionalAuth, membershipController.getMemberById);
router.get('/members/:id/tier', optionalAuth, membershipController.getMemberTier);
router.get('/members/:id/tier-details', optionalAuth, membershipController.getMemberTier);
router.get('/members/:id/points', optionalAuth, membershipController.getMemberPoints);
router.get('/members/:id/balance', optionalAuth, membershipController.getMemberPoints);
router.get('/members/:id/history', optionalAuth, membershipController.getMemberHistory);
router.get('/members/:id/vouchers', optionalAuth, membershipController.getMemberVouchers);
router.get('/members/:id/rewards', optionalAuth, membershipController.getMemberVouchers);

// ==========================================
// 4. REWARDS & KATALOG PENUKARAN (/api/rewards)
// ==========================================
router.get('/rewards', promoController.getPromos);
router.get('/rewards/my', optionalAuth, promoController.getMyVouchers);
router.get('/rewards/my-rewards', optionalAuth, promoController.getMyVouchers);
router.post('/rewards/redeem', optionalAuth, promoController.redeem);
router.post('/rewards/claim', optionalAuth, promoController.claimCode);
router.get('/rewards/:id', promoController.getPromoDetail);
router.post('/rewards/:id/redeem', optionalAuth, promoController.redeem);

// ==========================================
// 5. KATALOG PROMO & VOUCHER (/api/promos, /api/vouchers)
// ==========================================
router.get('/promos', promoController.getPromos);
router.get('/promos/:id', promoController.getPromoDetail);
router.post('/promos/redeem', optionalAuth, promoController.redeem);
router.post('/promos/claim-code', optionalAuth, promoController.claimCode);
router.get('/vouchers/my-vouchers', optionalAuth, promoController.getMyVouchers);
router.get('/vouchers/:id', promoController.getPromoDetail);

// ==========================================
// 6. AI CHATBOT KNOWLEDGE BASE
// ==========================================
router.post('/chat/query', chatController.queryChat);
router.get('/chat/knowledge', chatController.getKnowledgeBase);

// ==========================================
// 7. API 404 HANDLER (MENJAMIN SELURUH /api/* MERESPON JSON, BUKAN HTML SPA)
// ==========================================
router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint API ${req.method} ${req.originalUrl} tidak ditemukan pada server PointLab.`
  });
});

export default router;
