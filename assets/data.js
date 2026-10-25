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
  const liveProducts = await fetchLiveProducts();
  if(live){ SHOPS = live; }
  if(liveProducts){ PRODUCTS = liveProducts; }
  return !!(live || liveProducts);
}

/* Dummy products for the 12 seed shops (3 per shop). Live products from
   Supabase replace these when loadLiveShops() succeeds. */
const DEMO_PRODUCTS = [
  {id:"chicbags-1", shop:"chicbags", name:"Leather Tote Bag", price:3500, tag:"Tote Bags"},
  {id:"chicbags-2", shop:"chicbags", name:"Party Clutch", price:2200, tag:"Clutches"},
  {id:"chicbags-3", shop:"chicbags", name:"Canvas Shoulder Bag", price:1800, tag:"Shoulder Bags"},
  {id:"lawnhouse-1", shop:"lawnhouse", name:"Embroidered Lawn 3-Piece", price:4500, tag:"Lawn Suits"},
  {id:"lawnhouse-2", shop:"lawnhouse", name:"Printed Lawn 2-Piece", price:2800, tag:"Lawn Suits"},
  {id:"lawnhouse-3", shop:"lawnhouse", name:"Luxury Chiffon Suit", price:6500, tag:"Formal Wear"},
  {id:"glowskin-1", shop:"glowskin", name:"Vitamin C Serum", price:2400, tag:"Serums"},
  {id:"glowskin-2", shop:"glowskin", name:"Hydrating Face Wash", price:1200, tag:"Face Wash"},
  {id:"glowskin-3", shop:"glowskin", name:"Night Repair Cream", price:3000, tag:"Moisturizers"},
  {id:"juttipoint-1", shop:"juttipoint", name:"Handmade Leather Khussa", price:2500, tag:"Khussay"},
  {id:"juttipoint-2", shop:"juttipoint", name:"Embroidered Jutti", price:2000, tag:"Juttis"},
  {id:"juttipoint-3", shop:"juttipoint", name:"Bridal Khussa Set", price:4200, tag:"Bridal"},
  {id:"silvernest-1", shop:"silvernest", name:"925 Silver Ring", price:5500, tag:"Rings"},
  {id:"silvernest-2", shop:"silvernest", name:"Silver Pendant Set", price:7800, tag:"Pendant Sets"},
  {id:"silvernest-3", shop:"silvernest", name:"Silver Bangles Pair", price:6200, tag:"Bangles"},
  {id:"menkurta-1", shop:"menkurta", name:"Stitched Cotton Kurta", price:3200, tag:"Stitched Kurtas"},
  {id:"menkurta-2", shop:"menkurta", name:"Unstitched Kurta Fabric", price:2400, tag:"Unstitched Fabric"},
  {id:"menkurta-3", shop:"menkurta", name:"Premium Boski Kurta", price:5000, tag:"Premium Wear"},
  {id:"babybloom-1", shop:"babybloom", name:"Cotton Baby Romper Set", price:1500, tag:"Rompers"},
  {id:"babybloom-2", shop:"babybloom", name:"Newborn Gift Box", price:3500, tag:"Gift Sets"},
  {id:"babybloom-3", shop:"babybloom", name:"Winter Baby Suit", price:2200, tag:"Winter Wear"},
  {id:"decornest-1", shop:"decornest", name:"Handmade Table Lamp", price:4800, tag:"Lamps"},
  {id:"decornest-2", shop:"decornest", name:"Wall Art Frame Set", price:3600, tag:"Wall Art"},
  {id:"decornest-3", shop:"decornest", name:"Ceramic Vase", price:2400, tag:"Vases"},
  {id:"mobilecare-1", shop:"mobilecare", name:"Fast Charging Cable", price:800, tag:"Cables"},
  {id:"mobilecare-2", shop:"mobilecare", name:"Leather Phone Cover", price:1200, tag:"Covers"},
  {id:"mobilecare-3", shop:"mobilecare", name:"20W Fast Charger", price:1500, tag:"Chargers"},
  {id:"fitfuel-1", shop:"fitfuel", name:"Imported Whey Protein 2lb", price:12500, tag:"Whey Protein"},
  {id:"fitfuel-2", shop:"fitfuel", name:"Creatine Monohydrate", price:6800, tag:"Creatine"},
  {id:"fitfuel-3", shop:"fitfuel", name:"Pre-Workout", price:5500, tag:"Pre-Workout"},
  {id:"shinemakeup-1", shop:"shinemakeup", name:"Matte Lipstick Set", price:2000, tag:"Lipsticks"},
  {id:"shinemakeup-2", shop:"shinemakeup", name:"Foundation + Blender Kit", price:3400, tag:"Face Makeup"},
  {id:"shinemakeup-3", shop:"shinemakeup", name:"Eyeshadow Palette", price:2800, tag:"Eye Makeup"},
  {id:"watchzone-1", shop:"watchzone", name:"Chronograph Watch", price:9500, tag:"Chronographs"},
  {id:"watchzone-2", shop:"watchzone", name:"Leather Strap Watch", price:7200, tag:"Leather Strap"},
  {id:"watchzone-3", shop:"watchzone", name:"Steel Bracelet Watch", price:11000, tag:"Steel Bracelet"}
];

let PRODUCTS = DEMO_PRODUCTS.slice();

function productsForShop(shopId){ return PRODUCTS.filter(p => p.shop === shopId); }

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
