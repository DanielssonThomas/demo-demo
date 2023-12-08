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
    return NextResponse.redirect(`${requestUrl.origin}/`);

  const {
    data: events,
    error,
  }: { data: Event[] | null; error: PostgrestError | null } = await supabase
    .from("Event")
    .select("*");

  if (error) {
    return NextResponse.json({ data: events, error: true });
  }

  return NextResponse.json({ data: events, error: false });
}
