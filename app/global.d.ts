import { Database } from "@/types/supabase";

declare global {
  type ClientEvent = Database["public"]["Tables"]["Event"]["Row"];
  type TableClientEvent = {
    active: boolean | null;
    client: string | null;
    comment: string | null;
    date: string | null;
    demonstrator: string | null;
    id: number;
    location_id: number | null;
    product_name: string | null;
    product_stock: number | null;
    supplier: string | null;
    time: string | null;
    travels_cost: number | null;
    units_used: number | null;
    verified: boolean | null;
    Location: { name: string; address: string };
  };
  type User = Database["public"]["Tables"]["User"]["Row"];
  type Location = Database["public"]["Tables"]["Location"]["Row"];
}
