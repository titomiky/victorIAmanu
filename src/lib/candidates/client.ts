"use client";
import axios from "axios";
import { getToken } from "../auth/client";

export interface CandidatesList {
  candidateUserId: string;
  name: string;
  surname: string;
  email: string;
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

      if (Array.isArray(res.data)) {
        return res.data;
      }
      return { error: "Server error ..." };
    } catch (error) {
      console.log(error);
      return { error: "Server error ..." };
    }
  }
}

export const candidateClient = new CandidatesClient();
