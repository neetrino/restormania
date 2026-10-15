import type { Locale } from "@/i18n/locales";

export type HomeCopy = {
  leadRest: string;
  projectsLead: string;
  projectsBadge: string;
  projectsNote: string;
  tumanyan: string;
  tumanyanBody: string;
  saryanTitle: string;
  saryanBody: string;
  factoryTitle: string;
  factoryBody: string;
  factoryPhone: string;
  pidehTitle: string;
  pidehBody: string;
  newsTitle: string;
  newsCardTitle: string;
  newsCardBody: string;
  newsPrev: string;
  newsNext: string;
  supportTitle: string;
  supportItems: readonly [string, string, string, string];
  hours: string;
};

const hy: HomeCopy = {
  leadRest:
    "-ի առանձնահատկություններից մեկը բիզնեսի իրական գործընթացների հնարավորինս բաց ներկայացումն է։ Արեգը հաճախ խոսում է այն թեմաների մասին, որոնք սովորաբար մնում են բիզնեսի հանրային կերպարի սահմաններից դուրս՝ ֆինանսական և կառավարչական սխալներից մինչև չարդարացված որոշումներ, ձախողված փորձարկումներ և դրանց հետևանքով կատարված փոփոխություններ։",
  projectsLead: "RESTORMANIA-ի",
  projectsBadge: "նախագծերը",
  projectsNote:
    "Restormania-ի առանձնահատկություններից մեկը բիզնեսի իրական գործընթացների հնարավորինս բաց ներկայացումն է։",
  tumanyan: "Թումանյան 23",
  tumanyanBody:
    "հասցեում, ստեղծել ենք մի միջավայր, որտեղ հայկական համերը, երաժշտությունն ու ջերմ հյուրընկալությունը միահյուսվում են՝ յուրաքանչյուր այցը դարձնելով ամբողջական հայկական փորձառություն։",
  saryanTitle: "Սարյան 8",
  saryanBody:
    "հասցեում՝ Kamancha Tapaka Rooms-ը հայկական խոհանոցի նոր փորձառություն է ներկայացնում՝ համադրված գինին վայելելու մշակույթի և Քամանչայի հյուրընկալության հետ։",
  factoryTitle: "Kamancha Factory-ն",
  factoryBody:
    "Քամանչայի առաքման առանձին բաժինն է, որը ստեղծվել է մեր հյուրերի բարձր պահանջարկը բավարարելու և սիրելի ուտեստներն ավելի հասանելի դարձնելու նպատակով։ Առաքումն իրականացվում է Երևանի ողջ տարածքում՝ ամեն օր՝ 10։00–00։00։",
  factoryPhone: "095 711 771",
  pidehTitle: "pideh",
  pidehBody:
    "Restormania-ի առանձնահատկություններից մեկը բիզնեսի իրական գործընթացների հնարավորինս բաց ներկայացումն է։",
  newsTitle: "Հետևեք մեր նորություններին",
  newsCardTitle: "Վերնագիր",
  newsCardBody:
    "Restormania-ի առանձնահատկություններից մեկը բիզնեսի իրական գործընթացների հնարավորինս բաց ներկայացումն է։",
  newsPrev: "Նախորդ նորություն",
  newsNext: "Հաջորդ նորություն",
  supportTitle: "Աջակցություն",
  supportItems: [
    "Առաքում և Վերադարձ",
    "Պայմաններ և դրույթներ",
    "Գաղտնիության քաղաքականություն",
    "Հաճախ տրվող հարցեր",
  ],
  hours: "Երկ–Կիր: 12:00 – 00:00",
};

const en: HomeCopy = {
  leadRest:
    " shows the real work behind the business as openly as possible. Areg often talks about what usually stays outside a public image: financial and management mistakes, decisions that did not pay off, failed experiments, and the changes that followed.",
  projectsLead: "RESTORMANIA",
  projectsBadge: "projects",
  projectsNote:
    "One thing that sets Restormania apart is how openly it shows the real work of the business.",
  tumanyan: "Tumanyan 23",
  tumanyanBody:
    "we created a place where Armenian flavors, music, and warm hospitality come together, so every visit feels like a full Armenian experience.",
  saryanTitle: "Saryan 8",
  saryanBody:
    "Kamancha Tapaka Rooms is a new take on Armenian cuisine, paired with wine and Kamancha hospitality.",
  factoryTitle: "Kamancha Factory",
  factoryBody:
    "Kamancha’s delivery arm, built for guests who want the same dishes at home. Delivery covers Yerevan every day, 10:00–00:00.",
  factoryPhone: "095 711 771",
  pidehTitle: "pideh",
  pidehBody:
    "One thing that sets Restormania apart is how openly it shows the real work of the business.",
  newsTitle: "Follow our news",
  newsCardTitle: "Headline",
  newsCardBody:
    "One thing that sets Restormania apart is how openly it shows the real work of the business.",
  newsPrev: "Previous story",
  newsNext: "Next story",
  supportTitle: "Support",
  supportItems: [
    "Delivery and returns",
    "Terms and conditions",
    "Privacy policy",
    "FAQ",
  ],
  hours: "Mon–Sun: 12:00 – 00:00",
};

const ru: HomeCopy = {
  leadRest:
    " показывает реальную работу бизнеса настолько открыто, насколько это возможно. Арег часто говорит о том, что обычно остаётся за публичным образом: финансовые и управленческие ошибки, неудачные решения, провальные эксперименты и изменения, которые за ними последовали.",
  projectsLead: "RESTORMANIA",
  projectsBadge: "проекты",
  projectsNote:
    "Особенность Restormania — максимально открытый рассказ о реальных процессах бизнеса.",
  tumanyan: "Туманян 23",
  tumanyanBody:
    "мы создали место, где армянские вкусы, музыка и тёплое гостеприимство сплетаются, и каждый визит становится цельным армянским опытом.",
  saryanTitle: "Сарьян 8",
  saryanBody:
    "Kamancha Tapaka Rooms — новый опыт армянской кухни вместе с вином и гостеприимством Каманчи.",
  factoryTitle: "Kamancha Factory",
  factoryBody:
    "Отдельное направление доставки Каманчи: любимые блюда по всему Еревану, каждый день с 10:00 до 00:00.",
  factoryPhone: "095 711 771",
  pidehTitle: "pideh",
  pidehBody:
    "Особенность Restormania — максимально открытый рассказ о реальных процессах бизнеса.",
  newsTitle: "Следите за нашими новостями",
  newsCardTitle: "Заголовок",
  newsCardBody:
    "Особенность Restormania — максимально открытый рассказ о реальных процессах бизнеса.",
  newsPrev: "Предыдущая новость",
  newsNext: "Следующая новость",
  supportTitle: "Поддержка",
  supportItems: [
    "Доставка и возврат",
    "Условия",
    "Политика конфиденциальности",
    "Частые вопросы",
  ],
  hours: "Пн–Вс: 12:00 – 00:00",
};

export const HOME_COPY: Record<Locale, HomeCopy> = { hy, en, ru };

const BOLD_NAMES = [
  "Kamancha Tapaka Rooms",
  "Kamancha Factory",
  "Armat Restaurant",
  "Արեգ Գևորգյանը",
  "Areg Gevorgyan",
  "Арег Геворгян",
  "Restormania",
  "Kamancha",
  "Pideh",
] as const;

/** Wraps known brand and founder names from the bio string. */
export function emphasizeNames(text: string): Array<{ text: string; bold: boolean }> {
  const parts: Array<{ text: string; bold: boolean }> = [];
  let rest = text;

  while (rest.length > 0) {
    const match = earliestName(rest);
    if (!match) {
      parts.push({ text: rest, bold: false });
      break;
    }
    if (match.index > 0) {
      parts.push({ text: rest.slice(0, match.index), bold: false });
    }
    parts.push({ text: match.name, bold: true });
    rest = rest.slice(match.index + match.name.length);
  }

  return parts;
}

function earliestName(text: string): { name: string; index: number } | null {
  let found: { name: string; index: number } | null = null;
  for (const name of BOLD_NAMES) {
    const index = text.indexOf(name);
    if (index === -1) {
      continue;
    }
    if (!found || index < found.index) {
      found = { name, index };
    }
  }
  return found;
}
