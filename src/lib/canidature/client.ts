"use client";
import axios from "axios";
import { getToken } from "../auth/client";

interface Candidature {
  name: string;
  description: string;
  competenceIds: [{}];
  candidateIds: [{}];
}

export interface CompetenciesType {
  name: string;
  _id: string;
  description: string;
}

class CandidatureClient {
  private url = "https://api.holaqueai.com";

  async getCompetenciesList(): Promise<CompetenciesType[] | []> {
    try {
      const token = getToken();

      const res = await axios.get(`${this.url}/competencies/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        return res.data;
      }

      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createCanidature(params: Candidature): Promise<{ error?: string }> {
    const token = getToken();

    const res = await axios.post(`${this.url}`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {};
  }
}

export const candidatureClient = new CandidatureClient();
