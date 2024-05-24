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
  jobOfferName: string;
  candidateName: string;
  competences: {
    name: string;
    value: number;
  }[];
}

export interface YearClientReport {
  companyName: string;
  statistics: { name: string; value: number }[];
}

class ReportsClient {
  private url = "https://api.holaqueai.com";

  async competenciesReport(): Promise<
    CandidateCompetencesReport[] | { error?: string }
  > {
    try {
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

      return { error: "Error en el servidor ..." };
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor ..." };
    }
  }

  async candidateReport(): Promise<
    UserCompetenceReport[] | { error?: string }
  > {
    try {
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

      return { error: "Error en el servidor" };
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor" };
    }
  }

  async candidateCandidatureReport(
    jobOfferId: string,
    candidateId: string
  ): Promise<UserCompetenceReport | { error: string }> {
    try {
      const token = getToken();

      const res = await axios.get(
        `${this.url}/reports/candidates/${jobOfferId}/${candidateId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      if (res.data) {
        return res.data;
      }

      return { error: "Error en el servidor" };
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor" };
    }
  }

  async getYearReport(
    year: number
  ): Promise<YearClientReport[] | { error?: string }> {
    try {
      const token = getToken();

      const res = await axios.get(
        `${this.url}/reports/clientActivity/${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(res.data)) {
        return res.data;
      }

      return [];
    } catch (error) {
      return { error: "Error en el servidor ..." };
    }
  }
}

export const reportsClient = new ReportsClient();
