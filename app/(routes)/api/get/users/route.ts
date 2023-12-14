import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { data } from "autoprefixer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profileRes = await supabase
    .from("User")
    .select("*")
    .match({ user_id: user?.id })
    .single();

  if (profileRes.error) {
    console.log("Profile user fetch error: ", profileRes);
  }

  if (profileRes.data?.role !== "admin")
    return NextResponse.json({ data: null, error: null, unauth: true });

  const {
    data: users,
    error,
  }: { data: User[] | null; error: PostgrestError | null } = await supabase
    .from("User")
    .select("*");

  if (error) {
    console.log("Error getting users: ", error);
    return NextResponse.json({ data: users, error: true });
  }

  return NextResponse.json({ data: users, error: false });
}
