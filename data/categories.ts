export interface Subcategory {
  id: string;
  nameEn: string;
  nameGu: string;
  descriptionEn: string;
  descriptionGu: string;
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameGu: string;
  taglineEn: string;
  taglineGu: string;
  descriptionEn: string;
  descriptionGu: string;
  image: string;
  iconName: string;
  badgeEn?: string;
  badgeGu?: string;
  subcategories: Subcategory[];
}

export const mainCategories: Category[] = [
  {
    id: "pvc-pipes",
    slug: "pvc-pipes",
    nameEn: "PVC Pipes",
    nameGu: "PVC પાઈપો",
    taglineEn: "ISI Certified & Agriculture Class",
    taglineGu: "ISI પ્રમાણિત અને એગ્રીકલ્ચર ક્લાસ",
    descriptionEn: "High-grade agricultural and plumbing PVC pipes including ISI IS:4985 certified and subsidy-approved models.",
    descriptionGu: "ઉચ્ચ ગુણવત્તાવાળી કૃષિ અને પ્લમ્બિંગ PVC પાઈપો, ISI IS:4985 પ્રમાણિત અને સરકારી સબસિડી માન્ય.",
    image: "/images/pvc-pipes-category.jpg",
    iconName: "Cylinder",
    badgeEn: "Subsidy Approved",
    badgeGu: "સબસિડી માન્ય",
    subcategories: [
      { id: "isi-agri-pipes", nameEn: "ISI Agriculture Pipes", nameGu: "ISI એગ્રીકલ્ચર પાઈપો", descriptionEn: "IS:4985 certified pipes for farm irrigation", descriptionGu: "ખેતી માટે IS:4985 પ્રમાણિત પાઈપો" },
      { id: "non-isi-pipes", nameEn: "Non-ISI Commercial Pipes", nameGu: "નોન-ISI કોમર્શિયલ પાઈપો", descriptionEn: "Cost-effective commercial grade pipes", descriptionGu: "વ્યાજબી ભાવની કોમર્શિયલ પાઈપો" },
      { id: "plumbing-pvc-pipes", nameEn: "Plumbing PVC Pipes", nameGu: "પ્લમ્બિંગ PVC પાઈપો", descriptionEn: "Durable pipes for residential and farm plumbing", descriptionGu: "ઘર અને ખેત પ્લમ્બિંગ માટેની પાઈપો" },
      { id: "heavy-class-pipes", nameEn: "Class-2 & Class-3 Pipes", nameGu: "ક્લાસ-૨ અને ક્લાસ-૩ પાઈપો", descriptionEn: "High pressure handling pipes (63mm to 110mm)", descriptionGu: "ભારે દબાણ સહન કરતી પાઈપો (૬૩mm થી ૧૧૦mm)" }
    ]
  },
  {
    id: "plumbing-fittings",
    slug: "plumbing-fittings",
    nameEn: "Plumbing Fittings",
    nameGu: "પ્લમ્બિંગ ફિટિંગ્સ",
    taglineEn: "Elbows, Tees, Adapters & Unions",
    taglineGu: "એલ્બો, ટી, એડેપ્ટર અને યુનિયન",
    descriptionEn: "Complete range of PVC plumbing fittings including elbows, tees, male/female adapters, reducers, and unions.",
    descriptionGu: "PVC પ્લમ્બિંગ ફિટિંગ્સની સંપૂર્ણ શ્રેણી: એલ્બો, ટી, મેલ/ફીમેલ એડેપ્ટર, રીડ્યુસર અને યુનિયન.",
    image: "/images/spare-parts-category.jpg",
    iconName: "Wrench",
    badgeEn: "Full Stock",
    badgeGu: "સંપૂર્ણ સ્ટોક",
    subcategories: [
      { id: "elbows", nameEn: "Elbows (90° & 45°)", nameGu: "એલ્બો (૯૦° અને ૪૫°)", descriptionEn: "Heavy-duty PVC elbows", descriptionGu: "હેવી ડ્યુટી PVC એલ્બો" },
      { id: "tees", nameEn: "Tees & Y-Tees", nameGu: "ટી અને વાય-ટી", descriptionEn: "Equal and reducing tees", descriptionGu: "સામાન્ય અને રીડ્યુસીંગ ટી" },
      { id: "couplers", nameEn: "Couplers & Sockets", nameGu: "કપ્લર અને સોકેટ્સ", descriptionEn: "Strong leak-proof couplers", descriptionGu: "મજબૂત લીક-પ્રૂફ કપ્લર" },
      { id: "adapters", nameEn: "MTA & FTA Adapters", nameGu: "MTA અને FTA એડેપ્ટર્સ", descriptionEn: "Male and female threaded adapters", descriptionGu: "મેલ અને ફીમેલ થ્રેડેડ એડેપ્ટર" },
      { id: "reducers", nameEn: "Reducers & Bushings", nameGu: "રીડ્યુસર અને બુશિંગ્સ", descriptionEn: "Pipe size conversion reducers", descriptionGu: "પાઈપ સાઈઝ બદલવા માટેના રીડ્યુસર" },
      { id: "end-caps", nameEn: "End Caps & Plugs", nameGu: "એન્ડ કેપ અને પ્લગ", descriptionEn: "End closures for pipe lines", descriptionGu: "પાઈપ લાઈન બંધ કરવા માટેના કેપ" }
    ]
  },
  {
    id: "sprinkler-system",
    slug: "sprinkler-system",
    nameEn: "Sprinkler System",
    nameGu: "સ્પ્રિંકલર સિસ્ટમ",
    taglineEn: "Full Setups, Risers & Stands",
    taglineGu: "સંપૂર્ણ સેટઅપ, રાઈઝર અને સ્ટેન્ડ",
    descriptionEn: "Complete farm sprinkler systems, stands, risers, nozzles, and pressure lines for uniform crop irrigation.",
    descriptionGu: "ખેતી માટે સંપૂર્ણ સ્પ્રિંકલર સિસ્ટમ, સ્ટેન્ડ, રાઈઝર પાઈપ, નોઝલ અને સમાન પાણી વિતરણ સેટઅપ.",
    image: "/images/sprinklers-category.jpg",
    iconName: "Sparkles",
    badgeEn: "Most Popular",
    badgeGu: "સૌથી લોકપ્રિય",
    subcategories: [
      { id: "full-sprinkler-setups", nameEn: "Complete Sprinkler Setups", nameGu: "સંપૂર્ણ સ્પ્રિંકલર સેટઅપ", descriptionEn: "All-in-one ready to install systems", descriptionGu: "ઇન્સ્ટોલ કરવા માટે તૈયાર આખી સિસ્ટમ" },
      { id: "sprinkler-stands", nameEn: "Sprinkler Stands & Poles", nameGu: "સ્પ્રિંકલર સ્ટેન્ડ અને પોલ્સ", descriptionEn: "Metal tripod and support stands", descriptionGu: "ધાતુના મજબૂત સ્ટેન્ડ અને ટેકા" },
      { id: "impact-sprinklers", nameEn: "Impact Sprinklers & Heads", nameGu: "ઈમ્પેક્ટ સ્પ્રિંકલર હેડ્સ", descriptionEn: "Brass and poly impact spray heads", descriptionGu: "બ્રાસ અને પ્લાસ્ટિક સ્પ્રિંકલર હેડ્સ" },
      { id: "mini-sprinklers", nameEn: "Mini Sprinkler Systems", nameGu: "મીની સ્પ્રિંકલર સિસ્ટમ", descriptionEn: "Micro sprayers for vegetables and cash crops", descriptionGu: "શાકભાજી અને પાક માટે માઇક્રો સ્પ્રેયર" },
      { id: "riser-pipes", nameEn: "Riser Pipes & Assemblies", nameGu: "રાઈઝર પાઈપ અને એસેમ્બલી", descriptionEn: "Vertical riser pipes for height extension", descriptionGu: "ઉંચાઈ વધારવા માટેની રાઈઝર પાઈપ" }
    ]
  },
  {
    id: "sprinkler-fittings",
    slug: "sprinkler-fittings",
    nameEn: "Sprinkler Fittings",
    nameGu: "સ્પ્રિંકલર ફિટિંગ્સ",
    taglineEn: "C-Type, KP Type, Couplers & Laps",
    taglineGu: "C-ટાઈપ, KP ટાઈપ, કપ્લર અને લેપ્સ",
    descriptionEn: "Heavy-duty sprinkler pipe couplers, C-type fittings, KP fittings, PCN male/female combinations, and clamps.",
    descriptionGu: "સ્પ્રિંકલર પાઈપ કપ્લર્સ, C-ટાઈપ ફિટિંગ્સ, KP ફિટિંગ્સ, PCN મેલ/ફીમેલ કોમ્બિનેશન અને ક્લેમ્પ્સ.",
    image: "/images/feat-sprinkler-stand.jpg",
    iconName: "Boxes",
    badgeEn: "Heavy Duty",
    badgeGu: "હેવી ડ્યુટી",
    subcategories: [
      { id: "c-type-fittings", nameEn: "C-Type Couplers & Fittings", nameGu: "C-ટાઈપ કપ્લર અને ફિટિંગ્સ", descriptionEn: "Quick latch C-type couplers (75mm, 90mm, 110mm)", descriptionGu: "ઝડપી લોક વાળા C-ટાઈપ કપ્લર્સ" },
      { id: "kp-type-fittings", nameEn: "KP Type Sprinkler Fittings", nameGu: "KP ટાઈપ સ્પ્રિંકલર ફિટિંગ્સ", descriptionEn: "KP standard agricultural fittings", descriptionGu: "KP સ્ટાન્ડર્ડ એગ્રીકલ્ચર ફિટિંગ્સ" },
      { id: "pcn-fittings", nameEn: "PCN Combinations & Reducers", nameGu: "PCN કોમ્બિનેશન અને રીડ્યુસર્સ", descriptionEn: "PCN male/female bed and reducer fittings", descriptionGu: "PCN મેલ/ફીમેલ બેડ અને રીડ્યુસર ફિટિંગ્સ" },
      { id: "ss-ms-laps", nameEn: "SS & MS Laps", nameGu: "SS અને MS લેપ્સ", descriptionEn: "Stainless steel & mild steel lap joints", descriptionGu: "સ્ટેનલેસ સ્ટીલ અને MS લેપ જોઈન્ટ્સ" },
      { id: "rain-guns", nameEn: "Rain Guns (1\" to 2\")", nameGu: "રેઈન ગન (૧\" થી ૨\")", descriptionEn: "High-radius agricultural rain guns", descriptionGu: "મોટા વિસ્તાર માટે રેઈન ગન" }
    ]
  },
  {
    id: "drip-irrigation",
    slug: "drip-irrigation",
    nameEn: "Drip Irrigation",
    nameGu: "ડ્રિપ ઈરીગેશન",
    taglineEn: "Drippers, Lateral Cocks & Start Connectors",
    taglineGu: "ડ્રિપર્સ, લેટરલ કોક અને સ્ટાર્ટ કનેક્ટર",
    descriptionEn: "Precision micro-irrigation supplies including inline drippers, start connectors, grommets, lateral cocks, and flush valves.",
    descriptionGu: "સૂક્ષ્મ સિંચાઈ સાધનો: ઇનલાઈન ડ્રિપર્સ, સ્ટાર્ટ કનેક્ટર્સ, ગ્રોમેટ્સ, લેટરલ કોક અને ફ્લશ વાલ્વ.",
    image: "/images/spare-parts-category.jpg",
    iconName: "Droplets",
    badgeEn: "Water Saving",
    badgeGu: "પાણીની બચત",
    subcategories: [
      { id: "drippers-emitters", nameEn: "Drippers & Foggers", nameGu: "ડ્રિપર્સ અને ફોગર્સ", descriptionEn: "Pressure compensating and turbo drippers", descriptionGu: "પ્રેશર કમ્પેન્સેટીંગ અને ટર્બો ડ્રિપર્સ" },
      { id: "start-connectors", nameEn: "Start Connectors & Take-Offs", nameGu: "સ્ટાર્ટ કનેક્ટર અને ટેક-ઓફ", descriptionEn: "Main line to lateral connection fittings", descriptionGu: "મેઈન લાઈનથી લેટરલ જોડવા માટેના કનેક્ટર" },
      { id: "grommets-seals", nameEn: "Rubber Grommets", nameGu: "રબર ગ્રોમેટ્સ અને સીલ", descriptionEn: "Leak-proof rubber grommets for drill holes", descriptionGu: "કાણામાં લીક રોકવા માટે રબર ગ્રોમેટ" },
      { id: "lateral-valves", nameEn: "Lateral Cocks & Flush Valves", nameGu: "લેટરલ કોક અને ફ્લશ વાલ્વ", descriptionEn: "Line control mini valves and end flush valves", descriptionGu: "લાઈન કંટ્રોલ મીની વાલ્વ અને ફ્લશ વાલ્વ" },
      { id: "drip-joiners", nameEn: "Drip Joiners & Tees", nameGu: "ડ્રિપ જોઈનર અને ટી", descriptionEn: "16mm and 12mm tubing joiners and tees", descriptionGu: "૧૬mm અને ૧૨mm પાઈપ જોઈનર અને ટી" }
    ]
  },
  {
    id: "rain-pipe-fittings",
    slug: "rain-pipe-fittings",
    nameEn: "Rain Pipe & Fittings",
    nameGu: "રેઈન પાઈપ અને ફિટિંગ્સ",
    taglineEn: "40mm Rain Pipes, Cocks & Adaptors",
    taglineGu: "૪૦mm રેઈન પાઈપ, કોક અને એડેપ્ટર",
    descriptionEn: "Complete laser-punched rain pipe systems, 40mm MTA/FTA cocks, grommet cocks, joiners, and drill bits.",
    descriptionGu: "લેસર પંચવાળી રેઈન પાઈપ સિસ્ટમ, ૪૦mm MTA/FTA કોક, ગ્રોમેટ કોક, જોઈનર અને ડ્રીલ બીટ.",
    image: "/images/hero-irrigation.jpg",
    iconName: "CloudRain",
    badgeEn: "Direct Spray",
    badgeGu: "સીધો છંટકાવ",
    subcategories: [
      { id: "rain-pipes-40mm", nameEn: "40mm Rain Pipes", nameGu: "૪૦mm રેઈન પાઈપો", descriptionEn: "Ajanta, Kishan & Microdrop rain pipes", descriptionGu: "અજંતા, કિશન અને માઈક્રોડ્રોપ રેઈન પાઈપ" },
      { id: "rain-pipe-cocks", nameEn: "MTA, FTA & Grommet Cocks", nameGu: "MTA, FTA અને ગ્રોમેટ કોક", descriptionEn: "Heavy-duty control cocks for rain pipes", descriptionGu: "રેઈન પાઈપ માટે હેવી કંટ્રોલ કોક" },
      { id: "rain-pipe-joiners", nameEn: "Rain Pipe Joiners & End Caps", nameGu: "રેઈન પાઈપ જોઈનર અને એન્ડ કેપ", descriptionEn: "Connecting and ending fittings for 40mm pipes", descriptionGu: "૪૦mm પાઈપ જોડવા અને બંધ કરવા માટેના ફિટિંગ્સ" },
      { id: "special-adapters", nameEn: "75x32 MTA/FTA Thread C-Type SS", nameGu: "૭૫x૩૨ MTA/FTA થ્રેડ C-ટાઈપ SS", descriptionEn: "Stainless steel threaded adaptors for main lines", descriptionGu: "મેઈન લાઈન માટે સ્ટેનલેસ સ્ટીલ થ્રેડેડ એડેપ્ટર" }
    ]
  },
  {
    id: "valves",
    slug: "valves",
    nameEn: "Valves",
    nameGu: "વાલ્વ્સ",
    taglineEn: "Ball Valves, Butterfly & Air Valves",
    taglineGu: "બોલ વાલ્વ, બટરફ્લાય અને એર વાલ્વ",
    descriptionEn: "Agricultural control valves: solid PVC ball valves, PP ball valves, air release valves, butterfly valves, and non-return check valves.",
    descriptionGu: "કૃષિ કંટ્રોલ વાલ્વ: સોલિડ PVC બોલ વાલ્વ, PP બોલ વાલ્વ, એર વાલ્વ, બટરફ્લાય વાલ્વ અને ચેક વાલ્વ.",
    image: "/images/feat-ball-valve.jpg",
    iconName: "SlidersHorizontal",
    badgeEn: "Leak Proof",
    badgeGu: "લીકેજ પ્રૂફ",
    subcategories: [
      { id: "pp-ball-valves", nameEn: "PP Ball Valves (Single & Solid)", nameGu: "PP બોલ વાલ્વ (સિંગલ અને સોલિડ)", descriptionEn: "Durable smooth quarter-turn ball valves", descriptionGu: "ટકાઉ અને સ્મૂથ હેન્ડલવાળા બોલ વાલ્વ" },
      { id: "air-valves", nameEn: "Air Release Valves", nameGu: "એર રીલીઝ વાલ્વ", descriptionEn: "Automatic air release valves for piping safety", descriptionGu: "પાઈપલાઈન સુરક્ષા માટે એર વાલ્વ" },
      { id: "butterfly-valves", nameEn: "Butterfly Valves", nameGu: "બટરફ્લાય વાલ્વ", descriptionEn: "Flanged butterfly valves for large volume lines", descriptionGu: "મોટી લાઈનો માટે ફ્લેંજવાળા બટરફ્લાય વાલ્વ" },
      { id: "flush-valves", nameEn: "Flush & Drain Valves", nameGu: "ફ્લશ અને ડ્રેઇન વાલ્વ", descriptionEn: "Line cleaning and sediment discharge valves", descriptionGu: "કચરો કાઢવા માટેના ફ્લશ વાલ્વ" }
    ]
  },
  {
    id: "filters",
    slug: "filters",
    nameEn: "Filters",
    nameGu: "ફિલ્ટર્સ",
    taglineEn: "Center, Screen, Disc & Hydrocyclone",
    taglineGu: "સેન્ટર, સ્ક્રીન, ડિસ્ક અને હાઇડ્રોસાયક્લોન",
    descriptionEn: "High-capacity filtration systems including center disc filters, screen filters, hydrocyclone sand separators, and header assemblies.",
    descriptionGu: "ઉચ્ચ ક્ષમતાવાળા ફિલ્ટરેશન સાધનો: સેન્ટર ડિસ્ક ફિલ્ટર, સ્ક્રીન ફિલ્ટર, હાઇડ્રોસાયક્લોન અને હેડર એસેમ્બલી.",
    image: "/images/feat-center-filter.jpg",
    iconName: "Filter",
    badgeEn: "Clog Free",
    badgeGu: "ચોકઅપ મુક્ત",
    subcategories: [
      { id: "disc-filters", nameEn: "Disc Filters", nameGu: "ડિસ્ક ફિલ્ટર્સ", descriptionEn: "Micron grooved disc filters for farm water", descriptionGu: "બારીક કચરો રોકવા માટે ડિસ્ક ફિલ્ટર" },
      { id: "screen-filters", nameEn: "Screen Mesh Filters", nameGu: "સ્ક્રીન મેશ ફિલ્ટર્સ", descriptionEn: "Stainless steel mesh screen filters", descriptionGu: "સ્ટેનલેસ સ્ટીલ જાળીવાળા સ્ક્રીન ફિલ્ટર" },
      { id: "hydrocyclone", nameEn: "Hydrocyclone Sand Separators", nameGu: "હાઇડ્રોસાયક્લોન સેન્ડ સેપરેટર", descriptionEn: "Centrifugal sand separators for borewell water", descriptionGu: "બોરવેલની રેતી દૂર કરવા માટે સેપરેટર" },
      { id: "header-assembly", nameEn: "Header Assemblies", nameGu: "હેડર એસેમ્બલી", descriptionEn: "Dual filter header manifolds with pressure gauges", descriptionGu: "ડબલ ફિલ્ટર હેડર એસેમ્બલી" }
    ]
  },
  {
    id: "irrigation-accessories",
    slug: "irrigation-accessories",
    nameEn: "Irrigation Accessories",
    nameGu: "ઈરીગેશન એક્સેસરીઝ",
    taglineEn: "Venturi, Gauges, Bits & Clamps",
    taglineGu: "વેન્ચુરી, પ્રેશર ગેજ, બીટ અને ક્લેમ્પ",
    descriptionEn: "Fertigation Venturi injectors, Super Venturis, stainless pressure gauges, drill bits, hand punchers, and pipe clamps.",
    descriptionGu: "ખાતર માટે વેન્ચુરી ઇન્જેક્ટર, સુપર વેન્ચુરી, પ્રેશર ગેજ, ડ્રીલ બીટ, હેન્ડ પંચર અને પાઈપ ક્લેમ્પ્સ.",
    image: "/images/spare-parts-category.jpg",
    iconName: "Gauge",
    badgeEn: "Essential Tools",
    badgeGu: "જરૂરી સાધનો",
    subcategories: [
      { id: "ventury-injectors", nameEn: "Venturi & Super Venturi", nameGu: "વેન્ચુરી અને સુપર વેન્ચુરી", descriptionEn: "Fertilizer suction injectors (3/4\" to 2\")", descriptionGu: "ખાતર ચઢાવવા માટે વેન્ચુરી ઇન્જેક્ટર" },
      { id: "pressure-gauges", nameEn: "Pressure Gauges", nameGu: "પ્રેશર ગેજ", descriptionEn: "Glycerin filled pressure monitoring dials", descriptionGu: "પાણીનું દબાણ માપવા માટેના મીટર" },
      { id: "drill-bits-punches", nameEn: "Drill Bits & Hand Bits", nameGu: "ડ્રીલ બીટ અને હેન્ડ પંચર", descriptionEn: "Precision hole cutting tools for PVC and drip pipes", descriptionGu: "કાણા પાડવા માટેના સ્પેશિયલ બીટ્સ" },
      { id: "pipe-clamps", nameEn: "Pipe Clamps & Saddles", nameGu: "પાઈપ ક્લેમ્પ અને સેડલ", descriptionEn: "Heavy service saddles and securing clamps", descriptionGu: "પાઈપ ફીટ કરવા માટેના ક્લેમ્પ અને સેડલ" }
    ]
  },
  {
    id: "fabricated-threaded-fittings",
    slug: "fabricated-threaded-fittings",
    nameEn: "Fabricated / Threaded Fittings",
    nameGu: "ફેબ્રિકેટેડ / થ્રેડેડ ફિટિંગ્સ",
    taglineEn: "RFTA, RMTA, Thread Bends & Nipples",
    taglineGu: "RFTA, RMTA, થ્રેડ બેન્ડ અને નીપલ",
    descriptionEn: "Precision fabricated PVC threaded fittings: RFTA, RMTA, Thread Bends, and Thread Nipples in lengths from 4\" to 12\".",
    descriptionGu: "ચોક્કસ માપવાળા ફેબ્રિકેટેડ થ્રેડેડ ફિટિંગ્સ: RFTA, RMTA, થ્રેડ બેન્ડ અને ૪\" થી ૧૨\" લંબાઈના થ્રેડ નીપલ.",
    image: "/images/feat-sprinkler-stand.jpg",
    iconName: "GitMerge",
    badgeEn: "Custom Lengths",
    badgeGu: "વિવિધ લંબાઈ",
    subcategories: [
      { id: "rfta-rmta", nameEn: "RFTA & RMTA Fittings", nameGu: "RFTA અને RMTA ફિટિંગ્સ", descriptionEn: "Reducing female & male threaded adapters", descriptionGu: "રીડ્યુસીંગ ફીમેલ અને મેલ થ્રેડેડ એડેપ્ટર્સ" },
      { id: "thread-bends", nameEn: "Thread Bends (75mm to 110mm)", nameGu: "થ્રેડ બેન્ડ (૭૫mm થી ૧૧૦mm)", descriptionEn: "Heavy-duty fabricated curved bends with threading", descriptionGu: "આંટાવાળા મજબૂત થ્રેડ બેન્ડ" },
      { id: "thread-nipples", nameEn: "Thread Nipples (4\" to 12\")", nameGu: "થ્રેડ નીપલ (૪\" થી ૧૨\")", descriptionEn: "75mm, 90mm & 110mm threaded pipe nipples", descriptionGu: "૭૫mm, ૯૦mm અને ૧૧૦mm ના થ્રેડ નીપલ" }
    ]
  },
  {
    id: "fittings-spare-parts",
    slug: "fittings-spare-parts",
    nameEn: "Fittings & Spare Parts",
    nameGu: "ફિટિંગ્સ અને સ્પેરપાર્ટ્સ",
    taglineEn: "Washers, PVC Rings, Grommets & Plugs",
    taglineGu: "વોશર, PVC રીંગ, ગ્રોમેટ અને પ્લગ",
    descriptionEn: "Complete repository of replacement spare parts: rubber washers, flange gaskets, PVC rings, nozzles, and joiners.",
    descriptionGu: "સ્પેરપાર્ટ્સનો સંપૂર્ણ સંગ્રહ: રબર વોશર, ફ્લેંજ ગેસ્કેટ, PVC રીંગ, નોઝલ પીન અને જોઈનર્સ.",
    image: "/images/spare-parts-category.jpg",
    iconName: "Layers",
    badgeEn: "All Sizes",
    badgeGu: "બધી સાઈઝ",
    subcategories: [
      { id: "rubber-washers", nameEn: "Rubber Washers & Rings", nameGu: "રબર વોશર અને રીંગ", descriptionEn: "Sprinkler & flange sealing rubber rings", descriptionGu: "સ્પ્રિંકલર અને ફ્લેંજ માટે રબર વોશર" },
      { id: "pvc-rings", nameEn: "PVC Rings & Seals", nameGu: "PVC રીંગ અને સીલ", descriptionEn: "Locking rings for irrigation couplers", descriptionGu: "કપ્લર લોક કરવા માટે PVC રીંગ" },
      { id: "flange-accessories", nameEn: "Flange Blinds & Washers", nameGu: "ફ્લેંજ બ્લાઈન્ડ અને વોશર", descriptionEn: "Blind flanges and full-face rubber gaskets", descriptionGu: "બ્લાઈન્ડ ફ્લેંજ અને રબર ગેસ્કેટ" },
      { id: "nozzle-spares", nameEn: "Nozzle Spares & Grommets", nameGu: "નોઝલ સ્પેર અને ગ્રોમેટ", descriptionEn: "Replacement spray nozzles and hole grommets", descriptionGu: "બદલવા માટેની નોઝલ અને ગ્રોમેટ્સ" }
    ]
  },
  {
    id: "agriculture-hardware",
    slug: "agriculture-hardware",
    nameEn: "Agriculture Hardware",
    nameGu: "એગ્રીકલ્ચર હાર્ડવેર",
    taglineEn: "Farm Tools, Heavy Fittings & Hoses",
    taglineGu: "ખેત ઓજારો, હેવી ફિટિંગ્સ અને હોસ",
    descriptionEn: "Agricultural hardware essentials: heavy hose lines, metal support stands, installation tools, and farming plumbing supplies.",
    descriptionGu: "કૃષિ હાર્ડવેર સાધનો: હેવી હોસ પાઈપ, મેટલ સપોર્ટ સ્ટેન્ડ, ઇન્સ્ટોલેશન ટૂલ્સ અને ફાર્મ પ્લમ્બિંગ મટીરીયલ.",
    image: "/images/hero-irrigation.jpg",
    iconName: "Hammer",
    badgeEn: "Farm Ready",
    badgeGu: "ખેડૂત ઉપયોગી",
    subcategories: [
      { id: "farm-hose-lines", nameEn: "Heavy-Duty Hose Lines", nameGu: "હેવી હોસ લાઈન્સ", descriptionEn: "Flexible UV-resistant water delivery hoses", descriptionGu: "તડકા સામે ટકાઉ ફ્લેક્સિબલ હોસ લાઈન" },
      { id: "tripod-stands", nameEn: "Tripod Stands & Heavy Poles", nameGu: "ટ્રાઈપોડ સ્ટેન્ડ અને પોલ્સ", descriptionEn: "Galvanized metal risers and soil anchor bases", descriptionGu: "ગેલ્વેનાઈઝ્ડ મેટલ સ્ટેન્ડ અને ગ્રાઉન્ડ બેઝ" },
      { id: "installation-tools", nameEn: "Installation & Maintenance Tools", nameGu: "ફિટિંગ અને રીપેરીંગ ટૂલ્સ", descriptionEn: "Pipe wrenches, cutters, and joint tighteners", descriptionGu: "પાઈપ પાના, કટર અને ફિટિંગ ઓજારો" }
    ]
  }
];
