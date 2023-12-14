import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {PostgrestError} from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createClient(cookies());

  const {data, error}: {data: Event[] | null; error: PostgrestError | null} = await supabase
    .from("Event")
    .select(
      `id, client, demonstrator, comment, travels_cost, verified, active, date, product_name, supplier, product_stock, units_used, start_time, end_time, Location (*)`
    );

  // console.log(data, error);

  return NextResponse.json({data: data, error: error});
}
