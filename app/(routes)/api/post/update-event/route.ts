import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqForm = await request.formData();
  const supabase = createClient(cookies());
  const id = reqForm.get("id");
  const location_id = reqForm.get("location_id");
  const date = reqForm.get("date");
  const start_time = reqForm.get("start_time");
  const end_time = reqForm.get("end_time");
  const comment = reqForm.get("comment");
  const verified = reqForm.get("verified");
  const active = reqForm.get("active");

  const { error } = await supabase
    .from("Event")
    .update({
      location_id: location_id,
      date: date,
      start_time: start_time,
      end_time: end_time,
      comment: comment,
      verified: verified,
      active: active,
    })
    .match({ id: id });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: true }, { status: 301 });
  }

  return NextResponse.json({ error: false }, { status: 301 });
}
