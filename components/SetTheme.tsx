"use server";
import { cookies } from "next/headers";

const SetTheme = async () => {
  const currentTheme = cookies().get("theme");
  cookies().delete("theme");
  cookies().set("theme", currentTheme?.value === "dark" ? "" : "dark");
};

export default SetTheme;
