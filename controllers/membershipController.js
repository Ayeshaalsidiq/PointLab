/**
 * MembershipController - PointLab MVC Controller Layer
 * Menangani tampilan halaman profil keanggotaan (Membership), QR Code digital member, dan rincian benefit tier.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';
import coinModel from '../models/coinModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEW_PATH = path.resolve(__dirname, '../views/index.html');

export const membershipController = {
  // Render View Halaman Membership & Tier Details
  renderView(req, res) {
    res.sendFile(VIEW_PATH);
  },

  // API Rincian Tier Keanggotaan
  async getTierDetails(req, res) {
    try {
      const user = userModel.findById(1);
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
  }
};

export default membershipController;
