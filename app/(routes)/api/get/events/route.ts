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
  if (user === null) return NextResponse.redirect(`${requestUrl.origin}/`);

  const { data: profile }: { data: User | null } = await supabase
    .from("User")
    .select("*")
    .match({ user_id: user?.id })
    .single();

  if (profile?.role !== "admin")
    return NextResponse.json({ data: null, error: null, unauth: true });

  const {
    data: events,
    error,
  }: { data: TableClientEvent[] | null; error: PostgrestError | null } =
    await supabase.from("Event").select("*, Location(name, address)");

  if (error) {
    console.log("Error getting events: ", error);
    return NextResponse.json({ data: events, error: true });
  }

  return NextResponse.json({ data: events, error: false });
}
