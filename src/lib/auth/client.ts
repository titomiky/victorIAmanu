"use client";

import type { User } from "@/types/user";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

const user = {
  id: "USR-000",
  avatar: "/assets/avatar.png",
  firstName: "Sofia",
  lastName: "Rivers",
  email: "sofia@devias.io",
} satisfies User;

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

const url = "https://api.holaqueai.com/users";

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const res = await axios.post(url, params, {
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
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (email !== "sofia@devias.io" || password !== "Secret1") {
      return { error: "Invalid credentials" };
    }

    const token = generateToken();
    localStorage.setItem("custom-auth-token", token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem("stoical-auth-token") as string;
    // console.log(jwtDecode(token));

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem("stoical-auth-token");

    return {};
  }
}

export const authClient = new AuthClient();
