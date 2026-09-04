export interface ContentData {
  business: {
    nameGu: string;
    nameEn: string;
    taglineGu: string;
    taglineEn: string;
    secondaryTaglineGu: string;
    secondaryTaglineEn: string;
    allMaterialGu: string;
    allMaterialEn: string;
    trustGu: string;
    trustEn: string;
    blessingGu: string;
    blessingEn: string;
    subsidyGu: string;
    subsidyEn: string;
    wholesaleGu: string;
    wholesaleEn: string;
    phone1: string;
    phone1Display: string;
    phone2: string;
    phone2Display: string;
    whatsappNumber: string;
    addressGu: string;
    addressEn: string;
    mapsUrl: string;
    mapsEmbedCoords: { lat: number; lng: number };
    hoursGu: string;
    hoursEn: string;
    rating: number;
    ratingCount: string;
    isiNumber: string;
    isiLicense: string;
  };
  trustBadges: Array<{
    id: string;
    titleGu: string;
    titleEn: string;
    subtitleGu: string;
    subtitleEn: string;
    icon: string;
  }>;
  categories: Array<{
    id: string;
    titleGu: string;
    titleEn: string;
    descGu: string;
    descEn: string;
    image: string;
    badgeGu: string;
    badgeEn: string;
    highlightsGu: string[];
    highlightsEn: string[];
  }>;
  productFeatures: Array<{
    id: string;
    titleGu: string;
    titleEn: string;
    descGu: string;
    descEn: string;
    image: string;
    tagGu: string;
    tagEn: string;
  }>;
  checklistItems: Array<{
    titleGu: string;
    titleEn: string;
    detailGu: string;
    detailEn: string;
  }>;
  pvcHighlights: Array<{
    icon: string;
    titleGu: string;
    titleEn: string;
    descGu: string;
    descEn: string;
  }>;
  testimonials: Array<{
    id: string;
    nameGu: string;
    nameEn: string;
    villageGu: string;
    villageEn: string;
    commentGu: string;
    commentEn: string;
    rating: number;
    tagGu: string;
    tagEn: string;
  }>;
}

export const siteContent: ContentData = {
  business: {
    nameGu: "રાધે હાર્ડવેર",
    nameEn: "Radhe Hardware",
    taglineGu: "ખેડૂતનો સાચો સાથી",
    taglineEn: "The Farmer's True Companion",
    secondaryTaglineGu: "ઉતમ ગુણવતા • લાંબી ચાલ • ખેડૂતનો ભરોસો",
    secondaryTaglineEn: "Best Quality • Long Life • Farmer's Trust",
    allMaterialGu: "કૃષિ કામ માટેનો દરેક મટીરીયલ એક જ જગ્યાએ!",
    allMaterialEn: "Every material for farm irrigation work, in one place!",
    trustGu: "ભરોસો અમારો, સાથ સદા તમારો",
    trustEn: "Our trust, always standing with you",
    blessingGu: "કૃષ્ણનો આશીર્વાદ, ખેડૂતનો વિકાસ",
    blessingEn: "Krishna's blessing, the farmer's prosperity",
    subsidyGu: "સબસિડી માન્ય P.V.C. પાઈપ મળી જશે",
    subsidyEn: "Govt. Subsidy-approved PVC pipes available",
    wholesaleGu: "હોલસેલ અને રિટેલમાં મળવાનું રહેશે",
    wholesaleEn: "Available for Wholesale & Retail Delivery",
    phone1: "+916355347145",
    phone1Display: "+91 63553 47145",
    phone2: "+917990057301",
    phone2Display: "+91 79900 57301",
    whatsappNumber: "916355347145",
    addressGu: "બસ સ્ટેશન પાસે, લાલપુર, તા. કપડવંજ, જિ. ખેડા, ગુજરાત ૩૮૭૬૫૦",
    addressEn: "Near Bus Stop, Lalpur, Ta. Kapadwanj, Dist. Kheda, Gujarat 387650, India",
    mapsUrl: "https://maps.app.goo.gl/xobBi1EDkKJd7onUA",
    mapsEmbedCoords: { lat: 23.132298, lng: 73.0762797 },
    hoursGu: "દરરોજ સવારે ૭:૦૦ થી સાંજે ૭:૦૦",
    hoursEn: "Open Daily 7:00 AM – 7:00 PM",
    rating: 5.0,
    ratingCount: "5.0 ★ Google Rating",
    isiNumber: "IS:4985",
    isiLicense: "CM/L-2840761",
  },
  trustBadges: [
    {
      id: "isi",
      titleGu: "ISI પ્રમાણિત IS:4985",
      titleEn: "ISI Certified IS:4985",
      subtitleGu: "લાયસન્સ CM/L-2840761",
      subtitleEn: "License CM/L-2840761",
      icon: "ShieldCheck",
    },
    {
      id: "subsidy",
      titleGu: "સબસિડી માન્ય પાઈપ",
      titleEn: "Govt. Subsidy Approved",
      subtitleGu: "ખેડૂત યોજના માન્ય",
      subtitleEn: "Agri Scheme Eligible",
      icon: "Award",
    },
    {
      id: "quality",
      titleGu: "૧૦૦% ઉત્તમ ગુણવત્તા",
      titleEn: "100% Best Quality",
      subtitleGu: "લાંબી ચાલ અને મજબૂત",
      subtitleEn: "Heavy Duty & Durable",
      icon: "Sparkles",
    },
    {
      id: "rating",
      titleGu: "૫.૦★ ગુગલ રેટિંગ",
      titleEn: "5.0★ Google Rating",
      subtitleGu: "૧૦૦% સંતુષ્ટ ખેડૂત મિત્રો",
      subtitleEn: "Trusted by Local Farmers",
      icon: "Star",
    },
    {
      id: "supply",
      titleGu: "હોલસેલ અને રિટેલ",
      titleEn: "Wholesale & Retail",
      subtitleGu: "વ્યાજબી ભાવે ઉપલબ્ધ",
      subtitleEn: "Direct Fair Pricing",
      icon: "Truck",
    },
  ],
  categories: [
    {
      id: "sprinklers",
      titleGu: "સ્પ્રિંકલર અને મીની સ્પ્રિંકલર — ફુલ સેટઅપ",
      titleEn: "Sprinklers & Mini Sprinklers — Full Setup",
      descGu: "બધા જ પ્રકારના સ્પ્રિંકલર, નોઝલ, સ્ટેન્ડ અને કમ્પ્લીટ ફાર્મ ઈરીગેશન સેટઅપ વ્યાજબી ભાવે.",
      descEn: "Complete sprinkler kits, mini sprinkler heads, risers, stands, and nozzles for optimal farm coverage.",
      image: "/images/sprinklers-category.jpg",
      badgeGu: "સૌથી લોકપ્રિય",
      badgeEn: "Most Popular",
      highlightsGu: [
        "બધા પ્રકારના સ્પ્રિંકલર અને નોઝલ",
        "સ્ટેન્ડ (લાકડા/મેટલ સપોર્ટ સાથે)",
        "સેન્ટર ફિલ્ટર અને બોલ વાલ્વ સેટ",
      ],
      highlightsEn: [
        "All types of sprinklers & nozzles",
        "Heavy-duty stands with support poles",
        "Center disc filters & ball valves",
      ],
    },
    {
      id: "pvc",
      titleGu: "સ્વર્ણિમ™ એગ્રીકલ્ચર P.V.C. પાઈપો",
      titleEn: "Swarnim™ Agriculture PVC Pipes",
      descGu: "સરકારી સબસિડી માન્ય, ISI માર્ક IS:4985 સાથે 63mm અને 75mm એગ્રી ક્લાસ-૨ મજબૂત પાઈપ.",
      descEn: "Government subsidy approved, ISI certified IS:4985 63mm & 75mm Agriculture Class-2 durable pipes.",
      image: "/images/pvc-pipes-category.jpg",
      badgeGu: "સબસિડી માન્ય",
      badgeEn: "Subsidy Approved",
      highlightsGu: [
        "૬૩mm અને ૭૫mm એગ્રી ક્લાસ-૨",
        "ટકાઉ, મજબૂત અને લીકેજ પ્રૂફ",
        "ISI માર્ક IS:4985 પ્રમાણિત",
      ],
      highlightsEn: [
        "63mm & 75mm Agri Class-2",
        "Durable, strong & leak-proof",
        "ISI Mark IS:4985 Certified",
      ],
    },
    {
      id: "parts",
      titleGu: "ઈરીગેશન સ્પેરપાર્ટ્સ અને ફીટીંગ્સ",
      titleEn: "Irrigation Spare Parts & Fittings",
      descGu: "કપ્લર, ટી, એલ્બો, નોઝલ, રબર ગ્રોમેટ, બોલ વાલ્વ અને બધા જ એક્સેસરીઝ સ્ટોકમાં હાજર.",
      descEn: "Couplers, tees, elbows, nozzles, rubber grommets, ball valves, and all accessories in stock.",
      image: "/images/spare-parts-category.jpg",
      badgeGu: "સંપૂર્ણ સ્ટોક",
      badgeEn: "Full Stock",
      highlightsGu: [
        "બધા પ્રકારના કપ્લર અને કનેક્ટર્સ",
        "ગ્રીસ ફીટીંગ્સ અને એલ્બો/ટી",
        "બધા કલર અને સાઈઝમાં ઉપલબ્ધ",
      ],
      highlightsEn: [
        "All couplers and quick connectors",
        "Grease fittings, elbows & tees",
        "Assorted colors and sizes available",
      ],
    },
  ],
  productFeatures: [
    {
      id: "stand",
      titleGu: "સ્પ્રિંકલર સ્ટેન્ડ",
      titleEn: "Sprinkler Stand",
      descGu: "ખેતરમાં મજબૂત ટેકા સાથે ઉંચાઈ સેટ કરવા માટે સ્પેશિયલ સ્ટેન્ડ અને સપોર્ટ પોલ્સ.",
      descEn: "Heavy-duty stand with support poles to securely anchor sprinkler risers in the soil.",
      image: "/images/feat-sprinkler-stand.jpg",
      tagGu: "હેવી ડ્યુટી",
      tagEn: "Heavy Duty",
    },
    {
      id: "valve",
      titleGu: "બોલ વાલ્વ",
      titleEn: "Agriculture Ball Valve",
      descGu: "પાણીના પ્રેસરને નિયંત્રિત કરવા માટે ટકાઉ અને સ્મૂથ હેન્ડલવાળા એગ્રી બોલ વાલ્વ.",
      descEn: "Durable high-pressure ball valves with smooth operation for line control.",
      image: "/images/feat-ball-valve.jpg",
      tagGu: "લીકેજ પ્રૂફ",
      tagEn: "Leak Proof",
    },
    {
      id: "filter",
      titleGu: "સેન્ટર ફિલ્ટર",
      titleEn: "Center Filter",
      descGu: "કચરો અને રેતી રોકીને સ્પ્રિંકલર નોઝલ ચોકઅપ થતી અટકાવવા માટે પ્રીમિયમ ફિલ્ટર.",
      descEn: "High-grade screen & disc filtration to prevent nozzle clogging from sand/debris.",
      image: "/images/feat-center-filter.jpg",
      tagGu: "પ્રેસર સેફ",
      tagEn: "Pressure Safe",
    },
    {
      id: "minisprinkler",
      titleGu: "મીની સ્પ્રિંકલર હેડ્સ",
      titleEn: "Mini Sprinkler Heads",
      descGu: "સમાન પાણી છંટકાવ અને પાણીની બચત માટે ઉત્તમ ક્વોલિટીના મીની સ્પ્રિંકલર.",
      descEn: "Uniform micro-water distribution with optimal spray coverage and water savings.",
      image: "/images/feat-mini-sprinkler.jpg",
      tagGu: "પાણીની બચત",
      tagEn: "Water Saving",
    },
    {
      id: "spareparts",
      titleGu: "સ્પેરપાર્ટ્સ અને નોઝલ",
      titleEn: "Spare Parts & Nozzles",
      descGu: "બધા પ્રકારના કનેક્ટર, પાઇપ જોઈન્ટર, વોશર, રબર ગ્રોમેટ અને નોઝલ સ્પેર.",
      descEn: "Full selection of quick connect joiners, washers, rubber grommets, and spray tips.",
      image: "/images/feat-spare-parts.jpg",
      tagGu: "ઓલ સાઈઝ",
      tagEn: "All Sizes",
    },
  ],
  checklistItems: [
    {
      titleGu: "બધા જ પ્રકારના સ્પ્રિંકલર, મીની સ્પ્રિંકલર અને નોઝલ",
      titleEn: "All types of sprinklers, mini sprinklers & nozzles",
      detailGu: "દરેક પ્રકારના પાક માટે ચોક્કસ પાણીના ફેલાવા સાથે ઉત્તમ બનાવટ.",
      detailEn: "Engineered for uniform droplet size and optimum field moisture distribution.",
    },
    {
      titleGu: "બોલ વાલ્વ અને ગ્રીસ ફીટીંગ્સ",
      titleEn: "Ball valves & grease fittings",
      detailGu: "લાંબી આયુષ્ય અને ઝીરો લિકેજ સાથે સ્મૂથ કંટ્રોલ ફિટિંગ્સ.",
      detailEn: "High pressure handling with smooth operation and extended working lifespan.",
    },
    {
      titleGu: "સેન્ટર ફિલ્ટર અને લેટરલ્સ",
      titleEn: "Center filters & laterals",
      detailGu: "પાણીના શુદ્ધિકરણ અને નોઝલ બ્લોકેજ અટકાવવા માટે બેસ્ટ ફિલ્ટરેશન.",
      detailEn: "Prevents silt and residue from blocking sprinkler nozzles and drip lines.",
    },
    {
      titleGu: "ફિક્સ્ચર, સ્ટેન્ડ અને હોસ લાઈન્સ",
      titleEn: "Fixtures, stands & hose lines",
      detailGu: "ખેતરમાં સહેલાઈથી ગોઠવી શકાય તેવા મજબૂત સ્ટેન્ડ અને ટકાઉ પાઈપ લાઈન.",
      detailEn: "Rugged mounting risers and flexible UV-resistant farm hose lines.",
    },
    {
      titleGu: "બધા જ પ્રકારના સ્પેરપાર્ટ્સ સ્ટોકમાં હાજર",
      titleEn: "All spare parts readily available in stock",
      detailGu: "કનેક્ટર, કપલર, નોઝલ પીન, રબર વોશર એક જ જગ્યાએ તાત્કાલિક ઉપલબ્ધ.",
      detailEn: "Never face downtime during irrigation season — every replacement part in shop.",
    },
    {
      titleGu: "સરકારી સબસિડી માન્યતા અને બિલિંગ સહાય",
      titleEn: "Government subsidy approved & official billing support",
      detailGu: "કૃષિ સબસિડી યોજના માટે માન્ય બિલ અને પેપર્સ તાત્કાલિક આપવામાં આવશે.",
      detailEn: "Complete paperwork and authentic GST/ISI documentation for farmer subsidies.",
    },
  ],
  pvcHighlights: [
    {
      icon: "ShieldAlert",
      titleGu: "ટકાઉ અને મજબૂત",
      titleEn: "Durable & Strong",
      descGu: "ઉચ્ચ ગુણવત્તાવાળા રો મટિરિયલથી બનેલી ભારે દબાણ સહન કરતી પાઈપ.",
      descEn: "Built from 100% virgin agricultural-grade PVC to withstand intense soil & water pressure.",
    },
    {
      icon: "Droplets",
      titleGu: "૧૦૦% લીકેજ પ્રૂફ",
      titleEn: "100% Leak-Proof",
      descGu: "પરફેક્ટ સોકેટ અને સીલિંગ સિસ્ટમ જેથી પાણીનું એક પણ ટીપું વેડફાય નહીં.",
      descEn: "Precision engineered socket joints ensure zero water loss across your field lines.",
    },
    {
      icon: "Clock",
      titleGu: "લાંબા સમય ટકાઉ",
      titleEn: "Long-Lasting Life",
      descGu: "તડકો, વરસાદ અને રસાયણો સામે અત્યંત પ્રતિરોધક, વર્ષો સુધી નિશ્ચિંત.",
      descEn: "UV-stabilized and chemical-resistant for enduring performance across multiple seasons.",
    },
  ],
  testimonials: [
    {
      id: "1",
      nameGu: "રમેશભાઈ પટેલ",
      nameEn: "Rameshbhai Patel",
      villageGu: "ખેડૂત મિત્ર, કપડવંજ",
      villageEn: "Farmer, Kapadwanj",
      commentGu: "રાધે હાર્ડવેર માંથી સ્પ્રિંકલરનો આખો સેટ લીધો હતો. ક્વોલિટી એક નંબર છે અને ભાવ પણ આજુબાજુના બજાર કરતા ખૂબ વ્યાજબી છે. દુકાનદાર ભાઈઓનો સ્વભાવ બહુ સરસ છે.",
      commentEn: "Bought a complete sprinkler setup from Radhe Hardware. Excellent quality, fair pricing compared to the local market, and extremely helpful store staff.",
      rating: 5,
      tagGu: "સ્પ્રિંકલર સેટઅપ",
      tagEn: "Sprinkler Setup",
    },
    {
      id: "2",
      nameGu: "જયેશભાઈ ઝાલા",
      nameEn: "Jayeshbhai Zala",
      villageGu: "ખેડૂત મિત્ર, લાલપુર",
      villageEn: "Farmer, Lalpur",
      commentGu: "સ્વર્ણિમ PVC પાઈપો સબસિડી માટે અહીંથી જ લીધી. પાઈપો એકદમ મજબૂત છે અને બિલિંગમાં પણ પૂરો સહકાર આપ્યો. લાલપુર બસ સ્ટેશન પાસે જ છે એટલે પહોંચવું પણ સરળ છે.",
      commentEn: "Purchased Swarnim PVC pipes for government subsidy. The pipes are super durable and they guided me smoothly through the paperwork.",
      rating: 5,
      tagGu: "PVC પાઈપ",
      tagEn: "PVC Pipes",
    },
    {
      id: "3",
      nameGu: "ભરતભાઈ સોલંકી",
      nameEn: "Bharatbhai Solanki",
      villageGu: "ખેડૂત મિત્ર, કઠલાલ",
      villageEn: "Farmer, Kathlal",
      commentGu: "કોઈપણ સ્પેરપાર્ટ કે નોઝલ જોઈતી હોય, અહીં તરત મળી જાય છે. હોલસેલ ભાવે માલ મળે છે. ખેડૂતો માટે સાચો વિશ્વાસપાત્ર સ્ટોર છે.",
      commentEn: "Whenever I need any spare part or nozzle, they always have it in stock at honest wholesale rates. A truly reliable shop for farmers.",
      rating: 5,
      tagGu: "સ્પેરપાર્ટ્સ અને ફીટીંગ્સ",
      tagEn: "Spare Parts & Fittings",
    },
  ],
};
