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
      comments: {
        Row: {
          commenter_id: number | null
          created_at: string
          id: number
          post_id: number | null
        }
        Insert: {
          commenter_id?: number | null
          created_at?: string
          id?: number
          post_id?: number | null
        }
        Update: {
          commenter_id?: number | null
          created_at?: string
          id?: number
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_commenter_id_fkey"
            columns: ["commenter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      follows: {
        Row: {
          created_at: string
          id: number
          user_followed_by: number | null
          user_following: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_followed_by?: number | null
          user_following?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          user_followed_by?: number | null
          user_following?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "follows_user_followed_by_fkey"
            columns: ["user_followed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_user_following_fkey"
            columns: ["user_following"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: number
          post_liked: number | null
          user: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_liked?: number | null
          user?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          post_liked?: number | null
          user?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_liked_fkey"
            columns: ["post_liked"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          author: string | null
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user"]
          }
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          display_name: string | null
          id: number
          profile_picture: string | null
          user: string
          username: string | null
        }
        Insert: {
          bio?: string | null
          display_name?: string | null
          id?: number
          profile_picture?: string | null
          user: string
          username?: string | null
        }
        Update: {
          bio?: string | null
          display_name?: string | null
          id?: number
          profile_picture?: string | null
          user?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reposts: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          reposter_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          reposter_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          reposter_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reposts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reposts_reposter_id_fkey"
            columns: ["reposter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
