import { Database } from "@/types/supabase";

declare global {
  type ClientEvent = Database["public"]["Tables"]["Event"]["Row"];
  type TableClientEvent = {
    active: boolean | null;
    client: string | null;
    client_id: number | null;
    comment: string | null;
    date: string | null;
    demonstrator: string | null;
    id: number;
    location_id: number | null;
    product_name: string | null;
    product_stock: number | null;
    supplier: string | null;
    travels_cost: number | null;
    units_used: number | null;
    verified: boolean | null;
    Location: { name: string; address: string };
    start_time: string | null;
    end_time: string | null;
  };
  type DBClient = {
    id: number;
    name: string | null;
    role: "admin" | "client" | "demonstrator" | null;
    verified: boolean | null;
    user_id: string | null;
  };
  type User = Database["public"]["Tables"]["User"]["Row"];
  type DBLocation = Database["public"]["Tables"]["Location"]["Row"];
}
