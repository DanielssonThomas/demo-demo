import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqForm = await request.formData();
  const supabase = createClient(cookies());

  const id = reqForm.get("id");
  const name = reqForm.get("name");
  const address = reqForm.get("address");

  const { error } = await supabase
    .from("Location")
    .update({ name: name, address: address })
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
