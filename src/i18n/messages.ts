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
    openPositions: string;
    copyright: string;
    createdBy: string;
  };
  careers: {
    title: string;
    phoneLabel: string;
    intro: string;
    firstName: string;
    lastName: string;
    age: string;
    residence: string;
    position: string;
    cv: string;
    cvHint: string;
    submit: string;
    sending: string;
    success: string;
    close: string;
    invalid: string;
    cvInvalid: string;
    rateLimited: string;
    sendFailed: string;
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
      openPositions: "Ազատ Հաստիքներ",
      copyright: "© 2026 | All rights reserved",
      createdBy: "Created by",
    },
    careers: {
      title: "Ազատ հաստիքներ",
      phoneLabel: "HR հեռախոս",
      intro: "Լրացրեք տվյալները և ուղարկեք։ Դիմումը կհասնի HR բաժին։",
      firstName: "Անուն",
      lastName: "Ազգանուն",
      age: "Տարիք",
      residence: "Բնակության վայր",
      position: "Որ հաստիքով եք հետաքրքրված",
      cv: "Կցել CV",
      cvHint: "PDF կամ Word, մինչև 4 ՄԲ",
      submit: "Ուղարկել",
      sending: "Ուղարկվում է…",
      success: "Շնորհակալություն։ HR բաժինը կստանա ձեր տվյալները։",
      close: "Փակել",
      invalid: "Ստուգեք լրացված դաշտերը։ Տարիքը՝ 16–70։",
      cvInvalid: "Կցեք PDF կամ Word ֆայլ, մինչև 4 ՄԲ։",
      rateLimited: "Շատ հարցումներ եք ուղարկել։ Փորձեք մի փոքր ուշ։",
      sendFailed: "Չհաջողվեց ուղարկել։ Զանգահարեք HR համարին։",
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
      openPositions: "Open Positions",
      copyright: "© 2026 | All rights reserved",
      createdBy: "Created by",
    },
    careers: {
      title: "Open positions",
      phoneLabel: "HR phone",
      intro: "Fill in your details and send them. The application goes to HR.",
      firstName: "First name",
      lastName: "Last name",
      age: "Age",
      residence: "Place of residence",
      position: "Position you are interested in",
      cv: "Upload CV",
      cvHint: "PDF or Word, up to 4 MB",
      submit: "Send",
      sending: "Sending…",
      success: "Thank you. HR will receive your details.",
      close: "Close",
      invalid: "Check the fields. Age must be between 16 and 70.",
      cvInvalid: "Attach a PDF or Word file up to 4 MB.",
      rateLimited: "Too many attempts. Please try again later.",
      sendFailed: "Could not send the application. Please call HR.",
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
      openPositions: "Открытые вакансии",
      copyright: "© 2026 | All rights reserved",
      createdBy: "Created by",
    },
    careers: {
      title: "Открытые вакансии",
      phoneLabel: "Телефон HR",
      intro: "Заполните данные и отправьте. Заявка придёт в HR.",
      firstName: "Имя",
      lastName: "Фамилия",
      age: "Возраст",
      residence: "Место проживания",
      position: "Какая вакансия вас интересует",
      cv: "Прикрепить CV",
      cvHint: "PDF или Word, до 4 МБ",
      submit: "Отправить",
      sending: "Отправка…",
      success: "Спасибо. HR получит ваши данные.",
      close: "Закрыть",
      invalid: "Проверьте поля. Возраст — от 16 до 70.",
      cvInvalid: "Прикрепите PDF или Word до 4 МБ.",
      rateLimited: "Слишком много попыток. Попробуйте позже.",
      sendFailed: "Не удалось отправить. Позвоните в HR.",
    },
    language: "Язык",
  },
};
