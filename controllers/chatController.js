/**
 * ChatController - PointLab MVC Controller Layer
 * Menangani tampilan asisten chat AI dan pemrosesan query knowledge RAG / Gemini.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import chatModel from '../models/chatModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEW_PATH = path.resolve(__dirname, '../views/index.html');

export const chatController = {
  // Render View Halaman AIChat
  renderView(req, res) {
    res.sendFile(VIEW_PATH);
  },

  // API Query Knowledge Base RAG
  async queryChat(req, res) {
    try {
      const { message, query } = req.body;
      const userText = message || query || '';

      if (!userText.trim()) {
        return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
      }

      // 1. Cek Knowledge Base Lokal RAG
      const localAnswer = chatModel.findKnowledge(userText);
      if (localAnswer) {
        return res.status(200).json({
          source: 'rag_local',
          answer: localAnswer
        });
      }

      // 2. Fallback response jika belum terdefinisi secara spesifik
      return res.status(200).json({
        source: 'assistant',
        answer: `Halo! Saya asisten resmi WarmingUp (Ngolab) Lantai 4 FIT Telkom University. Pertanyaan Anda mengenai "${userText}" sedang kami proses. Untuk informasi menu, promo, poin, jam buka, atau kerja sama, silakan tanyakan langsung ke saya!`
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Mengambil seluruh Knowledge Base
  async getKnowledgeBase(req, res) {
    try {
      const kb = chatModel.getKnowledgeBase();
      return res.status(200).json({ knowledgeBase: kb });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default chatController;
