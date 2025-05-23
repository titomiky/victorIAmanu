"use client";
import { ApiPath } from "@/config";
import type { Candidate, Company, User, UserToken } from "@/types/user";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

interface CreateCandidate {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  currentSalary: number | string;
  desiredSalary: number | string;
  birthDate: string;
  file: Object;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const res = await axios.post(`${ApiPath}/users`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (typeof res.data !== "string") {
        return { error: "Error en nuestros servidores" };
      }

      const token = res.data;

      localStorage.setItem("stoical-auth-token", token);

      return {};
    } catch (error) {
      console.log(error);
      return { error: "Error en nuestros servidores" };
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" };
  }

  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    try {
      const res = await axios.post(`${ApiPath}/auth/login`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        if (typeof res.data !== "string") {
          return { error: "Error en nuestros servidores" };
        }

        const token = res.data;
        localStorage.setItem("stoical-auth-token", token);
        return {};
      }

      return { error: "Error en nuestros servidores" };
    } catch (error) {
      console.log(error);
      return { error: "Email o contraseña incorrectos" };
    }
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

  async createCandidateFromDashboard(
    params: CreateCandidate
  ): Promise<{ error?: string }> {
    try {
      const data = {
        user: {
          email: params.email,
          password: params.password,
        },
        candidateUser: {
          name: params.name,
          surname: params.surname,
          phoneNumber: params.phoneNumber,
          currentSalary: Number(params.currentSalary),
          desiredSalary: Number(params.desiredSalary),
          birthDate: params.birthDate,
          cvText: "",
          file: params.file,
        },
      };

      const token = getToken();
      const res = await axios.post(`${ApiPath}/users/candidateByClient`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        this.uploadCandidateCv(res.data, "cvDashboard");
      }

      return {};
    } catch (error) {
      console.log(error);
      return { error: "Ocurrió un error !!" };
    }
  }

  async uploadCandidateCv(token: string, inputId: string) {
    const inputFile = document.getElementById(inputId) as any;
    const file = inputFile.files[0];
    const user = jwtDecode(token) as UserToken;

    await axios.post(
      `${ApiPath}/users/uploadCVpdf`,
      {
        file: file,
        candidateId: user.candidateId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async createCandidate(params: Candidate): Promise<{ error?: string }> {
    try {
      params.currentSalary = Number(params.currentSalary);
      params.desiredSalary = Number(params.desiredSalary);

      const token = getToken();

      const res = await axios.put(`${ApiPath}/users/candidate`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        localStorage.setItem("stoical-auth-token", res.data);
        this.uploadCandidateCv(res.data, "cv");
      }

      return {};
    } catch (error) {
      console.log(error);
      return { error: "Ocurrió un error !!" };
    }
  }

  async createCompany(params: Company): Promise<{ error?: string }> {
    try {
      params.numberOfEmployees = Number(params.numberOfEmployees);

      const token = getToken();

      const res = await axios.put(`${ApiPath}/users/client`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        localStorage.setItem("stoical-auth-token", res.data);
        return {};
      }

      return { error: "Ocurrió un error !!" };
    } catch (error) {
      console.log(error);
      return { error: "Ocurrió un error !!" };
    }
  }

  async editClientDetails(params: Company): Promise<{ error?: string }> {
    try {
      params.numberOfEmployees = Number(params.numberOfEmployees);
      const token = getToken();

      const res = await axios.put(`${ApiPath}/users/client`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof res.data === "string") {
        localStorage.setItem("stoical-auth-token", res.data);
      }

      return {};
    } catch (error) {
      return { error: "Ocurrió un error !!" };
    }
  }

  async sendRecoveryLink(email: string): Promise<{ error?: string }> {
    try {
      const res = await axios.post(
        `${ApiPath}/users/sendEmailToChangePassword`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {};
    } catch (error) {
      return { error: "Cuenta no encontrada" };
    }
  }

  async resetPassword(
    password: string,
    userId: string
  ): Promise<{ error?: string }> {
    try {
      const res = await axios.put(
        `${ApiPath}/users/changePasswordFromEmail`,
        {
          password: password,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {};
    } catch (error) {
      return { error: "Error en nuestros servidores" };
    }
  }

  async getClientDetails(
    userId: string
  ): Promise<{ error?: string } | Company> {
    try {
      const token = getToken();

      const res = await axios.get(`${ApiPath}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.clientUser;
    } catch (error) {
      return { error: "Error en nuestros servidores" };
    }
  }
}

export const authClient = new AuthClient();
