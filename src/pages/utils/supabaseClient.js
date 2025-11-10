// supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Reemplaza los siguientes valores con tu Project URL y tu Public Key
const supabaseUrl =  'https://rvrmqcqyfxoognzjpube.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2cm1xY3F5Znhvb2duempwdWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMDIxMTEsImV4cCI6MjA3Nzc3ODExMX0.WH5gDddvbi93xgsqhDJVuBktDQQ7QQb8HglmgSkK9fg' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
