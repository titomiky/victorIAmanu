"use client";

import type { Candidate, Company, User, UserToken } from "@/types/user";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

export function getToken(): string {
  const token = localStorage.getItem("stoical-auth-token") as string;
  return token;
}

export function getUser(): UserToken | {} {
  const token = localStorage.getItem("stoical-auth-token") as string;

  if (!token) {
    return {};
  }

  const decodedToken = jwtDecode(token);

  return decodedToken;
}

export interface SignUpParams {
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: "google";
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

const url = "https://api.holaqueai.com";

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const res = await axios.post(`${url}/users`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = res.data;

    localStorage.setItem("stoical-auth-token", token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" };
  }

  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    console.log(params);

    const res = await axios.post(`${url}/auth/login`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);

    if (res.data) {
      const token = res.data;
      localStorage.setItem("stoical-auth-token", token);
      return {};
    }
    //     const { email, password } = params;
    //if (email !== "sofia@devias.io" || password !== "Secret1") {
    //return { error: "Invalid credentials" };
    //}

    //const token = generateToken();
    //localStorage.setItem("custom-auth-token", token);

    return { error: "Problemas en nuestros servidores" };
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem("stoical-auth-token") as string;

    if (!token) {
      return {};
    }

    const decodedToken = jwtDecode(token) as User;
    return { data: decodedToken };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem("stoical-auth-token");

    return {};
  }

  async createCandidate(params: Candidate): Promise<{ error?: string }> {
    params.currentSalary = Number(params.currentSalary);
    params.desiredSalary = Number(params.desiredSalary);
    const token = getToken();
    const res = await axios.put(`${url}/users/candidate`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    if (res.status === 200) {
      console.log(jwtDecode(res.data));
      localStorage.setItem("stoical-auth-token", res.data);
      return {};
    }

    return { error: "Ocurrió un error !!" };
  }

  async createCompany(params: Company): Promise<{ error?: string }> {
    params.numberOfEmployees = Number(params.numberOfEmployees);

    const token = getToken();

    const res = await axios.put(`${url}/users/admin`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    if (res.status === 200) {
      localStorage.setItem("stoical-auth-token", res.data);
      return {};
    }

    return { error: "Ocurrió un error !!" };
  }
}

export const authClient = new AuthClient();
