import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const supabase = createClient(cookies());
  const { id } = reqData;

  const { error }: { data: User | null; error: PostgrestError | null } =
    await supabase.from("User").update({ verified: true }).match({ id: id });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: true }, { status: 301 });
  }

  return NextResponse.json(
    { error: false, errorMessage: error },
    { status: 301 }
  );
}
