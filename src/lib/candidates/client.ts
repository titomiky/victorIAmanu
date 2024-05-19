"use client";
import axios from "axios";
import { getToken } from "../auth/client";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "@/types/user";

export interface CandidatesList {
  candidateUserId: string;
  name: string;
  surname: string;
  email: string;
}

export interface CandidateOffer {
  _id: string;
  name: string;
  description: string;
  numCandidates: number;
  clientUser: string;
}

class CandidatesClient {
  private url = "https://api.holaqueai.com"; // users/candidates

  async getCandidatesList(): Promise<CandidatesList[] | { error?: string }> {
    try {
      const token = getToken();
      const res = await axios.get(`${this.url}/users/candidates`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if (Array.isArray(res.data)) {
        return res.data;
      }
      return { error: "Error en el servidor ..." };
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor ..." };
    }
  }

  async getCandidateOffers(): Promise<CandidateOffer[] | { error?: string }> {
    try {
      const token = getToken();
      const user = jwtDecode(token) as UserToken;
      const res = await axios.get(
        `${this.url}/users/jobOffersByCandidate/${user.userId}`,
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
      return { error: "Error en el servidor ..." };
    } catch (error) {
      console.log(error);
      return { error: "Error en el servidor" };
    }
  }

  async generateCandidateTest(
    candidateId: string,
    jobOfferId: string
  ): Promise<{ error?: string } | string> {
    try {
      const token = getToken();

      const res = await axios.get<string>(
        `${this.url}/users/linkToSession/${candidateId}/${jobOfferId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return { error: "Error en nuestros servidores" };
    }
  }
}

export const candidateClient = new CandidatesClient();
