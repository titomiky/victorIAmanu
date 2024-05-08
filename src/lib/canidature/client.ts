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
    //const token = getToken();

    // const res = await axios.get(`${this.url}/reports/candidates/546/564`, {
    //headers: {
    //"Content-Type": "application/json",
    //Authorization: `Bearer ${token}`,
    //},
    //});

    return [
      {
        name: "Juan",
        surname: "Perez",
        email: "a@e.s",
        phoneNumber: "123123123",
        competences: [
          { name: "competencia1", value: 71 },
          { name: "competencia2", value: 22 },
          { name: "competencia3", value: 20 },
          { name: "competencia4", value: 67 },
          { name: "competencia5", value: 20 },
          { name: "competencia6", value: 70 },
          { name: "competencia7", value: 20 },
          { name: "competencia8", value: 62 },
          { name: "competencia9", value: 9 },
          { name: "competencia10", value: 35 },
        ],
      },
      {
        name: "Manu",
        surname: "Ruiz",
        email: "abasd@ese.s",
        phoneNumber: "123123123",
        competences: [
          { name: "competencia1", value: 71 },
          { name: "competencia2", value: 22 },
          { name: "competencia3", value: 20 },
          { name: "competencia4", value: 67 },
          { name: "competencia5", value: 20 },
          { name: "competencia6", value: 70 },
          { name: "competencia7", value: 20 },
          { name: "competencia8", value: 62 },
          { name: "competencia9", value: 9 },
          { name: "competencia10", value: 35 },
        ],
      },
      // Other objects follow the same structure...
    ];
  }
}

export const candidatureClient = new CandidatureClient();
