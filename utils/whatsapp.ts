import { siteContent } from "../data/content";

export interface WhatsAppProductParams {
  productNameEn: string;
  productNameGu: string;
  selectedVariant?: string;
  categoryEn?: string;
  categoryGu?: string;
  lang?: "gu" | "en";
}

/**
 * Creates a contextual WhatsApp enquiry URL
 */
export function createWhatsAppLink({
  productNameEn,
  productNameGu,
  selectedVariant,
  categoryEn,
  categoryGu,
  lang = "gu",
}: WhatsAppProductParams): string {
  const number = siteContent.business.whatsappNumber;
  let message = "";

  if (lang === "gu") {
    message = `નમસ્તે રાધે હાર્ડવેર, મારે "${productNameGu}"`;
    if (selectedVariant) {
      message += ` (સાઈઝ / વેરિઅન્ટ: ${selectedVariant})`;
    }
    if (categoryGu) {
      message += ` [કેટેગરી: ${categoryGu}]`;
    }
    message += ` વિશે પૂછપરછ કરવી છે અને વર્તમાન ભાવ તથા ઉપલબ્ધતા જાણવી છે.`;
  } else {
    message = `Hello Radhe Hardware, I want to inquire about "${productNameEn}"`;
    if (selectedVariant) {
      message += ` (Size / Variant: ${selectedVariant})`;
    }
    if (categoryEn) {
      message += ` [Category: ${categoryEn}]`;
    }
    message += `. Please let me know the current price and availability.`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates general enquiry WhatsApp link
 */
export function createGeneralWhatsAppLink(lang: "gu" | "en" = "gu", topic?: string): string {
  const number = siteContent.business.whatsappNumber;
  let message = "";

  if (lang === "gu") {
    message = topic
      ? `નમસ્તે રાધે હાર્ડવેર, મારે ${topic} વિશે પૂછપરછ કરવી છે.`
      : `નમસ્તે રાધે હાર્ડવેર, મારે ખેતીના સ્પ્રિંકલર / PVC પાઈપો / ઈરીગેશન મટીરીયલ વિશે માહિતી જોઈએ છે.`;
  } else {
    message = topic
      ? `Hello Radhe Hardware, I would like to inquire about ${topic}.`
      : `Hello Radhe Hardware, I would like to inquire about agricultural irrigation / PVC pipes / hardware supplies.`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
