import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const supabase = createClient(cookies());
  const { id } = reqData;

  const { data, error }: { data: User | null; error: PostgrestError | null } =
    await supabase.from("User").select("*").match({ id: id }).single();

  if (error) {
    console.log("Get user error: ", error);
    return NextResponse.json({ data: null, error: true }, { status: 301 });
  }

  return NextResponse.json({ data: data, error: false }, { status: 301 });
}
