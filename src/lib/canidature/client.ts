"use client";
import axios from "axios";
import { getToken } from "../auth/client";

class CandidatureClient {
  private url = "https://api.holaqueai.com";

  async getCompetenciesList(): Promise<[]> {
    const token = getToken();

    const res = await axios.get(`${this.url}/competencies/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    if (res.data) {
      return res.data;
    }

    return [];
  }
}

export const candidatureClient = new CandidatureClient();
