"use client";
import axios from "axios";
import { getToken } from "../auth/client";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "@/types/user";
import { ApiPath } from "@/config";

export interface CandidatesList {
  candidateUserId: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber?: string;
  currentSalary?: number;
  desiredSalary?: number;
  age?: number;
  cVpdfUrl?: string;
}

export interface CandidateOffer {
  _id: string;
  name: string;
  description: string;
  numCandidates: number;
  clientUser: string;
  clientUserName: string;
  competencesNames: string[];
  linkToSession?: string;
}

class CandidatesClient {
  async getCandidatesList(): Promise<CandidatesList[] | { error?: string }> {
    try {
      const token = getToken();
      const res = await axios.get(`${ApiPath}/users/candidates`, {
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

  async getCandidateOffers(): Promise<CandidateOffer[] | { error?: string }> {
    try {
      const token = getToken();
      const user = jwtDecode(token) as UserToken;
      console.log(user);
      const res = await axios.get(
        `${ApiPath}/users/jobOffersByCandidate/${user.candidateId}`,
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
        `${ApiPath}/users/linktosession/${candidateId}/${jobOfferId}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return { error: "error en nuestros servidores" };
    }
  }

  async getCandidatesByOffer(
    id: string
  ): Promise<{ error?: string } | CandidatesList[]> {
    try {
      const token = getToken();

      const res = await axios.get<CandidatesList>(
        `${ApiPath}/users/candidatesByJobOffer/${id}`,
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

      return { error: "Error en nuestros servidores" };
    } catch (error) {
      console.log(error);
      return { error: "Error en nuestros servidores" };
    }
  }
}

export const candidateClient = new CandidatesClient();
