/**
 * ChatController - PointLab MVC Controller Layer
 * Menangani tampilan asisten chat AI dan pemrosesan query knowledge RAG / Gemini.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import chatModel from '../models/chatModel.js';
import { renderSpaView } from '../helpers/viewHelper.js';

export const chatController = {
  // Render View Halaman AIChat
  renderView(req, res) {
    return renderSpaView(req, res);
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

      // 2. Coba panggil Gemini dari Server (aman, tanpa mengekspos API Key ke browser)
      const geminiKey = process.env.GEMINI_API_KEY;
      if (geminiKey) {
        try {
          const sysPrompt = `Anda adalah AI Assistant resmi PointLab (Ngolab / WarmingUp).
Lokasi WarmingUp / Ngolab berada di Lantai 4 Fakultas Ilmu Terapan (FIT), Telkom University.
Jawab secara ramah, singkat, dan informatif mengenai PointLab, poin, dan kantin FIT.`;
          const geminiResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: `${sysPrompt}\n\nPertanyaan: ${userText}` }] }]
            })
          });
          const geminiData = await geminiResp.json();
          const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (geminiText) {
            return res.status(200).json({
              source: 'gemini',
              answer: geminiText
            });
          }
        } catch (gemErr) {
          console.warn('[Gemini Server Call Warning]:', gemErr.message);
        }
      }

      // 3. Fallback response jika belum terdefinisi secara spesifik
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
