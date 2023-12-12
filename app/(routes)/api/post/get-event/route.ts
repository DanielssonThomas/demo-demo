import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const supabase = createClient(cookies());
  const { client_id } = reqData;

  const {
    data,
    error,
  }: { data: TableClientEvent[] | null; error: PostgrestError | null } =
    await supabase
      .from("Event")
      .select("*, Location(name, address)")
      .match({ client_id: client_id });

  if (error) {
    console.log("Get event error: ", error);
    return NextResponse.json({ data: null, error: true }, { status: 301 });
  }

  return NextResponse.json({ data: data, error: false }, { status: 301 });
}
