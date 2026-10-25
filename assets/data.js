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
  {id:"chicbags-1", shop:"chicbags", name:"Leather Tote Bag", price:3500, tag:"Tote Bags", img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"},
  {id:"chicbags-2", shop:"chicbags", name:"Party Clutch", price:2200, tag:"Clutches", img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"},
  {id:"chicbags-3", shop:"chicbags", name:"Canvas Shoulder Bag", price:1800, tag:"Shoulder Bags", img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce?q=80&w=800&auto=format&fit=crop"},
  {id:"lawnhouse-1", shop:"lawnhouse", name:"Embroidered Lawn 3-Piece", price:4500, tag:"Lawn Suits", img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"},
  {id:"lawnhouse-2", shop:"lawnhouse", name:"Printed Lawn 2-Piece", price:2800, tag:"Lawn Suits", img:"https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop"},
  {id:"lawnhouse-3", shop:"lawnhouse", name:"Luxury Chiffon Suit", price:6500, tag:"Formal Wear", img:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop"},
  {id:"glowskin-1", shop:"glowskin", name:"Vitamin C Serum", price:2400, tag:"Serums", img:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"},
  {id:"glowskin-2", shop:"glowskin", name:"Hydrating Face Wash", price:1200, tag:"Face Wash", img:"https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"},
  {id:"glowskin-3", shop:"glowskin", name:"Night Repair Cream", price:3000, tag:"Moisturizers", img:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop"},
  {id:"juttipoint-1", shop:"juttipoint", name:"Handmade Leather Khussa", price:2500, tag:"Khussay", img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"},
  {id:"juttipoint-2", shop:"juttipoint", name:"Embroidered Jutti", price:2000, tag:"Juttis", img:"https://images.unsplash.com/photo-1535043934126-cf0b28d52f95?q=80&w=800&auto=format&fit=crop"},
  {id:"juttipoint-3", shop:"juttipoint", name:"Bridal Khussa Set", price:4200, tag:"Bridal", img:"https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"},
  {id:"silvernest-1", shop:"silvernest", name:"925 Silver Ring", price:5500, tag:"Rings", img:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"},
  {id:"silvernest-2", shop:"silvernest", name:"Silver Pendant Set", price:7800, tag:"Pendant Sets", img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"},
  {id:"silvernest-3", shop:"silvernest", name:"Silver Bangles Pair", price:6200, tag:"Bangles", img:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"},
  {id:"menkurta-1", shop:"menkurta", name:"Stitched Cotton Kurta", price:3200, tag:"Stitched Kurtas", img:"https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=800&auto=format&fit=crop"},
  {id:"menkurta-2", shop:"menkurta", name:"Unstitched Kurta Fabric", price:2400, tag:"Unstitched Fabric", img:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"},
  {id:"menkurta-3", shop:"menkurta", name:"Premium Boski Kurta", price:5000, tag:"Premium Wear", img:"https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=800&auto=format&fit=crop"},
  {id:"babybloom-1", shop:"babybloom", name:"Cotton Baby Romper Set", price:1500, tag:"Rompers", img:"https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop"},
  {id:"babybloom-2", shop:"babybloom", name:"Newborn Gift Box", price:3500, tag:"Gift Sets", img:"https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop"},
  {id:"babybloom-3", shop:"babybloom", name:"Winter Baby Suit", price:2200, tag:"Winter Wear", img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop"},
  {id:"decornest-1", shop:"decornest", name:"Handmade Table Lamp", price:4800, tag:"Lamps", img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"},
  {id:"decornest-2", shop:"decornest", name:"Wall Art Frame Set", price:3600, tag:"Wall Art", img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"},
  {id:"decornest-3", shop:"decornest", name:"Ceramic Vase", price:2400, tag:"Vases", img:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop"},
  {id:"mobilecare-1", shop:"mobilecare", name:"Fast Charging Cable", price:800, tag:"Cables", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=800&auto=format&fit=crop"},
  {id:"mobilecare-2", shop:"mobilecare", name:"Leather Phone Cover", price:1200, tag:"Covers", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"},
  {id:"mobilecare-3", shop:"mobilecare", name:"20W Fast Charger", price:1500, tag:"Chargers", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"},
  {id:"fitfuel-1", shop:"fitfuel", name:"Imported Whey Protein 2lb", price:12500, tag:"Whey Protein", img:"https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format&fit=crop"},
  {id:"fitfuel-2", shop:"fitfuel", name:"Creatine Monohydrate", price:6800, tag:"Creatine", img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"},
  {id:"fitfuel-3", shop:"fitfuel", name:"Pre-Workout", price:5500, tag:"Pre-Workout", img:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"},
  {id:"shinemakeup-1", shop:"shinemakeup", name:"Matte Lipstick Set", price:2000, tag:"Lipsticks", img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop"},
  {id:"shinemakeup-2", shop:"shinemakeup", name:"Foundation + Blender Kit", price:3400, tag:"Face Makeup", img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"},
  {id:"shinemakeup-3", shop:"shinemakeup", name:"Eyeshadow Palette", price:2800, tag:"Eye Makeup", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"},
  {id:"watchzone-1", shop:"watchzone", name:"Chronograph Watch", price:9500, tag:"Chronographs", img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop"},
  {id:"watchzone-2", shop:"watchzone", name:"Leather Strap Watch", price:7200, tag:"Leather Strap", img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"},
  {id:"watchzone-3", shop:"watchzone", name:"Steel Bracelet Watch", price:11000, tag:"Steel Bracelet", img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"}
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
