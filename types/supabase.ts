export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Event: {
        Row: {
          active: boolean | null
          client: string | null
          comment: string | null
          date: string | null
          demonstrator: string | null
          id: number
          location_id: number | null
          product_name: string | null
          product_stock: number | null
          supplier: string | null
          time: string | null
          travels_cost: number | null
          units_used: number | null
          verified: boolean | null
        }
        Insert: {
          active?: boolean | null
          client?: string | null
          comment?: string | null
          date?: string | null
          demonstrator?: string | null
          id?: number
          location_id?: number | null
          product_name?: string | null
          product_stock?: number | null
          supplier?: string | null
          time?: string | null
          travels_cost?: number | null
          units_used?: number | null
          verified?: boolean | null
        }
        Update: {
          active?: boolean | null
          client?: string | null
          comment?: string | null
          date?: string | null
          demonstrator?: string | null
          id?: number
          location_id?: number | null
          product_name?: string | null
          product_stock?: number | null
          supplier?: string | null
          time?: string | null
          travels_cost?: number | null
          units_used?: number | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Event_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "Location"
            referencedColumns: ["id"]
          }
        ]
      }
      Location: {
        Row: {
          address: string | null
          client_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          client_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          client_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      User: {
        Row: {
          id: number
          name: string | null
          role: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          id?: number
          name?: string | null
          role?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          id?: number
          name?: string | null
          role?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
