/* Trust Bond Board v0 — seed data (DEMO listings, not real sellers) */
const CATEGORIES = [
  {slug:"electronic-accessories", name:"Electronic Accessories", icon:"🎧", subs:["Mobile Accessories","Headphones & Headsets","Computer Accessories","Gaming Accessories","Wearable","Storage"]},
  {slug:"tv-home-appliances", name:"TV & Home Appliances", icon:"📺", subs:["Kitchen Appliances","Home Audio & Theater","Televisions","Air Conditioner","Washing Machine"]},
  {slug:"health-beauty", name:"Health & Beauty", icon:"💄", subs:["Skin Care","Makeup","Hair Care","Fragrances","Bath & Body","Personal Care"]},
  {slug:"mother-baby", name:"Mother & Baby", icon:"👶", subs:["Clothing & Accessories","Baby Gear","Feeding","Toys & Games","Baby Personal Care"]},
  {slug:"electronic-devices", name:"Electronic Devices", icon:"📱", subs:["Smart Phones","Smart Watches","Laptops","Cameras & Drones","Gaming Consoles"]},
  {slug:"groceries-pets", name:"Groceries & Pets", icon:"🛒", subs:["Food Staples","Beverages","Choco & Snacks","Breakfast","Laundry & Household"]},
  {slug:"home-lifestyle", name:"Home & Lifestyle", icon:"🏠", subs:["Decor","Bedding","Furniture","Lighting","Stationery & Craft"]},
  {slug:"womens-fashion", name:"Women's Fashion", icon:"👗", subs:["Unstitched Fabric","Kurtas & Shalwar Kameez","Dresses & Skirts","Tops","Muslim Wear","Girls Clothing"]},
  {slug:"mens-fashion", name:"Men's Fashion", icon:"👔", subs:["Kurtas & Shalwar Kameez","Shirts & Polo","T-Shirts & Tanks","Shoes","Pants & Jeans"]},
  {slug:"watches-bags-jewellery", name:"Watches, Bags & Jewellery", icon:"👜", subs:["Womens Bags","Mens Bags","Womens Jewellery","Mens Jewellery","Womens Watches","Sunglasses & Eyewear"]},
  {slug:"sports-outdoor", name:"Sports & Outdoor", icon:"🏋️", subs:["Exercise & Fitness","Supplements","Sports Accessories","Shoes & Clothing"]},
  {slug:"automotive-motorbike", name:"Automotive & Motorbike", icon:"🏍️", subs:["Automotive","Motorcycle","Loaders & Rickshaw"]}
];

/* bond = refundable trust deposit (amanat). boost = monthly, non-refundable rank bid.
   Rank inside a category = boost desc, then bond desc. */
const DEMO_SHOPS = [
  {id:"chicbags", name:"ChicBags", cat:"watches-bags-jewellery", tag:"Womens Bags", city:"Lahore", handle:"@chicbags", bond:10000, boost:5000, orders:120, desc:"Handbags, clutches and totes. COD available nationwide."},
  {id:"lawnhouse", name:"LawnHouse", cat:"womens-fashion", tag:"Unstitched Fabric", city:"Karachi", handle:"@lawnhouse.pk", bond:15000, boost:8000, orders:340, desc:"Unstitched lawn and embroidered 3-piece suits, direct from mills."},
  {id:"glowskin", name:"GlowSkin.pk", cat:"health-beauty", tag:"Skin Care", city:"Islamabad", handle:"@glowskin.pk", bond:12000, boost:6500, orders:210, desc:"Original skincare, batch-checked. No replicas, ever."},
  {id:"juttipoint", name:"JuttiPoint", cat:"womens-fashion", tag:"Girls Shoes", city:"Lahore", handle:"@juttipoint", bond:8000, boost:3000, orders:95, desc:"Handmade khussay and juttis in leather and embroidery."},
  {id:"silvernest", name:"SilverNest", cat:"watches-bags-jewellery", tag:"Womens Jewellery", city:"Karachi", handle:"@silvernest.pk", bond:20000, boost:10000, orders:180, desc:"925 silver jewellery with exchange guarantee."},
  {id:"menkurta", name:"MenKurta", cat:"mens-fashion", tag:"Kurtas & Shalwar Kameez", city:"Faisalabad", handle:"@menkurta", bond:7000, boost:2500, orders:140, desc:"Stitched and unstitched mens kurta fabric, wholesale rates."},
  {id:"babybloom", name:"BabyBloom", cat:"mother-baby", tag:"Clothing & Accessories", city:"Lahore", handle:"@babybloom.pk", bond:9000, boost:4000, orders:160, desc:"Soft cotton baby clothes, 0 to 24 months."},
  {id:"decornest", name:"DecorNest", cat:"home-lifestyle", tag:"Decor", city:"Islamabad", handle:"@decornest.pk", bond:11000, boost:4500, orders:88, desc:"Home decor, lamps and wall art, made to order."},
  {id:"mobilecare", name:"MobileCare", cat:"electronic-accessories", tag:"Mobile Accessories", city:"Karachi", handle:"@mobilecare.pk", bond:6000, boost:2000, orders:260, desc:"Chargers, cables and covers. 7-day replacement promise."},
  {id:"fitfuel", name:"FitFuel", cat:"sports-outdoor", tag:"Supplements", city:"Lahore", handle:"@fitfuel.pk", bond:14000, boost:7000, orders:110, desc:"Imported whey and creatine with sealed-pack guarantee."},
  {id:"shinemakeup", name:"ShineMakeup", cat:"health-beauty", tag:"Makeup", city:"Karachi", handle:"@shinemakeup.pk", bond:13000, boost:6000, orders:190, desc:"Original makeup brands, shade-exchange available."},
  {id:"watchzone", name:"WatchZone", cat:"watches-bags-jewellery", tag:"Mens Watches", city:"Lahore", handle:"@watchzone.pk", bond:18000, boost:9000, orders:150, desc:"Mens watches with 1-year movement warranty."}
];

/* Live data: SHOPS starts as the demo fallback, then loadLiveShops() swaps in
   the approved shops from Supabase. On any fetch failure the demo data stays,
   so the site never breaks. */
let SHOPS = DEMO_SHOPS.slice();

async function loadLiveShops(){
  const live = await fetchLiveShops();
  if(live){ SHOPS = live; return true; }
  return false;
}

function catBySlug(slug){ return CATEGORIES.find(c => c.slug === slug); }
function rankedShops(catSlug){
  return SHOPS.filter(s => s.cat === catSlug)
    .sort((a,b) => (b.boost - a.boost) || (b.bond - a.bond));
}
function money(n){ return "Rs " + n.toLocaleString("en-PK"); }
function param(name){
  const m = new URLSearchParams(location.search).get(name);
  return m ? decodeURIComponent(m) : null;
}
