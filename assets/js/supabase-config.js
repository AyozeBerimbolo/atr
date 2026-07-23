// ============================================================
// CONFIGURACIÓN DE SUPABASE
// Sustituye estos dos valores por los de tu proyecto Supabase:
// Project Settings → API → "Project URL" y "anon public key".
// La "anon public key" NO es secreta: está pensada para el navegador,
// la seguridad real la da Row Level Security (ver supabase/schema.sql).
// ============================================================
const SUPABASE_URL = 'https://pkafiqtjgvkjtotpcnud.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_1u-4zBaS-F5UO7mf6JUnvw_ruB9VMPC';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
