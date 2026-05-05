export type ClientActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fields?: {
    clientId?: string;
    name?: string;
  };
};

export const initialClientActionState: ClientActionState = {
  status: "idle",
  message: "",
};
