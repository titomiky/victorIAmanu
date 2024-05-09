"use client";
import axios from "axios";
import { getToken } from "../auth/client";
import { data } from "@/components/dashboard/overview/data";

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

export interface CandidateCompetencesReport {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  competences: { name: string; value: number }[];
}

class CandidatureClient {
  private url = "https://api.holaqueai.com";

  async getCompetenciesList(): Promise<CompetenciesType[] | []> {
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

  async competenciesReport(): Promise<
    CandidateCompetencesReport[] | { error?: string }
  > {
    const token = getToken();

    const res = await axios.get(`${this.url}/reports/jobOffers/456`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(res.data)) {
      return res.data;
    }

    return { error: "Server error" };
  }
}

export const candidatureClient = new CandidatureClient();
