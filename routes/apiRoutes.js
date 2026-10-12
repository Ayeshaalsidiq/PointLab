/**
 * ApiRoutes - PointLab MVC API Router
 * Menyediakan endpoint RESTful API terstruktur untuk integrasi frontend dan mobile.
 */

import express from 'express';
import { authController } from '../controllers/authController.js';
import { dashboardController } from '../controllers/dashboardController.js';
import { promoController } from '../controllers/promoController.js';
import { membershipController } from '../controllers/membershipController.js';
import { chatController } from '../controllers/chatController.js';

const router = express.Router();

// Autentikasi & Akun Pengguna
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/users/profile', authController.getProfile);
router.put('/users/profile', authController.updateProfile);
router.post('/auth/change-password', authController.changePassword);
router.put('/users/password', authController.changePassword);

// Poin, Tier & Riwayat
router.get('/coins/balance', dashboardController.getBalance);
router.get('/coins/history', dashboardController.getHistory);
router.get('/memberships/tiers', membershipController.getTierDetails);

// Katalog Promo & Penukaran
router.get('/promos', promoController.getPromos);
router.get('/promos/:id', promoController.getPromoDetail);
router.post('/promos/redeem', promoController.redeem);
router.post('/promos/claim-code', promoController.claimCode);
router.get('/vouchers/my-vouchers', promoController.getMyVouchers);

// AI Chatbot Knowledge Base
router.post('/chat/query', chatController.queryChat);
router.get('/chat/knowledge', chatController.getKnowledgeBase);

export default router;
