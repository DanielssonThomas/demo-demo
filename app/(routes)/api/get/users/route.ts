import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile }: { data: User | null } = await supabase
    .from("User")
    .select("*")
    .match({ user_id: user?.id })
    .single();

  if (profile?.role !== "admin")
    return NextResponse.json({ data: null, error: null, unauth: true });

  const {
    data: users,
    error,
  }: { data: User[] | null; error: PostgrestError | null } = await supabase
    .from("User")
    .select("*");

  if (error) {
    return NextResponse.json({ data: users, error: true });
  }

  return NextResponse.json({ data: users, error: false });
}
