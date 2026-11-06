/* ShoppingOye — Supabase client (phase 2).
   The anon key below is PUBLIC by design: Supabase anon keys ship in browser code.
   Row Level Security limits what it can do: read approved shops, insert submissions
   and disputes. Never put the service_role key in browser code. */
const SUPABASE_URL = "https://ommpgntapydwukofzfwb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbXBnbnRhcHlkd3Vrb2Z6ZndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MjA5OTUsImV4cCI6MjEwODQ5Njk5NX0.KSxCTMwIdCKXU9W7OXrLHlRay3d-cvzbd0WZoexQefo";
const SB_HEADERS = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": "Bearer " + SUPABASE_ANON_KEY,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

/* Returns live approved shops mapped to the site's shop shape, or null on any
   failure (caller keeps demo fallback data when null). */
async function fetchLiveShops(){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/shops?select=*&status=eq.approved&order=boost.desc&order=bond.desc", { headers: SB_HEADERS });
    if(!r.ok) return null;
    const rows = await r.json();
    return rows.map(s => ({
      id: s.id, name: s.name, cat: s.cat, tag: s.tag || "", city: s.city || "",
      handle: s.handle || "", bond: s.bond || 0, boost: s.boost || 0,
      orders: s.orders || 0, desc: s.description || "", pin: s.manage_pin || "",
      bondVerified: s.bond_verified === true
    }));
  } catch(e){ return null; }
}

/* Inserts a shop submission (status defaults to pending). Returns the row or null. */
async function submitShopListing(d){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/shop_submissions", {
      method: "POST", headers: SB_HEADERS, body: JSON.stringify(d)
    });
    if(!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch(e){ return null; }
}

/* Inserts a dispute (status defaults to open). Returns the row or null. */
async function submitDisputeRecord(d){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/disputes", {
      method: "POST", headers: SB_HEADERS, body: JSON.stringify(d)
    });
    if(!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch(e){ return null; }
}

/* Returns all products, or null on any failure (caller keeps demo fallback). */
async function fetchLiveProducts(){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/products?select=*&order=price.asc", { headers: SB_HEADERS });
    if(!r.ok) return null;
    const rows = await r.json();
    return rows.map(p => ({ id: p.id, shop: p.shop_id, name: p.name, price: p.price, tag: p.tag || "", img: p.image_url || "" }));
  } catch(e){ return null; }
}

/* Adds a product (seller management). Returns the row or null. */
async function addProduct(d){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/products", {
      method: "POST", headers: SB_HEADERS, body: JSON.stringify(d)
    });
    if(!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch(e){ return null; }
}

/* Deletes a product by id. Returns true on success. */
async function deleteProduct(id){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/products?id=eq." + encodeURIComponent(id), {
      method: "DELETE", headers: SB_HEADERS
    });
    return r.ok;
  } catch(e){ return false; }
}

/* Updates a product by id. Returns the row or null. */
async function updateProduct(id, patch){
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/products?id=eq." + encodeURIComponent(id), {
      method: "PATCH", headers: SB_HEADERS, body: JSON.stringify(patch)
    });
    if(!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch(e){ return null; }
}

/* ---- Supabase Auth (Phase 15 — seller dashboard) ----
   Auth uses the Supabase JS client, loaded from CDN on dashboard.html:
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   The client persists the session in localStorage and refreshes tokens.
   IMPORTANT: requests made through this client carry the signed-in user's
   JWT, so the RLS owner policies from migration-15 apply. The raw-fetch
   helpers above use the anon key and stay public, so the PIN flow in
   manage.html keeps working unchanged. Never put the service_role key here. */
function getSbClient(){
  if(typeof window.supabase === "undefined" || !window.supabase.createClient) return null;
  if(!window.__sbClient){
    window.__sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  }
  return window.__sbClient;
}

/* Sign-up with email + password. Returns { data, error } (Supabase shape).
   Note: if email confirmation is ON in Supabase, data.session is null until
   the user clicks the confirmation link in their inbox. */
async function authSignUp(email, password){
  const c = getSbClient();
  if(!c) return { data: null, error: { message: "Auth library load nahi hui. Page dobara load karen." } };
  return await c.auth.signUp({ email: email, password: password });
}

/* Sign-in with email + password. Returns { data, error } (Supabase shape). */
async function authSignIn(email, password){
  const c = getSbClient();
  if(!c) return { data: null, error: { message: "Auth library load nahi hui. Page dobara load karen." } };
  return await c.auth.signInWithPassword({ email: email, password: password });
}

/* Sign-out. Returns { error }. */
async function authSignOut(){
  const c = getSbClient();
  if(!c) return { error: { message: "Auth library load nahi hui." } };
  return await c.auth.signOut();
}

/* Current session. Returns { data: { session }, error }. */
async function authGetSession(){
  const c = getSbClient();
  if(!c) return { data: { session: null }, error: null };
  return await c.auth.getSession();
}

/* Sends a password-reset email. Returns { data, error }. */
async function authResetPassword(email){
  const c = getSbClient();
  if(!c) return { data: null, error: { message: "Auth library load nahi hui. Page dobara load karen." } };
  return await c.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
}

/* Shops owned by the signed-in user (RLS: owner_id = auth.uid()).
   Returns mapped rows, or null on failure. */
async function authGetMyShops(){
  const c = getSbClient();
  if(!c) return null;
  const { data: { user } } = await c.auth.getUser();
  if(!user) return null;
  const { data, error } = await c.from("shops").select("*").eq("owner_id", user.id).order("name");
  if(error){ console.error("getMyShops failed", error); return null; }
  return (data || []).map(s => ({
    id: s.id, name: s.name, cat: s.cat, tag: s.tag || "", city: s.city || "",
    handle: s.handle || "", bond: s.bond || 0, boost: s.boost || 0,
    orders: s.orders || 0, desc: s.description || "", bondVerified: s.bond_verified === true,
    status: s.status || ""
  }));
}

/* Disputes filed against the given shop ids (RLS: own shops only).
   Returns rows, [] when there are none, or null on failure.
   Note: disputes has no created_at column yet, so rows come back in
   database order, not newest-first. */
async function authGetMyDisputes(shopIds){
  const c = getSbClient();
  if(!c || !shopIds || !shopIds.length) return [];
  const { data, error } = await c.from("disputes").select("*").in("shop_id", shopIds);
  if(error){ console.error("getMyDisputes failed", error); return null; }
  return data || [];
}

/* Product writes through the signed-in session (RLS owner policies apply).
   Returns the row / true, or null / false on failure. */
async function sbAddProduct(d){
  const c = getSbClient();
  if(!c) return null;
  const { data, error } = await c.from("products").insert(d).select().single();
  if(error){ console.error("sbAddProduct failed", error); return null; }
  return data;
}
async function sbUpdateProduct(id, patch){
  const c = getSbClient();
  if(!c) return null;
  const { data, error } = await c.from("products").update(patch).eq("id", id).select().single();
  if(error){ console.error("sbUpdateProduct failed", error); return null; }
  return data;
}
async function sbDeleteProduct(id){
  const c = getSbClient();
  if(!c) return false;
  const { error } = await c.from("products").delete().eq("id", id);
  if(error){ console.error("sbDeleteProduct failed", error); return false; }
  return true;
}
