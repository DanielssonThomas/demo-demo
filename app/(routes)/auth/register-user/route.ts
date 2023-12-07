import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createClient(cookies());
  const formData = await request.formData();
  const name = formData.get("name");
  const role = formData.get("role");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;

  const { error } = await supabase
    .from("User")
    .insert({ name: name, role: role, user_id: user_id });

  if (error) {
    console.log("Register user error: ", error);
  }
  return NextResponse.json({ message: error });
}
