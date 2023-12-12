import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const supabase = createClient(cookies());
  const { id } = reqData;

  const {
    data: locations,
    error,
  }: { data: DBLocation[] | null; error: PostgrestError | null } =
    await supabase.from("Location").select("*").match({ client_id: id });

  if (error) {
    console.log("Get client locations error: ", error);
    return NextResponse.json({ data: null, error: true }, { status: 301 });
  }

  return NextResponse.json({ data: locations, error: false }, { status: 301 });
}
