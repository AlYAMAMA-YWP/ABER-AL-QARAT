const state = { heroMedia: 0, mapMedia: 0 };
const renderedSectionIds = new Set();
let counterObserver;
let revealObserver;
let sectionObserver;

const pad = (value) => String(value).padStart(3, "0");
const png = (value) => `assets/media/carved_${pad(value)}.png`;
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => start + index);
const numberFormatter = new Intl.NumberFormat("ar-SA");
const lazyImageAttrs = 'loading="lazy" decoding="async"';
const MODAL_MAX_SCALE = 5;
const deferredSectionIds = ["components", "maps", "field", "equipment", "quality", "safety", "partners"];
const isMobileViewport = () => typeof window !== "undefined" && window.innerWidth <= 820;

const entityLogos = {
  owner: png(2),
  contractor: png(13),
  consultant: "assets/media/wsp-logo.jpeg"
};

const heroBadges = [
  { title: "الجهة المالكة", text: "أمانة جدة", logo: entityLogos.owner, logoAlt: "شعار أمانة جدة" },
  { title: "استشاري الإشراف", text: "WSP", logo: entityLogos.consultant, logoAlt: "شعار WSP" },
  { title: "المقاول المنفذ", text: "شركة اليمامة للمقاولات", logo: entityLogos.contractor, logoAlt: "شعار شركة اليمامة للمقاولات" },
  { title: "رقم المشروع", text: "4/001/0602/03/00/4" },
  { title: "مدة التنفيذ", text: "24 شهر هجري عمل متواصل مع تمديد مدة 135 يوم لاستكمال الأعمال الإضافية." }
];

const chapterItems = [
  { number: "1", title: "الهدف من التقرير والرؤية والرسالة", target: "#strategy" },
  { number: "2", title: "نظرة عامة حول المشروع", target: "#overview" },
  { number: "3", title: "جودة المشروع", target: "#quality" },
  { number: "4", title: "الأمن والسلامة المهنية بالمشروع", target: "#safety" },
  { number: "5", title: "الأجهزة والمعدات والأدوات", target: "#equipment" },
  { number: "6", title: "مكونات المشروع", target: "#components" },
  { number: "7", title: "صور قبل وبعد تنفيذ المشروع", target: "#field" },
  { number: "8", title: "المخاطر والتحديات بالمشروع" }
];

const strategyItems = [
  {
    kicker: "هدف التقرير",
    title: "هدف التقرير",
    text:
      "يهدف التقرير إلى التعرف على احدى مشاريع برنامج تصريف مياه الأمطار بمحافظة جدة وهو مشروع تنفيذ حلول لتصريف مياه الأمطار لطريق الملك فيصل (عابر القارات سابقا) – أبحر الشمالية ذو الكثافة السكانية العالية وذلك من حيث التطرق إلى عناصر العمل ومكونات المشروع ومعايير الجودة والمخاطر والتحديات التي واجهت المشروع أثناء التنفيذ."
  },
  {
    kicker: "الرؤية والرسالة",
    title: "الارتباط ببرنامج تحقيق رؤية المملكة 2030",
    text:
      "يعتبر مشروع تنفيذ حلول لتصريف مياه الأمطار لطريق الملك فيصل (عابر القارات سابقا) – أبحر الشمالية، ضمن مشاريع البرامج التنفيذية لبرنامج تحقيق رؤية المملكة 2030 والتي تهدف إلى انشاء منظومة شاملة ومتكاملة لتصريف مياه الأمطار لكامل المحافظة من خلال مجموعة كبيرة من المشروعات المتتالية والتي تشكل الهيكل النهائي للبرنامج."
  },
  {
    kicker: "مرجع البيانات والمعلومات",
    title: "مرجع البيانات والمعلومات",
    text:
      "البيانات والمعلومات الواردة في التقرير من استشاري الإشراف على التنفيذ والمقاول المنفذ للمشروع وتمت وفقاً للكود السعودي للبناء والإنشاءات ومتوافق مع المعايير الهندسية والمدنية المعمول بها داخل المملكة في مجالات البنية التحتية وتمت معالجتها لتتوافق مع الأنظمة المتبعة بالأمانة."
  }
];

const visionStatement = {
  kicker: "رؤية المملكة 2030",
  title: "تحسين مستويات المعيشة والسلامة",
  text:
    "اهتمت رؤية المملكة بتطوير استراتيجية محددة لتحقيق مستهدفات تحسين مستويات المعيشة والسلامة من خلال الارتقاء بجودة الخدمات المقدمة وتحسين تغطية شبكات مياه الأمطار."
};

const strategicItems = [
  {
    kicker: "تحقيق رؤية المملكة 2030",
    title: "برنامج تصريف الأمطار",
    text:
      "يعتبر المشروع من ضمن حزمة البرامج والمشاريع المحورية التي تسعى إلى تحقيق رؤية المملكة 2030 من خلال وضع وتنفيذ حلول لتصريف مياه الأمطار ودرء أخطار السيول للمناطق الأكثر تضرراً والتي لها الأثر في تحسين المعيشة والسلامة للمواطن والمقيم على السواء."
  },
  {
    kicker: "الجوانب الاستراتيجية",
    title: "الجوانب الاستراتيجية للمشروع",
    text:
      "يعتبر المشروع احدى المشاريع الاستراتيجية لكونه جزء من الخطة الاستراتيجية الكاملة لحل مشاكل تصريف مياه الأمطار والسيول في محافظة جدة."
  },
  {
    kicker: "الموقع الجغرافي",
    title: "الموقع الجغرافي",
    text: "يمثل موقعه الجغرافي أهمية أخرى."
  }
];

const overviewLead = {
  kicker: "نظرة عامة حول المشروع",
  title: "تعريف المشروع",
  text:
    "يعتبر مشروع تنفيذ حلول لتصريف مياه الأمطار لطريق الملك فيصل (عابر القارات سابقا) – أبحر الشمالية من احدى مشاريع برنامج تصريف مياه الأمطار بمحافظة جدة والذي تأتي أهميته من موقعه الجغرافي حيث تم من خلاله حل مشكلة تجمعات المياه في الحي والمنطقة السكنية والتجارية المحيطة به."
};

const overviewEntityItems = [
  { kicker: "الجهة المالكة", title: "أمانة جدة", logo: entityLogos.owner, logoAlt: "شعار أمانة جدة" },
  { kicker: "استشاري الإشراف", title: "WSP", logo: entityLogos.consultant, logoAlt: "شعار WSP" },
  { kicker: "المقاول المنفذ", title: "شركة اليمامة للمقاولات", logo: entityLogos.contractor, logoAlt: "شعار شركة اليمامة للمقاولات" }
];

const overviewMetrics = [
  { value: 24, unit: "شهر هجري", label: "مدة التنفيذ الأساسية", detail: "استغرق العمل في المشروع مدة تصل إلى 24 شهر هجري عمل متواصل." },
  { value: 135, unit: "يوم", label: "مدة التمديد", detail: "تم تمديد مدة 135 يوم لاستكمال الأعمال الإضافية." },
  { value: 26000, unit: "م", label: "أطوال المواسير", detail: "يتجاوز إجمالي أطوال المواسير بالمشروع 26,000 متر طولي تقريباً." },
  { value: 495, unit: "مصيدة", label: "مصائد تجميع المياه", detail: "يصل عدد مصائد تجميع الأمطار إلى 495 مصيدة." },
  { value: 154, unit: "غرفة", label: "غرف التفتيش", detail: "يتجاوز عدد غرف التفتيش 154 غرفة تفتيش." }
];

const projectDataItems = [
  { kicker: "بيانات المشروع", title: "رقم المشروع", text: "4/001/0602/03/00/4" },
  { kicker: "اسم المشروع", title: "تنفيذ حلول لتصريف مياه الأمطار لطريق الملك فيصل", text: "(عابر القارات سابقا) – أبحر الشمالية." },
  { kicker: "الجهة المالكة", title: "أمانة جدة", text: "أمانة جدة (وزارة الشؤون البلدية والقروية)." }
];

const componentMetrics = [
  {
    value: 26000,
    unit: "م",
    label: "أطوال المواسير",
    detail: "مجموعة كبيرة من المواسير بأقطار مختلفة موزعة على شوارع وطرق المنطقة المخدومة بالمشروع.",
      icon: "assets/media/component-icon-catchpit.png",
      iconAlt: "أيقونة المواسير"
  },
  {
    value: 495,
    unit: "مصيدة",
    label: "مصائد تجميع المياه",
    detail: "تعمل على تجميع مياه الأمطار وتوزيعها داخل خطوط نقل المياه بالشبكة.",
      icon: "assets/media/component-icon-pipes.png",
      iconAlt: "أيقونة مصائد تجميع مياه الأمطار"
  },
  {
    value: 154,
    unit: "غرفة",
    label: "غرف التفتيش",
    detail: "تربط الخطوط بعضها البعض وتسهل من عمليات الصيانة المستقبلية.",
    icon: "assets/media/component-icon-manhole.png",
    iconAlt: "أيقونة غرف التفتيش"
  }
];

const componentItems = [
  {
    kicker: "مكونات المشروع",
    title: "الشبكة الرئيسة للمشروع",
    text:
      "يتكون المشروع من مجموعة كبيرة من المواسير بأقطار مختلفة وبأطوال يتجاوز أطوالها 26,000 متر طولي تقريباً موزعة على شوارع وطرق المنطقة المخدومة بالمشروع وتنتهي هذه المواسير بمصب على البحر."
  },
  {
    kicker: "مصائد تجميع المياه",
    title: "مصائد تجميع مياه الأمطار",
    text:
      "يتكون المشروع من مجموعة كبيرة من مصائد تجميع الأمطار يصل عددها إلى 495 مصيدة تعمل على تجميع مياه الأمطار وتوزيعها داخل خطوط نقل المياه بالشبكة."
  },
  {
    kicker: "غرف التفتيش",
    title: "غرف التفتيش والربط",
    text:
      "يتكون المشروع أيضاً من عدد تجاوز الـ 154 غرفة تفتيش تربط الخطوط بعضها البعض وتسهل من عمليات الصيانة المستقبلية."
  }
];

const componentGalleryItems = ["component-01.jpeg", "component-02.jpeg", "component-03.jpg"].map((fileName) => ({
  src: `assets/media/${fileName}`,
  title: "نماذج من العناصر المكونة للمشروع أثناء التنفيذ",
  caption: ""
}));

const heroMediaItems = [
  {
    src: "assets/media/hero-map-main.png",
    title: "الخريطة الرئيسية للمشروع",
    caption: "الخريطة الرئيسية للمشروع"
  }
];

const mapMediaItems = [
  {
    src: png(52),
    kicker: "الموقع الجغرافي",
    title: "الخريطة التشغيلية للمشروع",
    text: "",
    insights: [
      "مفتاح الخريطة يوضح خطوط شبكة التصريف.",
      "مفتاح الخريطة يوضح واقع غرف التفتيش.",
      "يمثل الموقع الجغرافي للمشروع أهمية استراتيجية ضمن نطاق الخدمة."
    ]
  }
];

const siteItems = [
  {
    kicker: "الموقع الجغرافي",
    title: "شمال محافظة جدة",
    text:
      "يقع المشروع في شمال محافظة جدة على يسار طريق المدينة، ويقع ضمن حدود بلدية أبحر حيث يخدم المشروع مجموعة من الشوارع والطرق الحيوية في المنطقة."
  },
  {
    kicker: "النطاق الخدمي",
    title: "الشوارع والطرق الحيوية",
    text: "يخدم المشروع مجموعة من الشوارع والطرق الحيوية داخل المنطقة ضمن حدود بلدية أبحر."
  }
];

const mapLegendItems = [
  { label: "واقع غرف التفتيش", type: "circle" },
  { label: "خطوط شبكة التصريف", type: "line" }
];

const streetItems = [
  { kicker: "شارع عبد الله الفيصل", title: "3992 م من خطوط الشبكة", text: "تم تنفيذ شبكة تصريف في الموقع بأطوال خطوط 3992م وعدد 92 مصيدة تجميع أمطار و21 غرفة تفتيش." },
  { kicker: "شارع عابر القارات", title: "10174 م من خطوط الشبكة", text: "تم تنفيذ شبكة تصريف أمطار في الشارع بأطوال خطوط 10174م وعدد 241 مصيدة تجميع أمطار و31 غرفة تفتيش ونقطة ربط على قناة المطار." },
  { kicker: "شارع الأمير نايف", title: "2436 م من خطوط الشبكة", text: "تم تنفيذ شبكة تصريف أمطار في الشارع بأطوال خطوط 2436م وعدد 38 مصيدة تجميع أمطار و08 غرفة تفتيش." },
  { kicker: "شوارع داخلية", title: "استكمال الخدمة داخل النطاق العمراني", text: "يشمل المشروع شوارع داخلية ضمن المنطقة السكنية والتجارية المحيطة بالموقع." }
];

const phases = [
  { title: "ترسية المشروع واستلام الموقع", text: "تم في هذه المرحلة ترسية المشروع بتاريخ 1443/06/10 واستلام الموقع من قبل المقاول بتاريخ 1443/08/10 لبدء العمل.", icon: "assets/media/phase-icon-award.png", iconAlt: "أيقونة ترسية المشروع واستلام الموقع" },
  { title: "الرفع المساحي وتوريد الخامات", text: "تم في هذه المرحلة تجهيز الموقع ورفعه مساحياً وفقاً لإحداثيات الأمانة، كما تم توريد الخامات والمعدات إلى مقر العمل.", icon: "assets/media/phase-icon-survey.png", iconAlt: "أيقونة الرفع المساحي وتوريد الخامات" },
  { title: "أعمال الحفر والتركيب", text: "تم في هذه المرحلة أعمال الحفر للخطوط الرئيسية والفرعية وتم تركيب المواسير وغرف التفتيش ومصائد تجميع المياه.", icon: "assets/media/phase-icon-digging.png", iconAlt: "أيقونة أعمال الحفر والتركيب" },
  { title: "أعمال الردم والسفلتة", text: "تم في هذه المرحلة ردم وتسوية ورصف الشوارع والطرق بالمشروع وأعادتها لحالتها الطبيعية.", icon: "assets/media/phase-icon-asphalt.png", iconAlt: "أيقونة أعمال الردم والسفلتة" },
  { title: "أعمال الاختبارات وتسليم الموقع", text: "تم في هذه المرحلة عمل الاختبارات والفحوصات اللازمة لشبكة تصريف الأمطار المنفذة للتأكد من فعاليتها وذلك لتسليم الموقع وانهاء العمل وإجراء تصوير تلفزيوني CCTV لجميع المواسير للتأكد من سلامتها وجاهزيتها.", icon: "assets/media/phase-icon-check.png", iconAlt: "أيقونة أعمال الاختبارات وتسليم الموقع" }
];

const stageItems = [
  "stage-image41.jpg",
  "stage-image42.jpg",
  "stage-image43.jpg",
  "stage-image44.jpeg",
  "stage-image45.jpg",
  "stage-image46.jpeg",
  "stage-image47.jpeg",
  "stage-image48.jpeg",
  "stage-image49.jpeg",
  "stage-image50.jpeg",
  "stage-image51.jpeg",
  "stage-image52.jpeg",
  "stage-image53.jpeg",
  "stage-image54.jpeg",
  "stage-image55.png",
  "stage-image56.jpeg",
  "stage-image57.jpeg",
  "stage-image52.jpeg",
  "stage-image58.jpeg",
  "stage-image59.jpeg",
  "stage-image60.jpeg",
  "stage-image61.jpg",
  "stage-image62.jpeg",
  "stage-image63.jpeg"
].map((fileName) => ({ src: `assets/media/${fileName}`, title: "صور مراحل العمل بالمشروع", caption: "" }));

const resourceItems = [
  { value: 192, unit: "فرد", label: "العنصر البشري", detail: "مهندس وعامل وفني ضمن فرق عمل صباحية ومسائية وفرق طوارئ مقسمة على مدار الساعة.", icon: "assets/media/equipment-icon-human.png", iconAlt: "أيقونة العنصر البشري" },
  { value: 106, unit: "معدة", label: "العنصر التشغيلي", detail: "معدات خفيفة وثقيلة ومعدات حفر وردم ودك تربة ومولدات كهربائية ومضخات سحب مياه وغيرها من المعدات والآليات.", icon: "assets/media/equipment-icon-operational.png", iconAlt: "أيقونة العنصر التشغيلي" }
];

const equipmentItems = [
  { kicker: "العنصر البشري", title: "الكوادر الفنية المؤهلة", text: "انقسمت عناصر العمل بالمشروع إلى قسمين أولهما العنصر البشري المتمثل في الكوادر الفنية المؤهلة لأعمال التنفيذ والإشراف والمتابعة.", icon: "assets/media/equipment-icon-human.png", iconAlt: "أيقونة الكوادر الفنية المؤهلة" },
  { kicker: "العنصر التشغيلي", title: "المعدات والأدوات المختلفة", text: "ثانيهما العنصر التشغيلي المتمثل في المعدات (خفيفة - ثقيلة) والأدوات المختلفة اللازمة لإنجاز الأعمال على الوجه الصحيح.", icon: "assets/media/equipment-icon-operational.png", iconAlt: "أيقونة المعدات والأدوات المختلفة" },
  { kicker: "تنظيم العمل", title: "فرق صباحية ومسائية وطوارئ", text: "بدأ العمل بالمشروع بفرق عمل صباحية ومسائية وفرق طوارئ مقسمة على مدار الساعة وموزعة على مواقع العمل المختلفة، بالإضافة لعناصر الإشراف على التنفيذ." },
  { kicker: "تنوع المعدات", title: "معدات خفيفة وثقيلة وآليات مساندة", text: "تنوعت المعدات المستخدمة في المشروع حيث هناك المعدات الخفيفة والثقيلة ومعدات الحفر والردم ودك التربة ومولدات كهربائية ومضخات سحب المياه وغيرها من المعدات والآليات." }
];

const equipmentGalleryItems = [
  "equipment-01.jpeg",
  "equipment-02.jpg",
  "equipment-03.jpeg",
  "equipment-04.jpeg",
  "equipment-05.jpg",
  "equipment-06.jpg",
  "equipment-07.jpeg",
  "equipment-08.jpeg",
  "equipment-09.jpeg",
  "equipment-10.jpg",
  "equipment-11.jpg",
  "equipment-12.jpeg"
].map((fileName) => ({ src: `assets/media/${fileName}`, title: "نماذج من عناصر العمل بالمشروع", caption: "" }));

const qualityLead = {
  kicker: "جودة المشروع",
  title: "عناصر ومعايير الجودة في المشروع",
  text:
    "تعتبر جودة المشروع من العناصر المهمة في نجاح أي مشروع لتحقيق الأهداف المرجوة منه لذا اهتمت أمانة جدة ممثلة في الإدارة العامة لتنفيذ تصريف مياه الأمطار في تطبيق خطة الجودة التي تعتبر المسؤولة عن وصف الأنشطة والمعايير والعمليات اللازمة لضمان التنفيذ بالشكل الأمثل، وتبدأ عملية إدارة الجودة قبل بداية المشروع حيث يتم تحديد العناصر والمعايير اللازمة لضمان جودة الأعمال."
};

const qualityItems = [
  { kicker: "المعايير الفنية والهندسية", title: "المعايير الفنية والهندسية", text: "هي المعايير الخاصة بتطبيق المواصفات الوطنية والدولية والأكواد والأدلة المرجعية في جميع مراحل تنفيذ المشروع.", icon: "assets/media/quality-icon-engineering.png", iconAlt: "أيقونة المعايير الفنية والهندسية" },
  { kicker: "معايير السلامة المهنية", title: "معايير السلامة المهنية", text: "هي المسؤولة عن ضمان سلامة وصحة ظروف العمل للعاملين وللمجتمع للحد من المخاطر والحفاظ على الأرواح والممتلكات.", icon: "assets/media/quality-icon-safety.png", iconAlt: "أيقونة معايير السلامة المهنية" },
  { kicker: "معايير جودة الخامات", title: "معايير جودة الخامات", text: "هي المعايير الخاصة بجودة الخامات والمواد المستخدمة في مراحل المشروع المختلفة وشهادات الضمان الخاصة بها.", icon: "assets/media/quality-icon-materials.png", iconAlt: "أيقونة معايير جودة الخامات" },
  { kicker: "معايير الجودة البيئية", title: "معايير الجودة البيئية", text: "هي المعايير الخاصة بالحفاظ على الجوانب البيئية من ناحية المواد والمعدات المستخدمة وكذلك طرق التخلص من المخلفات الناتجة.", icon: "assets/media/quality-icon-environment.png", iconAlt: "أيقونة معايير الجودة البيئية" },
  { kicker: "معايير مراقبة الجودة واختبارات التحقق", title: "معايير مراقبة الجودة واختبارات التحقق", text: "هي المعايير الخاصة بمراقبة تنفيذ المشروع في مراحله المختلفة واختبار الأعمال والمخططات لاعتمادها من استشاري الإشراف على التنفيذ.", icon: "assets/media/quality-icon-verification.png", iconAlt: "أيقونة معايير مراقبة الجودة واختبارات التحقق" }
];

const standardsLeadCopy =
  "راعى مشروع تنفيذ حلول لتصريف مياه الأمطار لطريق الملك فيصل (عابر القارات سابقا) – أبحر الشمالية، اتباع المعايير الفنية والهندسية التي تضمن الجودة في التنفيذ والإخراج ومنها أنظمة الجودة العالمية الايزو ISO9001 والعديد من المواصفات الوطنية والدولية والأكواد والأدلة المرجعية المختلفة.";

const standardItems = [
  { src: png(78), title: "الهيئة العربية السعودية للمواصفات والمقاييس", caption: "", interactive: false },
  { src: png(76), title: "ISO", caption: "", interactive: false },
  { src: png(77), title: "مواصفات وزارة الشؤون البلدية والقروية", caption: "", interactive: false },
  { src: png(74), title: "الجمعية الأمريكية لمهندسي الطرق", caption: "", interactive: false },
  { src: png(79), title: "مواصفات وزارة النقل السعودية", caption: "", interactive: false },
  { src: png(75), title: "المواصفات القياسية البريطانية", caption: "", interactive: false }
];

const materialLeadCopy =
  "تم اتباع مجموعة مختلفة من المعايير التي تضمن اختيار أفضل الخامات في المشروع، حيث اتبع القائمون على المشروع سياسة استخدام الجودة في اختيار الخامات فتم الاختيار وفقاً للاختبارات والخبرات السابقة والتجربة العملية للعينات لتحديد مدى قابلية استخدامها في التنفيذ وذلك لتحقيق الهدف المرجو من المشروع وهو تنفيذ شبكة تصريف مياه أمطار وسيول ذات جودة وكفاءة عالية تعمل في أشد الظروف ولأطول فترة ممكنة.";

const materialProcessItems = [
  { step: "01", title: "تحديد نوع الخامة", text: "يقوم المقاول باختيار عينة من المادة المراد استخدامها في أعمال التنفيذ بعد اعتماد المورد." },
  { step: "02", title: "طلب اعتماد الخامة", text: "ثم يقوم بتقديم طلب لاستشاري الإشراف على التنفيذ مرفقاً بمواصفات وخصائص الخامة لاعتمادها." },
  { step: "03", title: "اختبار الخامة", text: "يقوم استشاري الإشراف على التنفيذ بعمل الاختبارات اللازمة على العينة المقدمة للوقوف على مدى صلاحيتها في التنفيذ." },
  { step: "04", title: "حالة الخامة", text: "يتم تحديد حالة الخامة بعد إجراء الاختبارات عليها ليتم بعد ذلك قبولها أو رفضها." }
];

const materialGalleryItems = ["material-01.jpg", "material-02.jpg", "material-03.jpg"].map((fileName) => ({
  src: `assets/media/${fileName}`,
  title: "نماذج من بعض الخامات والمواد المستخدمة في المشروع",
  caption: ""
}));

const docItems = [
  { src: png(93), title: "نموذج من شهادات ضمان الخامات بالمشروع", caption: "" },
  { src: png(94), title: "وثيقة اعتماد خامة", caption: "" },
  { src: png(95), title: "وثيقة اختبار خامة", caption: "" },
  { src: png(96), title: "وثيقة متابعة جودة", caption: "" },
  { src: png(102), title: "وثيقة تحقق واعتماد", caption: "" },
  { src: png(103), title: "وثيقة داعمة للجودة", caption: "" }
];

const environmentLeadCopy =
  "راعى المشروع معايير الجودة البيئية وتطبيق الاشتراطات والتدابير اللازمة للحفاظ على البيئة المحيطة بالمشروع، وذلك من خلال الطرق السليمة في التخلص من المخلفات والردميات الناتجة أثناء تنفيذ المشروع، بالإضافة إلى الحد من عوادم المعدات والآلات المستخدمة في التنفيذ، كما تم العمل على تقليل الانبعاثات الحرارية والاتربة والضوضاء واستخدام مواد وخامات صديقة للبيئة بغية تحقيق الجودة البيئية في جميع مراحل العمل بالمشروع.";

const environmentItems = [
  { kicker: "المخلفات والردميات", title: "التخلص السليم من المخلفات", text: "تم التخلص من مخلفات المشروع سواء كانت مخلفات ناتجة عن عمليات الحفر والكشط أو مخلفات المكاتب الإدارية في الأماكن المخصصة لذلك والمعتمدة لدى أمانة جدة.", icon: "assets/media/environment-icon-waste.png", iconAlt: "أيقونة المخلفات والردميات" },
  { kicker: "العوادم والانبعاثات الحرارية", title: "الحد من العوادم والانبعاثات", text: "تم العمل في المشروع على الحد من العوادم والانبعاثات الحرارية الناتجة عن المعدات والآلات المستخدمة في عمليات التنفيذ المختلفة وذلك حفاظاً على البيئة وعلى الكادر البشري في المشروع.", icon: "assets/media/environment-icon-emissions.png", iconAlt: "أيقونة العوادم والانبعاثات الحرارية" },
  { kicker: "المواد والخامات", title: "مواد وخامات صديقة للبيئة", text: "تم اختيار مواد وخامات صديقة للبيئة تحقق الكفاءة والجودة وكذلك غير مضرة بالبيئة سواء على المدى الزمني القصير أو البعيد.", icon: "assets/media/environment-icon-materials.png", iconAlt: "أيقونة المواد والخامات" },
  { kicker: "الأتربة والضوضاء", title: "تقليل الأتربة والضوضاء", text: "تم العمل في المشروع على الحد من الاتربة والغبار الناتج أثناء عمليات الحفر والردم وكذلك الحد من الضوضاء أثناء التنفيذ واختيار أوقات وطرق تنفيذ تهدف إلى الحد والتقليل من ذلك.", icon: "assets/media/environment-icon-dust.png", iconAlt: "أيقونة الأتربة والضوضاء" }
];

const environmentGalleryItems = ["environment-01.jpeg", "environment-02.jpeg"].map((fileName) => ({
  src: `assets/media/${fileName}`,
  title: "معايير الجودة البيئية في المشروع",
  caption: ""
}));

const verificationLeadCopy =
  "راعى المشروع منذ بدايته سياسة مراقبة الجودة في جميع مراحل التنفيذ واختبارات التحقق لكل المواد والخامات والأدوات المستخدمة مستعيناً في ذلك بالخبرات الموجودة في فريق الإشراف على التنفيذ وكذلك مكتب إدارة مشاريع برنامج تصريف مياه الأمطار والتي أوكلت لهم مهمة مراقبة الجودة في التنفيذ في مراحل المشروع المختلفة.";

const verificationExecution = {
  title: "مهام فريق الإشراف على التنفيذ",
  items: [
    "اختبار واعتماد الخامات والمواد المستخدمة في التنفيذ.",
    "استلام واعتماد الأعمال المنفذة من مقاول التنفيذ.",
    "مراقبة مواقع العمل أثناء مراحل التنفيذ المختلفة.",
    "عمل اختبارات تحقق للأعمال بعد تنفيذها.",
    "مراجعة واعتماد المخططات التنفيذية وأعمال حصر الكميات."
  ]
};

const verificationPmo = {
  title: "مهام فريق مكتب إدارة المشروع",
  items: [
    "المساعدة في تحقيق عوامل الجودة والمراقبة في المشروع.",
    "تطبيق وتفعيل آليات واضحة للضبط والمراقبة لجميع المشاريع.",
    "متابعة مهام الفرق المختلفة كبيئة للتنسيق بين جميع الأطراف.",
    "عمل لقاءات واجتماعات دورية لمعرفة مدى الالتزام بخطة الجودة.",
    "القيام بجولات ميدانية لمواقع العمل المختلفة في المشروع."
  ]
};

const safetyLead = {
  text:
    "تم اتباع مجموعة من الإجراءات والمعايير التي توفر بيئة آمنة للعمل وتحافظ على العمال في المشروع من أي مخاطر او أضرار تؤدي الى تعطل تنفيذ المشروع، كما تم توفير كافة الاحتياطات ووسائل الأمن والسلامة العامة لذلك حرصاً من أمانة جدة على سلامة العمال، والمعدات، والأدوات، والمـمتلكات الـعـامـة والخـاصـة."
};

const safetyCriteriaItems = [
  { title: "الإسعافات الأولية", icon: "assets/media/safety-first-aid.png" },
  { title: "الحواجز الخراسانية", icon: "assets/media/safety-barrier.png" },
  { title: "اللوحات الإرشادية", icon: "assets/media/safety-sign.png" },
  { title: "الأدوات الشخصية", icon: "assets/media/safety-tools.png" },
  { title: "الزي الشخصي", icon: "assets/media/safety-uniform.png" }
];

const safetyPoints = [
  { title: "اللوحات الإرشادية", text: "تم استخدام اللوحات الإرشادية على الطرق في المشروع كإحدى وسائل السلامة المرورية لتنبيه قائدي المركبات بالإرشادات والتعليمات المتعلقة بالتحويلات المرورية وأحوال الطرق، وذلك بالتنسيق مع الإدارة العامة لشرطة المرور بمحافظة جدة." },
  { title: "خطة الأمن والسلامة", text: "تم تنفيذ المشروع وفقاً لخطة أمن وسلامة محكمة في جميع مواقع العمل وعلى مدار الساعة." },
  { title: "اللقاءات الدورية", text: "تم عقد لقاءات واجتماعات دورية بالعمال ومهندسي المواقع لتوضيح هذه الخطة والوقوف على مدى الالتزام بالمعايير والاشتراطات المطلوبة لتفادي المخاطر والحفاظ على الأرواح والممتلكات." }
];

const safetyDetailItems = [
  { kicker: "اللوحات الإرشادية", title: "التنسيق مع الإدارة العامة لشرطة المرور", text: "تم استخدام اللوحات الإرشادية على الطرق في المشروع كإحدى وسائل السلامة المرورية لتنبيه قائدي المركبات بالإرشادات والتعليمات المتعلقة بالتحويلات المرورية وأحوال الطرق، وذلك بالتنسيق مع الإدارة العامة لشرطة المرور بمحافظة جدة." },
  { kicker: "خطة السلامة", title: "التحويلات المرورية نهاراً وليلاً", text: "تم تنفيذ المشروع وفقاً لخطة أمن وسلامة محكمة في جميع مواقع العمل وعلى مدار الساعة، وتشمل خطة السلامة والتحويلات المرورية نهاراً وليلاً." },
  { kicker: "اللقاءات الدورية", title: "الالتزام بالاشتراطات المطلوبة", text: "تم عقد لقاءات واجتماعات دورية بالعمال ومهندسي المواقع لتوضيح خطة الأمن والسلامة والوقوف على مدى الالتزام بالمعايير والاشتراطات المطلوبة لتفادي المخاطر والحفاظ على الأرواح والممتلكات." }
];

const safetyFeatureCards = [
  {
    title: "اللوحات الإرشادية",
    text:
      "تم استخدام اللوحات الإرشادية على الطرق في المشروع كإحدى وسائل السلامة المرورية لتنبيه قائدي المركبات بالإرشادات والتعليمات المتعلقة بالتحويلات المرورية وأحوال الطرق، وذلك بالتنسيق مع الإدارة العامة لشرطة المرور بمحافظة جدة.",
    images: [
      "safety-original-image114.jpeg",
      "safety-original-image113.jpg",
      "safety-original-image115.jpeg",
      "safety-original-image112.jpeg"
    ].map((fileName) => ({
      src: `assets/media/${fileName}`,
      title: "اللوحات الإرشادية",
      caption: ""
    }))
  },
  {
    title: "خطة الأمن والسلامة",
    text:
      "تم تنفيذ المشروع وفقاً لخطة أمن وسلامة محكمة في جميع مواقع العمل وعلى مدار الساعة، كما تم عقد لقاءات واجتماعات دورية بالعمال ومهندسي المواقع لتوضيح هذه الخطة والوقوف علي مدى الالتزام بالمعايير والاشتراطات المطلوبة لتفادي المخاطر والحفاظ على الأرواح والممتلكات.",
    groups: [
      {
        label: "خطة السلامة والتحويلات المرورية نهاراً.",
        images: ["safety-original-image117.jpg", "safety-original-image116.jpg", "safety-original-image121.jpeg"]
      },
      {
        label: "خطة السلامة والتحويلات المرورية ليلاً.",
        images: ["safety-original-image118.jpeg", "safety-original-image120.jpeg"]
      },
      {
        label: "اللقاءات الدورية لتوضيح خطط السلامة.",
        images: ["safety-original-image119.jpeg"]
      }
    ]
  }
];

const partnerStatement = {
  kicker: "في النهاية",
  title: "تشكر أمانة جدة شركاء النجاح",
  text: "تشكر أمانة جدة شركاء النجاح من الجهات المختلفة الذين تعاونوا وساهموا في إنجاز المشروع وتنفيذه بالشكل الأمثل."
};

const heroBadgesContainer = document.getElementById("heroBadges");
const chapterGrid = document.getElementById("chapterGrid");
const strategyGrid = document.getElementById("strategyGrid");
const visionStatementCard = document.getElementById("visionStatement");
const strategicGrid = document.getElementById("strategicGrid");
const overviewLeadCard = document.getElementById("overviewLeadCard");
const overviewEntityGrid = document.getElementById("overviewEntityGrid");
const metricGrid = document.getElementById("metricGrid");
const projectDataGrid = document.getElementById("projectDataGrid");
const componentMetricGrid = document.getElementById("componentMetricGrid");
const componentGrid = document.getElementById("componentGrid");
const componentGallery = document.getElementById("componentGallery");
const heroFeatureTrigger = document.getElementById("heroFeatureTrigger");
const heroFeatureImage = document.getElementById("heroFeatureImage");
const heroFeatureCaption = document.getElementById("heroFeatureCaption");
const heroThumbs = document.getElementById("heroThumbs");
const mapFeatureTrigger = document.getElementById("mapFeatureTrigger");
const mapFeatureImage = document.getElementById("mapFeatureImage");
const mapFeatureKicker = document.getElementById("mapFeatureKicker");
const mapFeatureTitle = document.getElementById("mapFeatureTitle");
const mapFeatureText = document.getElementById("mapFeatureText");
const mapThumbs = document.getElementById("mapThumbs");
const mapLegend = document.getElementById("mapLegend");
const mapInsights = document.getElementById("mapInsights");
const siteGrid = document.getElementById("siteGrid");
const streetGrid = document.getElementById("streetGrid");
const phaseGrid = document.getElementById("phaseGrid");
const stageGrid = document.getElementById("stageGrid");
const resourceGrid = document.getElementById("resourceGrid");
const equipmentGrid = document.getElementById("equipmentGrid");
const equipmentGallery = document.getElementById("equipmentGallery");
const qualityLeadCard = document.getElementById("qualityLeadCard");
const qualityGrid = document.getElementById("qualityGrid");
const standardsLeadText = document.getElementById("standardsLeadText");
const standardsWall = document.getElementById("standardsWall");
const materialLeadText = document.getElementById("materialLeadText");
const materialProcessGrid = document.getElementById("materialProcessGrid");
const materialGallery = document.getElementById("materialGallery");
const docGrid = document.getElementById("docGrid");
const environmentLeadText = document.getElementById("environmentLeadText");
const environmentGrid = document.getElementById("environmentGrid");
const environmentGallery = document.getElementById("environmentGallery");
const verificationLeadText = document.getElementById("verificationLeadText");
const verificationExecutionPanel = document.getElementById("verificationExecutionPanel");
const verificationPmoPanel = document.getElementById("verificationPmoPanel");
const safetyLeadCard = document.getElementById("safetyLeadCard");
const safetyCriteriaGrid = document.getElementById("safetyCriteriaGrid");
const safetyPointsContainer = document.getElementById("safetyPoints");
const safetyGallery = document.getElementById("safetyGallery");
const safetyDetailGrid = document.getElementById("safetyDetailGrid");
const partnerStatementCard = document.getElementById("partnerStatement");
const mediaModal = document.getElementById("mediaModal");
const modalMedia = document.getElementById("modalMedia");
const modalImage = document.getElementById("modalImage");
const modalOverline = document.getElementById("modalOverline");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const modalZoomValue = document.getElementById("modalZoomValue");
const navScrollButtons = Array.from(document.querySelectorAll(".topnav .nav-link[data-scroll]"));

const zoomState = {
  scale: 1,
  x: 0,
  y: 0,
  dragStartX: 0,
  dragStartY: 0,
  originX: 0,
  originY: 0,
  pinchDistance: 0,
  pinchScale: 1,
  pinchStartX: 0,
  pinchStartY: 0,
  pinchCenterX: 0,
  pinchCenterY: 0,
  pointers: new Map(),
  isDragging: false,
  isInteracting: false,
  frame: 0,
  wheelTimeout: 0
};

function setZoomTarget(element, item, fallbackKicker) {
  if (!element || !item) {
    return;
  }

  element.dataset.modalSrc = item.src;
  element.dataset.modalTitle = item.title;
  element.dataset.modalCaption = item.caption || item.text || "";
  element.dataset.modalKicker = item.kicker || fallbackKicker || "عرض تفصيلي";
}

function scheduleIdleTask(callback, timeout = 900) {
  if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(
    () =>
      callback({
        didTimeout: true,
        timeRemaining: () => 0
      }),
    64
  );
}

function renderHeroBadges() {
  if (!heroBadgesContainer) {
    return;
  }

  heroBadgesContainer.innerHTML = heroBadges
    .map(
      (item) => `
        <article class="hero-summary-card ${item.logo ? "hero-summary-card--entity" : "hero-summary-card--meta"} reveal">
          ${item.logo ? `<p class="hero-summary-kicker">${item.title}</p>` : `<p class="hero-summary-kicker hero-summary-kicker--meta">${item.title}</p>`}
          ${
            item.logo
              ? `
                <span class="entity-badge-mark hero-summary-logo"><img src="${item.logo}" alt="${item.logoAlt || item.title}" ${lazyImageAttrs}></span>
                <strong class="hero-summary-name">${item.text}</strong>
              `
              : `
                <strong class="hero-summary-value">${item.text}</strong>
              `
          }
        </article>
      `
    )
    .join("");
}

function renderChapterGrid() {
  if (!chapterGrid) {
    return;
  }

  chapterGrid.innerHTML = chapterItems
    .map(
      (item) => `
        <article class="chapter-card reveal">
          ${
            item.target
              ? `<button class="chapter-card-button" type="button" data-scroll="${item.target}" aria-label="الانتقال إلى ${item.title}">`
              : `<div class="chapter-card-button chapter-card-button--static" aria-label="${item.title}">`
          }
            <strong>${item.number}</strong>
            <h3>${item.title}</h3>
          ${item.target ? "</button>" : "</div>"}
        </article>
      `
    )
    .join("");
}

function renderDetailCards(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => {
        if (item.logo && item.entityOnly) {
          return `
            <article class="detail-card detail-card--entity-simple reveal" aria-label="${item.kicker || item.title}">
              <span class="entity-card-mark entity-card-mark--simple"><img src="${item.logo}" alt="${item.logoAlt || item.title}" ${lazyImageAttrs}></span>
              <h3>${item.title}</h3>
            </article>
          `;
        }

        return `
          <article class="detail-card ${item.logo ? "detail-card--entity" : ""} ${item.icon ? "detail-card--with-icon" : ""} reveal">
            ${item.icon ? `<span class="detail-card-icon"><img src="${item.icon}" alt="${item.iconAlt || item.title}" ${lazyImageAttrs}></span>` : ""}
            <div class="detail-card-head ${item.logo ? "detail-card-head--with-logo" : item.icon ? "detail-card-head--with-icon" : ""}">
              ${item.logo ? `<span class="entity-card-mark"><img src="${item.logo}" alt="${item.logoAlt || item.title}" ${lazyImageAttrs}></span>` : ""}
              <div>
                ${item.kicker ? `<p class="section-kicker">${item.kicker}</p>` : ""}
                <h3>${item.title}</h3>
              </div>
            </div>
            <p>${item.text}</p>
          </article>
        `;
      }
    )
    .join("");
}

function renderStatementCard(container, item) {
  if (!container || !item) {
    return;
  }

  container.innerHTML = `
    ${item.kicker ? `<p class="section-kicker">${item.kicker}</p>` : ""}
    ${item.title ? `<h3>${item.title}</h3>` : ""}
    ${item.text ? `<p>${item.text}</p>` : ""}
  `;
}

function renderEntityCards(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="entity-overview-card reveal" aria-label="${item.kicker}">
          <p class="entity-overview-role">${item.kicker}</p>
          <span class="entity-card-mark entity-card-mark--simple"><img src="${item.logo}" alt="${item.logoAlt || item.title}" ${lazyImageAttrs}></span>
          <h3>${item.title}</h3>
        </article>
      `
    )
    .join("");
}

function renderMetrics(container, items, className = "metric-card") {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (metric) => `
        <article class="${className} reveal">
          <div class="metric-card-top${metric.icon ? " metric-card-top--icon" : ""}">
            ${metric.icon ? `<span class="metric-icon" aria-hidden="true"><img src="${metric.icon}" alt="${metric.iconAlt || metric.label}" decoding="async"></span>` : ""}
            <small>${metric.label}</small>
          </div>
          <strong>
            <span class="counter" data-counter="${metric.value}">0</span>
            <small>${metric.unit}</small>
          </strong>
          <p>${metric.detail}</p>
          <div class="metric-line" aria-hidden="true"><span></span></div>
        </article>
      `
    )
    .join("");
}

function renderHeroMedia() {
  if (!heroFeatureImage || !heroFeatureCaption || !heroThumbs || !heroFeatureTrigger) {
    return;
  }

  const current = heroMediaItems[state.heroMedia];
  heroFeatureImage.src = current.src;
  heroFeatureImage.alt = current.title;
  heroFeatureCaption.textContent = current.caption;
  setZoomTarget(heroFeatureTrigger, current, "الخريطة الرئيسية");

  if (heroMediaItems.length < 2) {
    heroThumbs.hidden = true;
    heroThumbs.innerHTML = "";
    return;
  }

  heroThumbs.hidden = false;
  heroThumbs.innerHTML = heroMediaItems
    .map(
      (item, index) => `
        <button class="thumb-button ${index === state.heroMedia ? "is-active" : ""}" type="button" data-hero-index="${index}">
          <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
        </button>
      `
    )
    .join("");
}

function renderMapSection() {
  if (!mapFeatureImage || !mapFeatureKicker || !mapFeatureTitle || !mapFeatureText || !mapThumbs || !mapInsights || !mapFeatureTrigger) {
    return;
  }

  const current = mapMediaItems[state.mapMedia];
  mapFeatureImage.src = current.src;
  mapFeatureImage.alt = current.title;
  mapFeatureKicker.textContent = current.kicker;
  mapFeatureTitle.textContent = current.title;
  mapFeatureText.textContent = current.text;
  setZoomTarget(mapFeatureTrigger, { src: current.src, title: current.title, caption: current.text, kicker: current.kicker }, current.kicker);

  if (mapMediaItems.length < 2) {
    mapThumbs.hidden = true;
    mapThumbs.innerHTML = "";
  } else {
    mapThumbs.hidden = false;
    mapThumbs.innerHTML = mapMediaItems
      .map(
        (item, index) => `
          <button class="thumb-button ${index === state.mapMedia ? "is-active" : ""}" type="button" data-map-index="${index}">
            <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
          </button>
        `
      )
      .join("");
  }

  mapInsights.innerHTML = `<strong>أبرز القراءات</strong>${current.insights.map((item) => `<p>${item}</p>`).join("")}`;
}

function renderMapLegend() {
  if (!mapLegend) {
    return;
  }

  mapLegend.innerHTML = mapLegendItems
    .map(
      (item) => `
        <div class="legend-item legend-item--${item.type}">
          <span class="legend-label">${item.label}</span>
          <span class="legend-swatch legend-swatch--${item.type}" aria-hidden="true"></span>
        </div>
      `
    )
    .join("");
}

function createGalleryCard(item, kicker) {
  return `
    <article class="stage-card reveal">
      <button type="button" data-modal-src="${item.src}" data-modal-title="${item.title}" data-modal-caption="${item.caption || ""}" data-modal-kicker="${kicker}">
        <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
      </button>
    </article>
  `;
}

function createMediaFigure(item, className, kicker = "") {
  return `
    <article class="${className} reveal">
      <button type="button" data-modal-src="${item.src}" data-modal-title="${item.title}" data-modal-caption="${item.caption || ""}" data-modal-kicker="${kicker || item.kicker || ""}">
        <figure>
          <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
          <figcaption>
            <h3>${item.title}</h3>
            ${item.caption ? `<p>${item.caption}</p>` : ""}
          </figcaption>
        </figure>
      </button>
    </article>
  `;
}

function renderSimpleGallery(container, items, kicker) {
  if (!container) {
    return;
  }

  container.innerHTML = items.map((item) => createGalleryCard(item, kicker)).join("");
}

function createSafetyFeatureCard(card) {
  const mediaMarkup = card.images
    ? `
      <div class="safety-feature-media-grid">
        ${card.images
          .map(
            (item) => `
              <article class="safety-feature-thumb">
                <button type="button" data-modal-src="${item.src}" data-modal-title="${item.title}" data-modal-caption="" data-modal-kicker="الأمن والسلامة المهنية">
                  <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
                </button>
              </article>
            `
          )
          .join("")}
      </div>
    `
    : `
      <div class="safety-feature-groups">
        ${card.groups
          .map(
            (group) => `
              <section class="safety-feature-group">
                <h4>${group.label}</h4>
                <div class="safety-feature-group-grid safety-feature-group-grid--${group.images.length === 1 ? "single" : group.images.length === 2 ? "double" : "triple"}">
                  ${group.images
                    .map(
                      (src) => `
                        <article class="safety-feature-thumb">
                          <button type="button" data-modal-src="assets/media/${src}" data-modal-title="${card.title}" data-modal-caption="" data-modal-kicker="الأمن والسلامة المهنية">
                            <img src="assets/media/${src}" alt="${card.title}" ${lazyImageAttrs}>
                          </button>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </section>
            `
          )
          .join("")}
      </div>
    `;

  return `
    <article class="subsection-card reveal safety-feature-card">
      <div class="safety-feature-copy">
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>
      ${mediaMarkup}
    </article>
  `;
}

function renderSafetyFeatureCards(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = items.map((item) => createSafetyFeatureCard(item)).join("");
}

function renderPhases() {
  if (!phaseGrid) {
    return;
  }

  phaseGrid.innerHTML = phases
    .map(
      (phase, index) => `
        <article class="phase-card reveal">
          <strong>${numberFormatter.format(index + 1)}</strong>
          ${phase.icon ? `<span class="phase-card-icon"><img src="${phase.icon}" alt="${phase.iconAlt || phase.title}" ${lazyImageAttrs}></span>` : ""}
          <h3>${phase.title}</h3>
          <p>${phase.text}</p>
        </article>
      `
    )
    .join("");
}

function renderProcessGrid(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="process-card reveal">
          <span class="process-step">${item.step}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderCriteriaGrid(container, items) {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item, index) => `
        <article class="criteria-card reveal">
          <span class="criteria-index criteria-index--icon">
            ${item.icon ? `<img src="${item.icon}" alt="${item.title}" ${lazyImageAttrs}>` : numberFormatter.format(index + 1)}
          </span>
          <strong>${item.title}</strong>
        </article>
      `
    )
    .join("");
}

function renderTaskPanel(container, section) {
  if (!container || !section) {
    return;
  }

  container.innerHTML = `
    <p class="section-kicker">مراقبة الجودة</p>
    <h3>${section.title}</h3>
    <ul class="task-list">${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderComponentsSection() {
  renderMetrics(componentMetricGrid, componentMetrics);
  renderDetailCards(componentGrid, componentItems);
  renderSimpleGallery(componentGallery, componentGalleryItems, "مكونات المشروع");
}

function renderMapsSection() {
  renderMapSection();
  renderMapLegend();
  renderDetailCards(siteGrid, siteItems);
  renderDetailCards(streetGrid, streetItems);
}

function renderFieldSection() {
  renderPhases();
  renderSimpleGallery(stageGrid, stageItems, "مراحل العمل بالمشروع");
}

function renderEquipmentSection() {
  renderMetrics(resourceGrid, resourceItems, "resource-card");
  renderDetailCards(equipmentGrid, equipmentItems);
  renderSimpleGallery(equipmentGallery, equipmentGalleryItems, "الأجهزة والمعدات والأدوات");
}

function renderQualitySection() {
  renderStatementCard(qualityLeadCard, qualityLead);
  renderDetailCards(qualityGrid, qualityItems);
  if (standardsLeadText) standardsLeadText.textContent = standardsLeadCopy;
  renderWall(standardsWall, standardItems, "المراجع الفنية والهندسية");
  if (materialLeadText) materialLeadText.textContent = materialLeadCopy;
  renderProcessGrid(materialProcessGrid, materialProcessItems);
  renderSimpleGallery(materialGallery, materialGalleryItems, "معايير جودة الخامات");
  renderDocGrid();
  if (environmentLeadText) environmentLeadText.textContent = environmentLeadCopy;
  renderDetailCards(environmentGrid, environmentItems);
  renderSimpleGallery(environmentGallery, environmentGalleryItems, "معايير الجودة البيئية");
  if (verificationLeadText) verificationLeadText.textContent = verificationLeadCopy;
  renderTaskPanel(verificationExecutionPanel, verificationExecution);
  renderTaskPanel(verificationPmoPanel, verificationPmo);
}

function renderSafetySection() {
  renderStatementCard(safetyLeadCard, safetyLead);
  renderCriteriaGrid(safetyCriteriaGrid, safetyCriteriaItems);
  renderSafetyFeatureCards(safetyGallery, safetyFeatureCards);
}

function renderPartnersSection() {
  renderStatementCard(partnerStatementCard, partnerStatement);
}

function bindSectionEnhancements(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }

  initCounters();
  initReveals();
  section.dataset.rendered = "true";
}

function renderDeferredSection(sectionId) {
  if (!sectionId || renderedSectionIds.has(sectionId)) {
    return;
  }

  switch (sectionId) {
    case "components":
      renderComponentsSection();
      break;
    case "maps":
      renderMapsSection();
      break;
    case "field":
      renderFieldSection();
      break;
    case "equipment":
      renderEquipmentSection();
      break;
    case "quality":
      renderQualitySection();
      break;
    case "safety":
      renderSafetySection();
      break;
    case "partners":
      renderPartnersSection();
      break;
    default:
      return;
  }

  renderedSectionIds.add(sectionId);
  bindSectionEnhancements(sectionId);
}

function renderSectionForSelector(selector) {
  if (!selector || !selector.startsWith("#")) {
    return;
  }

  const sectionId = selector.slice(1);
  const deferredIndex = deferredSectionIds.indexOf(sectionId);

  if (deferredIndex === -1) {
    renderDeferredSection(sectionId);
    return;
  }

  deferredSectionIds.slice(0, deferredIndex + 1).forEach((deferredSectionId) => {
    renderDeferredSection(deferredSectionId);
  });
}

function getSectionsForSelector(selector) {
  if (!selector || !selector.startsWith("#")) {
    return [];
  }

  const target = document.querySelector(selector);
  if (!target) {
    return [];
  }

  const sections = Array.from(document.querySelectorAll("main .section"));
  const targetIndex = sections.findIndex((section) => section === target);
  return targetIndex === -1 ? [target] : sections.slice(0, targetIndex + 1);
}

function prepareSectionsForSelector(selector) {
  const heavySelector = ".gallery-shell, .subsection-stack, .task-columns, .stage-grid, .equipment-gallery, .component-gallery, .photo-grid, .safety-gallery, .logo-wall, .doc-grid, .process-grid, .criteria-grid";

  getSectionsForSelector(selector).forEach((section) => {
    section.style.contentVisibility = "visible";
    section.style.containIntrinsicSize = "auto";

    section.querySelectorAll(heavySelector).forEach((block) => {
      block.style.contentVisibility = "visible";
      block.style.containIntrinsicSize = "auto";
    });
  });
}

function getSelectorScrollTop(selector) {
  const target = document.querySelector(selector);
  if (!target) {
    return null;
  }

  const spacing = window.innerWidth <= 420 ? 10 : window.innerWidth <= 820 ? 14 : 18;
  return Math.max(target.getBoundingClientRect().top + window.scrollY - spacing, 0);
}

function scrollToSelector(selector, behavior = "smooth") {
  const top = getSelectorScrollTop(selector);
  if (top === null) {
    return;
  }

  setActiveScrollLink(selector);
  window.scrollTo({ top, behavior });
}

function setupDeferredSections() {
  if (window.innerWidth <= 820) {
    deferredSectionIds.forEach((sectionId) => renderDeferredSection(sectionId));
    return;
  }

  if (typeof IntersectionObserver === "undefined") {
    deferredSectionIds.forEach((sectionId) => renderDeferredSection(sectionId));
    return;
  }

  if (!sectionObserver) {
    sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            renderDeferredSection(entry.target.id);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "720px 0px", threshold: 0.01 }
    );
  }

  deferredSectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && !renderedSectionIds.has(sectionId)) {
      sectionObserver.observe(section);
    }
  });
}

function warmDeferredSections(index = 0) {
  if (window.innerWidth <= 820) {
    return;
  }

  if (index >= deferredSectionIds.length) {
    return;
  }

  scheduleIdleTask(() => {
    renderDeferredSection(deferredSectionIds[index]);
    warmDeferredSections(index + 1);
  });
}

function renderSafetyPoints() {
  if (!safetyPointsContainer) {
    return;
  }

  safetyPointsContainer.innerHTML = safetyPoints
    .map(
      (item) => `
        <article class="safety-point">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </article>
      `
    )
    .join("");
}

function renderWall(container, items, kicker) {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="logo-card reveal${item.interactive === false ? " logo-card--static" : ""}">
          ${
            item.interactive === false
              ? `<div class="logo-card-media" aria-label="${item.title}">
            <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
          </div>`
              : `<button class="logo-card-media" type="button" data-modal-src="${item.src}" data-modal-title="${item.title}" data-modal-caption="${item.caption || ""}" data-modal-kicker="${kicker}">
            <img src="${item.src}" alt="${item.title}" ${lazyImageAttrs}>
          </button>`
          }
          <div class="logo-card-copy">
            <strong>${item.title}</strong>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDocGrid() {
  if (!docGrid) {
    return;
  }

  docGrid.innerHTML = docItems.map((item) => createMediaFigure(item, "doc-card", "الوثائق والشهادات")).join("");
}

function updateModalZoomValue() {
  if (!modalZoomValue) {
    return;
  }

  modalZoomValue.textContent = `${Math.round(zoomState.scale * 100)}%`;
}

function openModal(source, title, caption, kicker) {
  if (!modalImage || !modalOverline || !modalTitle || !modalCaption || !mediaModal) {
    return;
  }

  modalImage.src = source;
  modalImage.alt = title;
  modalOverline.textContent = kicker || "مرفق بصري";
  modalTitle.textContent = title;
  modalCaption.textContent = caption || "";
  modalCaption.hidden = !caption;
  resetModalZoom();
  mediaModal.classList.add("is-open");
  mediaModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!mediaModal) {
    return;
  }

  resetModalZoom();
  mediaModal.classList.remove("is-open");
  mediaModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getModalPoint(clientX, clientY) {
  if (!modalMedia) {
    return { x: 0, y: 0 };
  }

  const rect = modalMedia.getBoundingClientRect();
  return {
    x: clientX - rect.left - rect.width / 2,
    y: clientY - rect.top - rect.height / 2
  };
}

function clampZoomPan() {
  if (!modalMedia || !modalImage) {
    return;
  }

  const scaledWidth = modalImage.clientWidth * zoomState.scale;
  const scaledHeight = modalImage.clientHeight * zoomState.scale;
  const limitX = Math.max(0, (scaledWidth - modalMedia.clientWidth) / 2);
  const limitY = Math.max(0, (scaledHeight - modalMedia.clientHeight) / 2);
  zoomState.x = clamp(zoomState.x, -limitX, limitX);
  zoomState.y = clamp(zoomState.y, -limitY, limitY);
}

function scheduleModalZoom() {
  if (!modalImage || !modalMedia) {
    return;
  }

  if (zoomState.frame) {
    return;
  }

  zoomState.frame = requestAnimationFrame(() => {
    zoomState.frame = 0;
    clampZoomPan();
    modalImage.style.transform = `translate3d(${zoomState.x}px, ${zoomState.y}px, 0) scale(${zoomState.scale})`;
    modalMedia.classList.toggle("is-zoomed", zoomState.scale > 1.01);
    modalMedia.classList.toggle("is-dragging", zoomState.isDragging);
    modalMedia.classList.toggle("is-interacting", zoomState.isInteracting);
    updateModalZoomValue();
  });
}

function stopWheelInteraction() {
  if (zoomState.wheelTimeout) {
    window.clearTimeout(zoomState.wheelTimeout);
    zoomState.wheelTimeout = 0;
  }
}

function setModalInteraction(isActive) {
  zoomState.isInteracting = isActive;
  scheduleModalZoom();
}

function zoomAtPoint(nextScale, clientX, clientY, baseScale = zoomState.scale, baseX = zoomState.x, baseY = zoomState.y) {
  const clampedScale = clamp(nextScale, 1, MODAL_MAX_SCALE);
  zoomState.scale = clampedScale;

  if (clampedScale <= 1.0001) {
    zoomState.scale = 1;
    zoomState.x = 0;
    zoomState.y = 0;
    scheduleModalZoom();
    return;
  }

  const focal = getModalPoint(clientX, clientY);
  const ratio = clampedScale / Math.max(baseScale, 1);
  zoomState.x = focal.x - (focal.x - baseX) * ratio;
  zoomState.y = focal.y - (focal.y - baseY) * ratio;
  scheduleModalZoom();
}

function resetModalZoom() {
  if (zoomState.frame) {
    cancelAnimationFrame(zoomState.frame);
    zoomState.frame = 0;
  }

  stopWheelInteraction();
  zoomState.scale = 1;
  zoomState.x = 0;
  zoomState.y = 0;
  zoomState.dragStartX = 0;
  zoomState.dragStartY = 0;
  zoomState.originX = 0;
  zoomState.originY = 0;
  zoomState.pinchDistance = 0;
  zoomState.pinchScale = 1;
  zoomState.pinchStartX = 0;
  zoomState.pinchStartY = 0;
  zoomState.pinchCenterX = 0;
  zoomState.pinchCenterY = 0;
  zoomState.isDragging = false;
  zoomState.isInteracting = false;
  zoomState.pointers.clear();

  if (modalImage) {
    modalImage.style.transform = "translate3d(0px, 0px, 0) scale(1)";
  }

  if (modalMedia) {
    modalMedia.classList.remove("is-zoomed", "is-dragging", "is-interacting");
  }

  updateModalZoomValue();
}

function getPointerDistance() {
  const points = Array.from(zoomState.pointers.values());
  if (points.length < 2) {
    return 0;
  }

  const [first, second] = points;
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function getPointerMidpoint() {
  const points = Array.from(zoomState.pointers.values());
  if (points.length < 2) {
    return points[0] || { x: 0, y: 0 };
  }

  const [first, second] = points;
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2
  };
}

function beginPinchGesture() {
  const midpoint = getPointerMidpoint();
  zoomState.pinchDistance = getPointerDistance();
  zoomState.pinchScale = zoomState.scale;
  zoomState.pinchStartX = zoomState.x;
  zoomState.pinchStartY = zoomState.y;
  zoomState.pinchCenterX = midpoint.x;
  zoomState.pinchCenterY = midpoint.y;
  zoomState.isDragging = false;
  setModalInteraction(true);
}

function getModalViewportCenter() {
  if (!modalMedia) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  const rect = modalMedia.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function changeModalZoom(mode) {
  const center = getModalViewportCenter();

  if (mode === "reset") {
    zoomAtPoint(1, center.x, center.y);
    return;
  }

  if (mode === "in") {
    zoomAtPoint(zoomState.scale * 1.2, center.x, center.y);
    return;
  }

  if (mode === "out") {
    zoomAtPoint(zoomState.scale / 1.2, center.x, center.y);
  }
}

function setActiveScrollLink(targetSelector) {
  navScrollButtons.forEach((button) => {
    const isActive = button.dataset.scroll === targetSelector;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function initModalZoom() {
  if (!modalMedia || !modalImage) {
    return;
  }

  modalImage.addEventListener("load", resetModalZoom);

  modalMedia.addEventListener(
    "wheel",
    (event) => {
      if (!mediaModal.classList.contains("is-open")) {
        return;
      }

      event.preventDefault();
      setModalInteraction(true);
      stopWheelInteraction();
      zoomState.wheelTimeout = window.setTimeout(() => {
        zoomState.wheelTimeout = 0;
        if (!zoomState.pointers.size) {
          setModalInteraction(false);
        }
      }, 120);

      const factor = Math.exp(-event.deltaY * 0.0018);
      zoomAtPoint(zoomState.scale * factor, event.clientX, event.clientY);
    },
    { passive: false }
  );

  modalMedia.addEventListener("pointerdown", (event) => {
    if (!mediaModal.classList.contains("is-open")) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    try {
      modalMedia.setPointerCapture(event.pointerId);
    } catch {}

    zoomState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (zoomState.pointers.size === 2) {
      beginPinchGesture();
      return;
    }

    if (zoomState.scale > 1) {
      zoomState.isDragging = true;
      zoomState.dragStartX = event.clientX;
      zoomState.dragStartY = event.clientY;
      zoomState.originX = zoomState.x;
      zoomState.originY = zoomState.y;
      setModalInteraction(true);
    }
  });

  modalMedia.addEventListener("pointermove", (event) => {
    if (!zoomState.pointers.has(event.pointerId)) {
      return;
    }

    zoomState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (zoomState.pointers.size === 2) {
      const distance = getPointerDistance();
      if (zoomState.pinchDistance) {
        const midpoint = getPointerMidpoint();
        const startPoint = getModalPoint(zoomState.pinchCenterX, zoomState.pinchCenterY);
        const currentPoint = getModalPoint(midpoint.x, midpoint.y);
        const nextScale = clamp((distance / zoomState.pinchDistance) * zoomState.pinchScale, 1, MODAL_MAX_SCALE);
        const ratio = nextScale / Math.max(zoomState.pinchScale, 1);
        zoomState.scale = nextScale;

        if (nextScale <= 1.0001) {
          zoomState.scale = 1;
          zoomState.x = 0;
          zoomState.y = 0;
        } else {
          zoomState.x = currentPoint.x - (startPoint.x - zoomState.pinchStartX) * ratio;
          zoomState.y = currentPoint.y - (startPoint.y - zoomState.pinchStartY) * ratio;
        }

        scheduleModalZoom();
      }
      return;
    }

    if (zoomState.isDragging && zoomState.scale > 1) {
      zoomState.x = zoomState.originX + (event.clientX - zoomState.dragStartX);
      zoomState.y = zoomState.originY + (event.clientY - zoomState.dragStartY);
      scheduleModalZoom();
    }
  });

  const stopPointer = (event) => {
    if (!zoomState.pointers.has(event.pointerId)) {
      return;
    }

    try {
      modalMedia.releasePointerCapture(event.pointerId);
    } catch {}

    zoomState.pointers.delete(event.pointerId);

    if (zoomState.pointers.size < 2) {
      zoomState.pinchDistance = 0;
      zoomState.pinchScale = zoomState.scale;
      zoomState.pinchStartX = zoomState.x;
      zoomState.pinchStartY = zoomState.y;
    }

    if (zoomState.pointers.size === 1 && zoomState.scale > 1) {
      const [remainingPointer] = zoomState.pointers.values();
      zoomState.isDragging = true;
      zoomState.dragStartX = remainingPointer.x;
      zoomState.dragStartY = remainingPointer.y;
      zoomState.originX = zoomState.x;
      zoomState.originY = zoomState.y;
      setModalInteraction(true);
      return;
    }

    if (!zoomState.pointers.size) {
      zoomState.isDragging = false;
      if (!zoomState.wheelTimeout) {
        setModalInteraction(false);
      } else {
        scheduleModalZoom();
      }
    }
  };

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    modalMedia.addEventListener(eventName, stopPointer);
  });

  modalMedia.addEventListener("dblclick", (event) => {
    zoomAtPoint(zoomState.scale > 1 ? 1 : 2, event.clientX, event.clientY);
  });

  window.addEventListener(
    "resize",
    () => {
      if (mediaModal.classList.contains("is-open")) {
        scheduleModalZoom();
      }
    },
    { passive: true }
  );
}

function animateCounter(counter) {
  const target = Number(counter.dataset.counter);
  const duration = 1400;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = numberFormatter.format(Math.round(target * eased));
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      counter.textContent = numberFormatter.format(target);
    }
  }

  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = Array.from(document.querySelectorAll("[data-counter]")).filter((counter) => !counter.dataset.counterBound);
  const prefersReducedMotion =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!counters.length || typeof IntersectionObserver === "undefined" || prefersReducedMotion) {
    counters.forEach((counter) => {
      counter.dataset.counterBound = "true";
      counter.textContent = numberFormatter.format(Number(counter.dataset.counter || 0));
    });
    return;
  }

  if (!counterObserver) {
    const isMobile = isMobileViewport();
    counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = "true";
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: isMobile ? 0.18 : 0.45, rootMargin: isMobile ? "0px 0px -8% 0px" : "0px" }
    );
  }

  counters.forEach((counter) => {
    counter.dataset.counterBound = "true";
    counterObserver.observe(counter);
  });
}

function initReveals() {
  const items = Array.from(document.querySelectorAll(".reveal")).filter((item) => !item.dataset.revealBound);
  if (!items.length) {
    return;
  }

  if (typeof IntersectionObserver === "undefined" || isMobileViewport()) {
    items.forEach((item) => {
      item.dataset.revealBound = "true";
      item.classList.add("is-visible");
    });
    return;
  }

  document.documentElement.classList.add("js-enabled");
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -36px 0px" }
    );
  }

  items.forEach((item) => {
    item.dataset.revealBound = "true";
    revealObserver.observe(item);
  });
}

function initScrollButtons() {
  Array.from(document.querySelectorAll("[data-scroll]")).forEach((button) => {
    button.addEventListener("click", () => {
      renderSectionForSelector(button.dataset.scroll);
      prepareSectionsForSelector(button.dataset.scroll);

      const motion = isMobileViewport() || (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        ? "auto"
        : "smooth";

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToSelector(button.dataset.scroll, motion);
          window.setTimeout(() => scrollToSelector(button.dataset.scroll, "auto"), 220);
          window.setTimeout(() => scrollToSelector(button.dataset.scroll, "auto"), 520);
        });
      });
    });
  });
}

function initScrollSpy() {
  const sectionMap = navScrollButtons
    .map((button) => ({
      button,
      selector: button.dataset.scroll,
      section: document.querySelector(button.dataset.scroll)
    }))
    .filter((item) => item.section)
    .sort((first, second) => first.section.offsetTop - second.section.offsetTop);

  if (!sectionMap.length) {
    return;
  }

  let frame = 0;

  const updateActiveSection = () => {
    frame = 0;
    const offset = window.scrollY + (isMobileViewport() ? 120 : Math.max(window.innerHeight * 0.28, 220));
    let activeSelector = sectionMap[0].selector;

    sectionMap.forEach((item) => {
      if (item.section.offsetTop <= offset) {
        activeSelector = item.selector;
      }
    });

    setActiveScrollLink(activeSelector);
  };

  const queueUpdate = () => {
    if (frame) {
      return;
    }

    frame = requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate, { passive: true });
  window.addEventListener("load", queueUpdate, { passive: true });
  updateActiveSection();
}

function attachEvents() {
  if (heroThumbs) {
    heroThumbs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-hero-index]");
      if (!button) {
        return;
      }

      state.heroMedia = Number(button.dataset.heroIndex);
      renderHeroMedia();
    });
  }

  if (mapThumbs) {
    mapThumbs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-map-index]");
      if (!button) {
        return;
      }

      state.mapMedia = Number(button.dataset.mapIndex);
      renderMapSection();
    });
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal-src]");
    if (!trigger) {
      return;
    }

    openModal(trigger.dataset.modalSrc, trigger.dataset.modalTitle, trigger.dataset.modalCaption, trigger.dataset.modalKicker);
  });

  Array.from(document.querySelectorAll("[data-close-modal]")).forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  Array.from(document.querySelectorAll("[data-modal-zoom]")).forEach((button) => {
    button.addEventListener("click", () => {
      if (!mediaModal.classList.contains("is-open")) {
        return;
      }

      changeModalZoom(button.dataset.modalZoom);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!mediaModal.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "+" || event.key === "=" || event.key === "NumpadAdd") {
      event.preventDefault();
      changeModalZoom("in");
      return;
    }

    if (event.key === "-" || event.key === "_" || event.key === "NumpadSubtract") {
      event.preventDefault();
      changeModalZoom("out");
      return;
    }

    if (event.key === "0") {
      event.preventDefault();
      changeModalZoom("reset");
    }
  });
}

function render() {
  renderHeroBadges();
  renderChapterGrid();
  renderHeroMedia();
  renderDetailCards(strategyGrid, strategyItems);
  renderStatementCard(visionStatementCard, visionStatement);
  renderDetailCards(strategicGrid, strategicItems);
  renderStatementCard(overviewLeadCard, overviewLead);
  renderEntityCards(overviewEntityGrid, overviewEntityItems);
  renderMetrics(metricGrid, overviewMetrics);
  renderDetailCards(projectDataGrid, projectDataItems);
}

render();
attachEvents();
initScrollButtons();
initScrollSpy();
initCounters();
initReveals();
initModalZoom();
setupDeferredSections();
renderSectionForSelector(window.location.hash);
window.setTimeout(() => warmDeferredSections(), 180);
