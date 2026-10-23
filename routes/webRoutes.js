/**
 * WebRoutes - PointLab MVC Web Router
 * Memetakan URL halaman ke Controller masing-masing (Multi-Page / MVC Web Routing)
 */

import express from 'express';
import { dashboardController } from '../controllers/dashboardController.js';
import { authController } from '../controllers/authController.js';
import { promoController } from '../controllers/promoController.js';
import { membershipController } from '../controllers/membershipController.js';
import { chatController } from '../controllers/chatController.js';

const router = express.Router();

// Route Halaman Dashboard / Beranda
router.get('/', dashboardController.renderView);
router.get('/dashboard', dashboardController.renderView);

// Route Halaman Auth (Login / Register)
router.get('/auth', authController.renderView);
router.get('/forgot-password', authController.renderView);

// Route Halaman Riwayat Mutasi Poin
router.get('/history', dashboardController.renderView);
router.get('/feedback', authController.renderView);

// Route Halaman Promo & Redeem
router.get('/promo', promoController.renderView);
router.get('/promo/:id', promoController.renderView);
router.get('/redeem', promoController.renderView);

// Route Halaman Profil Keanggotaan & Tier
router.get('/membership', membershipController.renderView);
router.get('/tier-details', membershipController.renderView);

// Route Halaman AI Assistant
router.get('/chat', chatController.renderView);

export default router;
