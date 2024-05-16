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

      if (Array.isArray(res.data)) {
        return res.data;
      }
      return { error: "Server error ..." };
    } catch (error) {
      console.log(error);
      return { error: "Server error ..." };
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
      return { error: "Server error ..." };
    } catch (error) {
      console.log(error);
      return { error: "Server error" };
    }
  }
}

export const candidateClient = new CandidatesClient();
