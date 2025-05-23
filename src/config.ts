export interface Config {
  site: { name: string; description: string; themeColor: string };
}

export const config: Config = {
  site: {
    name: "Stoical",
    description: "",
    themeColor: "#090a0b",
  },
};

export const ApiPath = "https://api.holaqueai.com" as string;
