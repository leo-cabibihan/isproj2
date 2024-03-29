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
      address: {
        Row: {
          barangay: string
          city: string
          house_name: string | null
          house_number: string | null
          id: number
          province: string
          street_name: string | null
          village_name: string | null
          zipcode: number
        }
        Insert: {
          barangay: string
          city: string
          house_name?: string | null
          house_number?: string | null
          id?: number
          province: string
          street_name?: string | null
          village_name?: string | null
          zipcode: number
        }
        Update: {
          barangay?: string
          city?: string
          house_name?: string | null
          house_number?: string | null
          id?: number
          province?: string
          street_name?: string | null
          village_name?: string | null
          zipcode?: number
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action: string
          date: string
          id: string
        }
        Insert: {
          action: string
          date?: string
          id: string
        }
        Update: {
          action?: string
          date?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_log_id_fkey"
            columns: ["id"]
            referencedRelation: "system_owner"
            referencedColumns: ["id"]
          }
        ]
      }
      applications: {
        Row: {
          email: string
          id: number
          name: string
          role: string
          title: string | null
        }
        Insert: {
          email: string
          id?: number
          name: string
          role: string
          title?: string | null
        }
        Update: {
          email?: string
          id?: number
          name?: string
          role?: string
          title?: string | null
        }
        Relationships: []
      }
      beneficiaries: {
        Row: {
          address: string | null
          beneficiary_name: string | null
          charity_id: number | null
          contact: number | null
          date: string
          id: number
          image: number | null
        }
        Insert: {
          address?: string | null
          beneficiary_name?: string | null
          charity_id?: number | null
          contact?: number | null
          date?: string
          id?: number
          image?: number | null
        }
        Update: {
          address?: string | null
          beneficiary_name?: string | null
          charity_id?: number | null
          contact?: number | null
          date?: string
          id?: number
          image?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          }
        ]
      }
      beneficiary_items: {
        Row: {
          charity_id: number | null
          date: string | null
          description: string | null
          event_id: number | null
          id: number
          item_id: number
          quantity: number | null
          receipt: number | null
        }
        Insert: {
          charity_id?: number | null
          date?: string | null
          description?: string | null
          event_id?: number | null
          id?: number
          item_id: number
          quantity?: number | null
          receipt?: number | null
        }
        Update: {
          charity_id?: number | null
          date?: string | null
          description?: string | null
          event_id?: number | null
          id?: number
          item_id?: number
          quantity?: number | null
          receipt?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "beneficiary_items_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beneficiary_items_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beneficiary_items_item_id_fkey"
            columns: ["item_id"]
            referencedRelation: "inventory_item"
            referencedColumns: ["id"]
          }
        ]
      }
      campaign_post: {
        Row: {
          charity_id: number
          charity_member_id: string
          date_posted: string
          id: number
          image_id: string | null
          subheading: string | null
          text: string
          title: string
        }
        Insert: {
          charity_id: number
          charity_member_id: string
          date_posted?: string
          id?: number
          image_id?: string | null
          subheading?: string | null
          text: string
          title: string
        }
        Update: {
          charity_id?: number
          charity_member_id?: string
          date_posted?: string
          id?: number
          image_id?: string | null
          subheading?: string | null
          text?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_post_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_post_charity_member_id_fkey"
            columns: ["charity_member_id"]
            referencedRelation: "charity_member"
            referencedColumns: ["user_uuid"]
          },
          {
            foreignKeyName: "campaign_post_image_id_fkey"
            columns: ["image_id"]
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
      cash: {
        Row: {
          amount: number
          charity_id: number
          date: string
          donor_id: string
          id: number
          image_evidence: number | null
          is_external: boolean
        }
        Insert: {
          amount: number
          charity_id: number
          date?: string
          donor_id: string
          id?: number
          image_evidence?: number | null
          is_external?: boolean
        }
        Update: {
          amount?: number
          charity_id?: number
          date?: string
          donor_id?: string
          id?: number
          image_evidence?: number | null
          is_external?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "cash_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_donor_id_fkey"
            columns: ["donor_id"]
            referencedRelation: "donor"
            referencedColumns: ["id"]
          }
        ]
      }
      charity: {
        Row: {
          about: string
          address_id: number | null
          banner: number | null
          charity_phone: number | null
          charity_verified: boolean | null
          created_at: string | null
          email_address: string | null
          id: number
          logo: number | null
          name: string
        }
        Insert: {
          about: string
          address_id?: number | null
          banner?: number | null
          charity_phone?: number | null
          charity_verified?: boolean | null
          created_at?: string | null
          email_address?: string | null
          id?: number
          logo?: number | null
          name: string
        }
        Update: {
          about?: string
          address_id?: number | null
          banner?: number | null
          charity_phone?: number | null
          charity_verified?: boolean | null
          created_at?: string | null
          email_address?: string | null
          id?: number
          logo?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          }
        ]
      }
      charity_appeals: {
        Row: {
          attachments: number
          charity_id: number
          charity_worker_id: string
          complaint_id: number
          created_at: string
          explanation: string
          id: number
        }
        Insert: {
          attachments: number
          charity_id: number
          charity_worker_id: string
          complaint_id: number
          created_at?: string
          explanation?: string
          id?: number
        }
        Update: {
          attachments?: number
          charity_id?: number
          charity_worker_id?: string
          complaint_id?: number
          created_at?: string
          explanation?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "charity_appeals_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_appeals_charity_worker_id_fkey"
            columns: ["charity_worker_id"]
            referencedRelation: "charity_member"
            referencedColumns: ["user_uuid"]
          },
          {
            foreignKeyName: "charity_appeals_complaint_id_fkey"
            columns: ["complaint_id"]
            referencedRelation: "donor_complaints"
            referencedColumns: ["id"]
          }
        ]
      }
      charity_member: {
        Row: {
          charity_id: number | null
          member_name: string | null
          user_uuid: string
        }
        Insert: {
          charity_id?: number | null
          member_name?: string | null
          user_uuid: string
        }
        Update: {
          charity_id?: number | null
          member_name?: string | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_member_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_member_user_uuid_fkey"
            columns: ["user_uuid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          address: string | null
          contact_no: string | null
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          contact_no?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          contact_no?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      donor: {
        Row: {
          id: string
          name: string | null
          subscribed_notification: boolean
        }
        Insert: {
          id: string
          name?: string | null
          subscribed_notification?: boolean
        }
        Update: {
          id?: string
          name?: string | null
          subscribed_notification?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "donor_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      donor_complaints: {
        Row: {
          charity_id: number | null
          complaint: string
          created_at: string | null
          donor_id: string
          id: number
          image: number | null
        }
        Insert: {
          charity_id?: number | null
          complaint: string
          created_at?: string | null
          donor_id: string
          id?: number
          image?: number | null
        }
        Update: {
          charity_id?: number | null
          complaint?: string
          created_at?: string | null
          donor_id?: string
          id?: number
          image?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "donor_complaints_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donor_complaints_donor_id_fkey"
            columns: ["donor_id"]
            referencedRelation: "donor"
            referencedColumns: ["id"]
          }
        ]
      }
      drop_off_location: {
        Row: {
          address: string | null
          address_id: number | null
          charity_id: number
          id: number
          name: string
        }
        Insert: {
          address?: string | null
          address_id?: number | null
          charity_id: number
          id?: number
          name: string
        }
        Update: {
          address?: string | null
          address_id?: number | null
          charity_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "drop_off_location_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drop_off_location_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          }
        ]
      }
      event: {
        Row: {
          beneficiary_id: number
          charity_id: number
          description: string
          end_date: string | null
          id: number
          name: string
          photo: string | null
          start_date: string | null
        }
        Insert: {
          beneficiary_id: number
          charity_id: number
          description: string
          end_date?: string | null
          id?: number
          name: string
          photo?: string | null
          start_date?: string | null
        }
        Update: {
          beneficiary_id?: number
          charity_id?: number
          description?: string
          end_date?: string | null
          id?: number
          name?: string
          photo?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          }
        ]
      }
      expenses: {
        Row: {
          amount: number
          beneficiary_id: number | null
          charity_id: number | null
          date: string | null
          event_id: number | null
          id: number
          reason: string | null
          receipt: string | null
        }
        Insert: {
          amount: number
          beneficiary_id?: number | null
          charity_id?: number | null
          date?: string | null
          event_id?: number | null
          id?: number
          reason?: string | null
          receipt?: string | null
        }
        Update: {
          amount?: number
          beneficiary_id?: number | null
          charity_id?: number | null
          date?: string | null
          event_id?: number | null
          id?: number
          reason?: string | null
          receipt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            referencedRelation: "beneficiaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory_item: {
        Row: {
          beneficiary_item_id: number | null
          donation_id: number
          expiry: string | null
          id: number
          name: string
          perishable: boolean
          quantity: number
          unit_of_measurement: string
        }
        Insert: {
          beneficiary_item_id?: number | null
          donation_id: number
          expiry?: string | null
          id?: number
          name: string
          perishable?: boolean
          quantity: number
          unit_of_measurement: string
        }
        Update: {
          beneficiary_item_id?: number | null
          donation_id?: number
          expiry?: string | null
          id?: number
          name?: string
          perishable?: boolean
          quantity?: number
          unit_of_measurement?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_item_beneficiary_item_id_fkey"
            columns: ["beneficiary_item_id"]
            referencedRelation: "beneficiary_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_item_donation_id_fkey"
            columns: ["donation_id"]
            referencedRelation: "items_donation_transaction"
            referencedColumns: ["id"]
          }
        ]
      }
      items_donation_transaction: {
        Row: {
          address: string | null
          charity_id: number | null
          date: string
          donor_address_id: number | null
          donor_id: string | null
          donor_name: string | null
          id: number
          image: number | null
          verify: boolean
        }
        Insert: {
          address?: string | null
          charity_id?: number | null
          date?: string
          donor_address_id?: number | null
          donor_id?: string | null
          donor_name?: string | null
          id?: number
          image?: number | null
          verify?: boolean
        }
        Update: {
          address?: string | null
          charity_id?: number | null
          date?: string
          donor_address_id?: number | null
          donor_id?: string | null
          donor_name?: string | null
          id?: number
          image?: number | null
          verify?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "items_donation_transaction_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_donation_transaction_donor_address_id_fkey"
            columns: ["donor_address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_donation_transaction_donor_id_fkey"
            columns: ["donor_id"]
            referencedRelation: "donor"
            referencedColumns: ["id"]
          }
        ]
      }
      log: {
        Row: {
          actions: string
          charity_id: number
          charity_member_id: string
          date: string
          details: string
          id: number
        }
        Insert: {
          actions: string
          charity_id: number
          charity_member_id: string
          date: string
          details: string
          id?: number
        }
        Update: {
          actions?: string
          charity_id?: number
          charity_member_id?: string
          date?: string
          details?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "log_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "log_charity_member_id_fkey"
            columns: ["charity_member_id"]
            referencedRelation: "charity_member"
            referencedColumns: ["user_uuid"]
          }
        ]
      }
      system_owner: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_owner_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      donor_summary: {
        Row: {
          charity_id: number | null
          donor_id: string | null
          name: string | null
          total_cash_donated: number | null
          total_number_of_donations: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_charity_id_fkey"
            columns: ["charity_id"]
            referencedRelation: "charity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_donor_id_fkey"
            columns: ["donor_id"]
            referencedRelation: "donor"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      count_donations_by_charity: {
        Args: Record<PropertyKey, never>
        Returns: {
          charity_id: number
          donation_count: number
        }[]
      }
      countDonations: {
        Args: Record<PropertyKey, never>
        Returns: {
          charity_id: number
          donation_count: number
        }[]
      }
      donationsmonthly: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      expensesmonthly: {
        Args: {
          charity_id: number
        }
        Returns: {
          month: number
          total_expenses: number
        }[]
      }
      get_members: {
        Args: {
          id: number
        }
        Returns: {
          user_uuid: string
          email: string
        }[]
      }
      get_url: {
        Args: {
          post_id: number
        }
        Returns: string
      }
      image_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      monthlyDonation: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      monthlyExpenses: {
        Args: Record<PropertyKey, never>
        Returns: {
          month: number
          total_expenses: number
        }[]
      }
      totaldonations: {
        Args: {
          charity_id: number
        }
        Returns: number
      }
      totalDonations: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      totalexpenses: {
        Args: {
          charity_id: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
