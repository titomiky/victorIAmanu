"use client";
import axios from "axios";
import { getToken } from "../auth/client";

export interface CandidateCompetencesReport {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  competences: { name: string; value: number }[];
}

export interface UserCompetenceReport {
  name: string;
  value: number;
}

class ReportsClient {
  private url = "https://api.holaqueai.com";

  async competenciesReport(): Promise<
    CandidateCompetencesReport[] | { error?: string }
  > {
    const token = getToken();

    const res = await axios.get(`${this.url}/reports/jobOffers/${456}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(res.data)) {
      return res.data;
    }

    return { error: "Server error ..." };
  }

  async candidateReport(): Promise<
    UserCompetenceReport[] | { error?: string }
  > {
    const token = getToken();

    const res = await axios.get(`${this.url}/reports/competences/${54}`, {
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

export const reportsClient = new ReportsClient();
