export type ProjectActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fields?: {
    projectId?: string;
    name?: string;
    clientId?: string;
  };
};

export const initialProjectActionState: ProjectActionState = {
  status: "idle",
  message: "",
};
