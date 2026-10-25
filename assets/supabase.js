/* Trust Bond Board — Supabase client (phase 2).
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
