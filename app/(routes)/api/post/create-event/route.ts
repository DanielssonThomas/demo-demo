import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqFormData = await request.formData();
  const supabase = createClient(cookies());
  const location_id = parseInt(reqFormData.get("location_id") as string);
  const client = reqFormData.get("client_name");
  const demonstrator_id = reqFormData.get("demonstrator_id");
  const comment = reqFormData.get("comment");
  const travel_cost = parseInt(reqFormData.get("travel_cost") as string);
  const verified = reqFormData.get("verified");
  const active = reqFormData.get("active");
  const date = reqFormData.get("date");
  const start_time = reqFormData.get("start_time");
  const end_time = reqFormData.get("end_time");
  const product_name = reqFormData.get("product_name");
  const supplier = reqFormData.get("supplier");
  const product_stock = parseInt(reqFormData.get("product_stock") as string);
  const units_used = parseInt(reqFormData.get("units_used") as string);
  const client_id = reqFormData.get("client_id");

  const { error }: { data: User | null; error: PostgrestError | null } =
    await supabase.from("Event").insert({
      location_id: location_id,
      client: client,
      demonstrator_id: demonstrator_id !== "null" ? demonstrator_id : null,
      comment: comment,
      travels_cost: travel_cost,
      verified: verified,
      active: active,
      date: date,
      start_time: start_time,
      end_time: end_time,
      product_name: product_name,
      supplier: supplier,
      product_stock: product_stock,
      units_used: units_used,
      client_id: client_id,
    });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: true }, { status: 301 });
  }

  return NextResponse.json(
    { error: false, errorMessage: error },
    { status: 301 }
  );
}
