import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqFormData = await request.formData();
  const supabase = createClient(cookies());
  const client_id = reqFormData.get("client_id");
  const name = reqFormData.get("name");
  const address = reqFormData.get("address");

  const { error }: { data: User | null; error: PostgrestError | null } =
    await supabase
      .from("Location")
      .insert({ name: name, address: address, client_id: client_id });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: true }, { status: 301 });
  }

  return NextResponse.json(
    { error: false, errorMessage: error },
    { status: 301 }
  );
}
