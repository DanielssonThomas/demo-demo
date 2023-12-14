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
    data: locations,
    error,
  }: { data: DBLocation[] | null; error: PostgrestError | null } =
    await supabase.from("Location").select("*");

  if (error) {
    console.log("Error getting locations: ", error);
    return NextResponse.json({ data: locations, error: true });
  }

  return NextResponse.json({ data: locations, error: false });
}
