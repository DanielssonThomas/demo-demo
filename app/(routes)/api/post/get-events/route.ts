import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {PostgrestError} from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createClient(cookies());

  const {data, error}: {data: TableClientEvent[] | null; error: PostgrestError | null} =
    await supabase.from("Event").select(`*, Location (*)`);

  // console.log(data);

  return NextResponse.json({data: data, error: error});
}
