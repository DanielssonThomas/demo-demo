import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const supabase = createClient(cookies());
  const { id } = reqData;

  const {
    data: event,
    error,
  }: { data: TableClientEvent | null; error: PostgrestError | null } =
    await supabase
      .from("Event")
      .select("*, Location(name, address)")
      .match({ id: id })
      .single();

  if (error) {
    console.log(error);
    return NextResponse.json({ data: event, error: true }, { status: 301 });
  }

  return NextResponse.json({ data: event, error: false }, { status: 301 });
}
