// supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Reemplaza los siguientes valores con tu Project URL y tu Public Key
const supabaseUrl =  import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
