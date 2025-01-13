export type Payment = {
  id: string
  user_id: string
  title: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  is_admin: boolean
}

