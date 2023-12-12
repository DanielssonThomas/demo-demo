import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqForm = await request.formData();
  const supabase = createClient(cookies());
  const id = reqForm.get("id");
  const name = reqForm.get("name");
  const role = reqForm.get("role");
  const verified = reqForm.get("verified");

  const { error }: { data: User | null; error: PostgrestError | null } =
    await supabase
      .from("User")
      .update({ name: name, role: role, verified: verified })
      .match({ id: id });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: true }, { status: 301 });
  }

  return NextResponse.json(
    { error: false, errorMessage: error },
    { status: 301 }
  );
}
