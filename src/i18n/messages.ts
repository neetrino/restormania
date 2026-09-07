import type { Locale } from "./locales";

export type Messages = {
  nav: {
    about: string;
    founder: string;
    projects: string;
    main: string;
  };
  hero: {
    subtitle: string;
  };
  brands: {
    projectsLabel: string;
    more: string;
  };
  about: {
    title: string;
    paragraphs: readonly [string, string, string];
  };
  founder: {
    title: string;
    photoAlt: string;
    bio: string;
  };
  footer: {
    headline: string;
    navigation: string;
    contact: string;
    about: string;
    news: string;
    contactLink: string;
    address: string;
    hours: string;
    copyright: string;
  };
  language: string;
};

export const messages: Record<Locale, Messages> = {
  hy: {
    nav: {
      about: "Restormania-ի մասին",
      founder: "Հիմնադիր",
      projects: "Նախագծեր",
      main: "Հիմնական",
    },
    hero: {
      subtitle: "Երկու վայր, մեկ պատմություն",
    },
    brands: {
      projectsLabel: "Նախագծեր",
      more: "Ավելին",
    },
    about: {
      title: "Restormania-ի մասին",
      paragraphs: [
        "Սարյան 8 հասցեում՝ Kamancha Tapaka Rooms-ը հայկական խոհանոցի նոր փորձառություն է ներկայացնում՝ համադրված գինին վայելելու մշակույթի և Քամանչայի հյուրընկալության հետ։",
        "Այստեղ մեկ մենյուում հավաքել ենք Քամանչայի ամենասիրված ու պահանջված ուտեստները՝ դրանք ներկայացնելով Սարյան փողոցի յուրահատուկ տրամադրությանը և գինու սիրահարների նախասիրություններին համապատասխան։",
        "Kamancha Tapaka Rooms — հայկական սիրված համերն ու գինու մշակույթը՝ մեկ վայրում։",
      ],
    },
    founder: {
      title: "Հիմնադիր",
      photoAlt: "Արեգ Գևորգյան",
      bio: "Արեգ Գևորգյանը հայ ռեստորատոր, ձեռնարկատեր և Kamancha ռեստորանների, Restormania և Pideh նախագծի հիմնադիր-տնօրենն է, որի մասնագիտական գործունեությունը հիմնականում կենտրոնացած է ռեստորանային բիզնեսի, հայկական գաստրոնոմիայի և հյուրընկալության ոլորտների զարգացման վրա։\n\nՌեստորանային ոլորտում նրա առաջին խոշոր նախագծերից մեկը Armat Restaurant-ն էր, որը հիմնադրվել է 2017 թվականին։ Հետագայում ձևավորվել և զարգացել են Kamancha, Pideh, Kamancha Factory և Kamancha Tapaka Rooms նախագծերը՝ ընդգրկելով ռեստորանային գործունեության, արագ սննդի և սննդի առաքման տարբեր ուղղություններ։",
    },
    footer: {
      headline: "Երկու վայր, մեկ պատմություն",
      navigation: "Նավիգացիա",
      contact: "Կոնտակտ",
      about: "Մեր մասին",
      news: "Նորություններ",
      contactLink: "Կապ",
      address: "Աբովյան 23, Երևան, Հայաստան",
      hours: "Երկ–Կիր: 12:00 – 00:00",
      copyright: "Copyright © 2026 | All rights reserved | Created by",
    },
    language: "Լեզու",
  },
  en: {
    nav: {
      about: "About Restormania",
      founder: "Founder",
      projects: "Projects",
      main: "Main",
    },
    hero: {
      subtitle: "Two places, one story",
    },
    brands: {
      projectsLabel: "Projects",
      more: "More",
    },
    about: {
      title: "About Restormania",
      paragraphs: [
        "At 8 Saryan Street, Kamancha Tapaka Rooms presents a new Armenian dining experience, paired with a wine culture and Kamancha hospitality.",
        "In one menu we brought together Kamancha’s most loved and requested dishes, shaped for the mood of Saryan Street and the preferences of wine lovers.",
        "Kamancha Tapaka Rooms — beloved Armenian flavors and wine culture in one place.",
      ],
    },
    founder: {
      title: "Founder",
      photoAlt: "Areg Gevorgyan",
      bio: "Areg Gevorgyan is an Armenian restaurateur, entrepreneur, and founding director of the Kamancha restaurants, Restormania, and the Pideh project. His work focuses on restaurant business, Armenian gastronomy, and hospitality.\n\nOne of his first major restaurant projects was Armat Restaurant, founded in 2017. Later came Kamancha, Pideh, Kamancha Factory, and Kamancha Tapaka Rooms — spanning restaurants, fast casual, and food delivery.",
    },
    footer: {
      headline: "Two places, one story",
      navigation: "Navigation",
      contact: "Contact",
      about: "About us",
      news: "News",
      contactLink: "Contact",
      address: "23 Abovyan St, Yerevan, Armenia",
      hours: "Mon–Sun: 12:00 – 00:00",
      copyright: "Copyright © 2026 | All rights reserved | Created by",
    },
    language: "Language",
  },
  ru: {
    nav: {
      about: "О Restormania",
      founder: "Основатель",
      projects: "Проекты",
      main: "Основная",
    },
    hero: {
      subtitle: "Два места, одна история",
    },
    brands: {
      projectsLabel: "Проекты",
      more: "Подробнее",
    },
    about: {
      title: "О Restormania",
      paragraphs: [
        "По адресу Сарьян 8 Kamancha Tapaka Rooms представляет новый опыт армянской кухни в сочетании с культурой вина и гостеприимством Каманчи.",
        "В одном меню мы собрали самые любимые и востребованные блюда Каманчи — в настроении улицы Сарьян и вкусах ценителей вина.",
        "Kamancha Tapaka Rooms — любимые армянские вкусы и винная культура в одном месте.",
      ],
    },
    founder: {
      title: "Основатель",
      photoAlt: "Арег Геворгян",
      bio: "Арег Геворгян — армянский ресторатор, предприниматель и основатель-директор ресторанов Kamancha, Restormania и проекта Pideh. Его работа сосредоточена на ресторанном бизнесе, армянской гастрономии и гостеприимстве.\n\nОдним из первых крупных проектов стал Armat Restaurant, основанный в 2017 году. Затем появились Kamancha, Pideh, Kamancha Factory и Kamancha Tapaka Rooms — от ресторанов до быстрого питания и доставки.",
    },
    footer: {
      headline: "Два места, одна история",
      navigation: "Навигация",
      contact: "Контакты",
      about: "О нас",
      news: "Новости",
      contactLink: "Связь",
      address: "ул. Абовяна 23, Ереван, Армения",
      hours: "Пн–Вс: 12:00 – 00:00",
      copyright: "Copyright © 2026 | All rights reserved | Created by",
    },
    language: "Язык",
  },
};
