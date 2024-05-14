"use client";
import axios from "axios";
import { getToken } from "../auth/client";

interface Candidature {
  name: string;
  description: string;
  competenceIds: [{}];
  candidateIds: [{}];
}

export interface CandidatureList {
  jobOfferId: string;
  name: string;
  description: string;
  numberOfCandidates: number;
}

export interface CompetenciesType {
  name: string;
  _id: string;
  description: string;
}

interface CreateCandidatureProps {
  name: string;
  description: string;
  competenceIds: string[];
  candidateIds: string[];
}

class CandidatureClient {
  private url = "https://api.holaqueai.com";

  async createCandidature(
    params: CreateCandidatureProps
  ): Promise<{ error?: string }> {
    try {
      const token = getToken();
      const res = await axios.post(`${this.url}/users/jobOffer`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      return {};
    } catch (error) {
      console.log(error);
      return { error: "Server error ..." };
    }
  }

  async getCandidaturesList(): Promise<CandidatureList[] | { error?: string }> {
    try {
      const token = getToken();

      const res = await axios.get(`${this.url}/users/jobOffers`, {
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
      return { error: "Error en nuestros servidores..." };
    }
  }

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
