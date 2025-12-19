/**
 * @fileOverview Centralized Supabase client initialization.
 * (Authentication has been disconnected for development purposes)
 */
const mockSupabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null } }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    signInWithPassword: () => Promise.resolve({ error: { message: 'Auth is disabled' } }),
    signUp: () => Promise.resolve({ error: { message: 'Auth is disabled' } }),
    signOut: () => Promise.resolve({}),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    updateUser: () => Promise.resolve({ error: { message: 'Auth is disabled' } }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: { message: 'DB is disabled' } }),
        maybeSingle: () => Promise.resolve({ data: null, error: { message: 'DB is disabled' } }),
      }),
      upsert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'DB is disabled' } }),
        }),
      }),
    }),
    rpc: () => Promise.resolve({ data: [], error: { message: 'RPC is disabled' } }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ error: { message: 'Storage is disabled' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};


// Client-side, public client for general use.
export const supabase = mockSupabase as any;


// --- Server-side Admin Client ---
export const supabaseAdminClient = mockSupabase as any;
