"use client";
import axios from "axios";
import { getToken } from "../auth/client";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "@/types/user";

export interface Candidature {
  name: string;
  description: string;
  competenceIds: string[];
  candidateIds: string[];
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export interface CandidatureList {
  _id: string;
  jobOfferId: string;
  name: string;
  description: string;
  numCandidates: number;
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
      return { error: "Error en el servidor ..." };
    }
  }

  async getCandidaturesList(): Promise<CandidatureList[] | { error?: string }> {
    try {
      const token = getToken();
      const decodedToken = jwtDecode(token) as UserToken;

      const res = await axios.get(
        `${this.url}/users/jobOffersByClient/${decodedToken.clientId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  async editCandidature(
    id: string,
    params: CreateCandidatureProps
  ): Promise<{ error?: string }> {
    try {
      const token = getToken();

      const res = await axios.put(`${this.url}/users/jobOffer/${id}`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return {};
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor" };
    }
  }

  async getCandidature(id: string): Promise<Candidature> {
    try {
      const token = getToken();

      const res = await axios.get<Candidature>(
        `${this.url}/users/jobOffer/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return {
        name: "",
        description: "",
        competenceIds: [],
        candidateIds: [],
      };
    }
  }

  async deleteCandidature(id: string): Promise<{ error?: string }> {
    try {
      const token = getToken();

      const res = await axios.delete<Candidature>(
        `${this.url}/users/jobOffer/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {};
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor ...." };
    }
  }
}

export const candidatureClient = new CandidatureClient();
