const state = {
  heroMedia: 0,
  mapMedia: 0
};

const pad = (value) => String(value).padStart(3, "0");
const png = (value) => `assets/media/carved_${pad(value)}.png`;
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => start + index);
const entityLogos = {
  owner: png(2),
  contractor: png(13),
  consultant: "assets/media/wsp-logo.jpeg"
};

const heroBadges = [
  {
    title: "الجهة المالكة",
    text: "أمانة جدة ضمن برامج تطوير البنية التحتية ورفع كفاءة تصريف مياه الأمطار بمحافظة جدة.",
    logo: entityLogos.owner,
    logoAlt: "شعار أمانة جدة"
  },
  {
    title: "استشاري الإشراف",
    text: "مكتب WSP بصفته الاستشاري المشرف على التنفيذ وفق المرجعيات الفنية والهندسية والاشتراطات المعتمدة بالمشروع.",
    logo: entityLogos.consultant,
    logoAlt: "شعار استشاري الإشراف"
  },
  {
    title: "المقاول المنفذ",
    text: "شركة اليمامة للمقاولات، مع متابعة تنفيذية ميدانية وفق الاشتراطات والبرامج المعتمدة.",
    logo: entityLogos.contractor,
    logoAlt: "شعار شركة اليمامة للمقاولات"
  },
  {
    title: "رقم المشروع",
    text: "4/001/0602/03/00/4"
  },
  {
    title: "مدة التنفيذ",
    text: "24 شهرًا هجريًا مع تمديد إضافي قدره 135 يومًا لاستكمال الأعمال الإضافية."
  }
];

const chapterItems = [
  { number: "1", title: "الهدف والرؤية والرسالة" },
  { number: "2", title: "نظرة عامة حول المشروع" },
  { number: "3", title: "جودة المشروع" },
  { number: "4", title: "الأمن والسلامة المهنية بالمشروع" },
  { number: "5", title: "صور قبل وبعد تنفيذ المشروع" },
  { number: "6", title: "المخاطر والتحديات بالمشروع" },
  { number: "7", title: "مكونات المشروع" }
];

const strategyItems = [
  {
    kicker: "الهدف",
    title: "عرض المحاور التنفيذية للمشروع",
    text:
      "يمثل المشروع أحد مشاريع برنامج تصريف مياه الأمطار بمحافظة جدة، ويغطي عناصر العمل ومكونات المشروع ومعايير الجودة والمخاطر والتحديات التي صاحبت التنفيذ في طريق الملك فيصل (عابر القارات سابقًا) – أبحر الشمالية."
  },
  {
    kicker: "رؤية المملكة 2030",
    title: "المشروع ضمن برامج تحقيق الرؤية",
    text:
      "يُعد المشروع من مشاريع البرامج التنفيذية المرتبطة بتحقيق رؤية المملكة 2030، والتي تستهدف إنشاء منظومة شاملة ومتكاملة لتصريف مياه الأمطار ودرء أخطار السيول عبر مجموعة متتابعة من المشروعات التي تكوّن الهيكل النهائي للبرنامج."
  },
  {
    kicker: "الجوانب الاستراتيجية",
    title: "الأهمية الاستراتيجية والموقع الجغرافي",
    text:
      "يُصنف المشروع ضمن الحزمة المحورية لمعالجة المناطق الأكثر تضررًا من تجمعات المياه والسيول، كما تبرز أهميته من موقعه الجغرافي داخل نطاق حيوي ذي كثافة سكانية ونشاط سكني وتجاري."
  },
  {
    kicker: "مرجع البيانات والمعلومات",
    title: "مرجعية فنية وتنظيمية معتمدة",
    text:
      "استندت البيانات والمعلومات إلى استشاري الإشراف على التنفيذ والمقاول المنفذ، وتم إعدادها وفقًا للكود السعودي للبناء والإنشاءات وبما يتوافق مع المعايير الهندسية والمدنية المعمول بها داخل المملكة، مع مواءمتها للأنظمة المتبعة بالأمانة."
  }
];

const metrics = [
  {
    value: 26000,
    unit: "م",
    label: "أطوال المواسير",
    detail: "شبكة رئيسة وفرعية تنتهي بمصب على البحر وتخدم نطاق المشروع داخل أبحر الشمالية."
  },
  {
    value: 495,
    unit: "مصيدة",
    label: "مصائد تجميع المياه",
    detail: "تجميع مياه الأمطار وتوزيعها داخل خطوط النقل بالشبكة."
  },
  {
    value: 154,
    unit: "غرفة",
    label: "غرف التفتيش",
    detail: "ربط الخطوط وتسهيل عمليات التشغيل والصيانة المستقبلية."
  },
  {
    value: 24,
    unit: "شهر هجري",
    label: "مدة التنفيذ الأساسية",
    detail: "عمل متواصل مع تمديد إضافي مقداره 135 يومًا لاستكمال الأعمال الإضافية."
  }
];

const resourceItems = [
  {
    value: 192,
    unit: "فرد",
    label: "العنصر البشري",
    detail: "مهندسون، فنيون، وعمال موزعون على فرق صباحية ومسائية وفرق طوارئ على مدار الساعة."
  },
  {
    value: 106,
    unit: "معدة",
    label: "العنصر التشغيلي",
    detail: "معدات خفيفة وثقيلة ومعدات حفر وردم ودك ومولدات ومضخات وآليات مساندة."
  }
];

const phases = [
  {
    title: "ترسية المشروع واستلام الموقع",
    text: "تمت ترسية المشروع بتاريخ 1443/06/10، واستلام الموقع من قبل المقاول بتاريخ 1443/08/10 لبدء العمل."
  },
  {
    title: "الرفع المساحي وتوريد الخامات",
    text: "تجهيز الموقع ورفعه مساحيًا وفق إحداثيات الأمانة، مع توريد الخامات والمعدات إلى مقر العمل."
  },
  {
    title: "أعمال الحفر والتركيب",
    text: "حفر الخطوط الرئيسة والفرعية وتركيب المواسير وغرف التفتيش ومصائد تجميع المياه."
  },
  {
    title: "أعمال الردم والسفلتة",
    text: "ردم وتسوية ورصف الشوارع والطرق بالمشروع وإعادتها لحالتها الطبيعية."
  },
  {
    title: "الاختبارات وتسليم الموقع",
    text: "اختبارات وفحوصات لشبكة التصريف، وتصوير تلفزيوني CCTV لجميع المواسير للتحقق من السلامة والجاهزية."
  }
];

const overviewItems = [
  {
    kicker: "تعريف المشروع",
    title: "حل تجمعات المياه ضمن نطاق سكني وتجاري",
    text:
      "يُعد المشروع من مشاريع برنامج تصريف مياه الأمطار بمحافظة جدة، وتبرز أهميته من موقعه الجغرافي ودوره في معالجة تجمعات المياه داخل الحي والمنطقة السكنية والتجارية المحيطة."
  },
  {
    kicker: "الجهة المالكة",
    title: "أمانة جدة",
    text:
      "تم طرح المشروع من قبل أمانة جدة بصفتها الجهة المالكة والمشرفة على إطار المشروع العام ضمن برامج تطوير البنية التحتية ورفع كفاءة شبكات تصريف مياه الأمطار.",
    logo: entityLogos.owner,
    logoAlt: "شعار أمانة جدة"
  },
  {
    kicker: "استشاري الإشراف",
    title: "مكتب WSP",
    text:
      "يتولى مكتب WSP متابعة الجوانب الفنية والهندسية، ومراجعة الأعمال المنفذة، والتحقق من توافق التنفيذ مع المخططات والاشتراطات والمعايير المعتمدة بالمشروع.",
    logo: entityLogos.consultant,
    logoAlt: "شعار استشاري الإشراف"
  },
  {
    kicker: "المقاول المنفذ",
    title: "شركة اليمامة للمقاولات",
    text:
      "تتولى شركة اليمامة للمقاولات تنفيذ أعمال المشروع الميدانية، بما يشمل أعمال الحفر والتركيب والربط والردم والسفلتة والاختبارات الختامية واستكمال عناصر الشبكة.",
    logo: entityLogos.contractor,
    logoAlt: "شعار شركة اليمامة للمقاولات"
  },
  {
    kicker: "مكونات المشروع",
    title: "شبكة متكاملة تنتهي بمصب بحري",
    text:
      "يتكون المشروع من مواسير بأقطار مختلفة موزعة على شوارع وطرق المنطقة المخدومة، وتنتهي هذه المواسير بمصب على البحر، إضافة إلى مصائد تجميع مياه وغرف تفتيش تربط الخطوط وتدعم أعمال الصيانة المستقبلية."
  }
];

const heroMediaItems = [
  {
    src: png(55),
    title: "الخريطة الجوية العامة للمشروع",
    caption: "خريطة جوية تبين امتداد الشبكة ومسار الخدمة داخل النطاق العمراني المستهدف."
  },
  {
    src: png(52),
    title: "خريطة الشبكة ومصائد التجميع",
    caption: "مخطط يبرز توزيع الخطوط والمصائد ونقاط الربط داخل أبحر الشمالية."
  },
  {
    src: png(7),
    title: "المخطط المكاني التفصيلي",
    caption: "قراءة مكانية إضافية تبين نطاق المشروع وعلاقته بالمحاور والشوارع المخدومة."
  }
];

const mapMediaItems = [
  {
    src: png(55),
    kicker: "الصورة الجوية",
    title: "امتداد المشروع على الخريطة الجوية",
    text: "تظهر الخريطة الامتداد الفعلي للمشروع داخل المشهد الحضري، وتبين العلاقة بين مسار الشبكة والطرق والأحياء المخدومة.",
    insights: [
      "يقع المشروع في شمال محافظة جدة على يسار طريق المدينة.",
      "المشروع ضمن حدود بلدية أبحر ويخدم شوارع وطرقًا حيوية في المنطقة.",
      "قراءة المسار على الصورة الجوية تدعم فهم موقع المخرج النهائي واتجاه التصريف."
    ]
  },
  {
    src: png(52),
    kicker: "المخطط التشغيلي",
    title: "توزيع الشبكة ومصائد التجميع",
    text: "يبين المخطط عناصر الشبكة بطريقة تشغيلية أدق، ويوضح انتقال المياه من الشوارع الداخلية إلى المسار الرئيس ثم إلى المخرج النهائي.",
    insights: [
      "التوزيع يبرز كثافة نقاط التجميع داخل المنطقة المخدومة.",
      "العلاقة بين الخط الرئيس والفروع الداخلية واضحة بصريًا.",
      "المخطط يدعم قراءة عناصر الشبكة على مستوى التشغيل والصيانة."
    ]
  },
  {
    src: png(7),
    kicker: "المشهد التفصيلي",
    title: "قراءة تفصيلية إضافية للموقع",
    text: "يوفر الرسم منظورًا مكملًا لموقع المشروع ومساره داخل الأحياء، ويساعد على فهم الحساسية المكانية للموقع ضمن بيئة عمرانية نشطة.",
    insights: [
      "المشروع يخدم شوارع رئيسة وشوارع داخلية ضمن النطاق العمراني.",
      "يسهم الموقع الجغرافي في إبراز الأهمية الاستراتيجية للمشروع.",
      "المخطط يدعم قراءة حدود الخدمة والعلاقة مع النسيج الحضري المحيط."
    ]
  }
];

const siteItems = [
  {
    kicker: "الموقع الجغرافي",
    title: "شمال محافظة جدة ضمن حدود بلدية أبحر",
    text:
      "يقع المشروع في شمال محافظة جدة على يسار طريق المدينة، ويقع ضمن حدود بلدية أبحر، ويخدم مجموعة من الشوارع والطرق الحيوية داخل المنطقة."
  },
  {
    kicker: "النطاق الخدمي",
    title: "شوارع رئيسة وداخلية ضمن منطقة سكنية وتجارية",
    text:
      "يشمل المشروع الشوارع الرئيسة المخدومة إلى جانب شوارع داخلية، مع أثر مباشر على الحي والمنطقة السكنية والتجارية المحيطة."
  },
  {
    kicker: "عناصر العمل",
    title: "كوادر بشرية ومعدات تشغيلية على مدار الساعة",
    text:
      "انقسمت عناصر العمل إلى عنصر بشري من الكوادر الفنية المؤهلة لأعمال التنفيذ والإشراف والمتابعة، وعنصر تشغيلي من المعدات الخفيفة والثقيلة والأدوات اللازمة لإنجاز الأعمال على الوجه الصحيح."
  }
];

const stageItems = range(20, 43).map((value) => ({
  src: png(value),
  title: "مراحل العمل بالمشروع",
  caption: ""
}));

const safetyItems = [
  {
    src: png(62),
    title: "جاهزية الفرق والمعدات",
    caption: "مشهد ميداني يبرز الجاهزية التشغيلية وتنظيم العمل على الأرض."
  },
  {
    src: png(66),
    title: "السلامة أثناء أعمال المناهل",
    caption: "إشراف وتأمين أثناء تنفيذ الأعمال المرتبطة بفتحات العمل داخل الشارع."
  },
  {
    src: png(67),
    title: "السلامة أثناء الحفر",
    caption: "صورة ميدانية تدعم محور أعمال الحفر والمعدات ضمن بيئة عمل منضبطة."
  },
  {
    src: png(83),
    title: "مركبة السلامة ليلًا",
    caption: "توثيق للتحويلات والتنبيهات المرورية خلال فترات العمل المسائية."
  },
  {
    src: png(84),
    title: "دعم السلامة المرورية",
    caption: "إحدى صور التأمين المروري والمركبات المساندة داخل نطاق العمل."
  },
  {
    src: png(88),
    title: "أعمال السلامة والمرور",
    caption: "صورة إضافية من مشهد التحويلات والتأمين المروري ضمن المشروع."
  }
];

const safetyPoints = [
  {
    title: "إجراءات ومعايير توفر بيئة آمنة",
    text: "تم اتباع مجموعة من الإجراءات والمعايير التي توفر بيئة آمنة للعمل وتحافظ على العمال والمعدات والأدوات والممتلكات العامة والخاصة."
  },
  {
    title: "لوحات إرشادية وتحويلات مرورية",
    text: "تم استخدام اللوحات الإرشادية على الطرق كإحدى وسائل السلامة المرورية بالتنسيق مع الإدارة العامة لشرطة المرور بمحافظة جدة."
  },
  {
    title: "خطة أمن وسلامة على مدار الساعة",
    text: "نُفذت الأعمال وفق خطة أمن وسلامة محكمة، مع لقاءات واجتماعات دورية لتوضيح الخطة والوقوف على مدى الالتزام بالاشتراطات المطلوبة."
  }
];

const safetyDetailItems = [
  {
    kicker: "المعيار العام",
    title: "سلامة العاملين والموقع والمجتمع",
    text:
      "حرصت أمانة جدة على توفير كافة الاحتياطات ووسائل الأمن والسلامة العامة بما يحافظ على سلامة العمال والمعدات والأدوات والممتلكات العامة والخاصة، ويحد من المخاطر أو الأضرار التي قد تعطل التنفيذ."
  },
  {
    kicker: "اللوحات الإرشادية",
    title: "تنظيم مروري بالتنسيق مع المرور",
    text:
      "استُخدمت اللوحات الإرشادية كأداة لتنبيه قائدي المركبات بالإرشادات والتعليمات المرتبطة بالتحويلات المرورية وأحوال الطرق، وذلك بالتنسيق مع الإدارة العامة لشرطة المرور بمحافظة جدة."
  },
  {
    kicker: "خطة الأمن والسلامة",
    title: "تحويلات نهارية وليلية واجتماعات دورية",
    text:
      "شملت منظومة السلامة خطط التحويلات المرورية نهارًا وليلًا، إضافة إلى اللقاءات الدورية مع العمال ومهندسي المواقع لتوضيح الخطة والتحقق من الالتزام بها."
  }
];

const qualityItems = [
  {
    kicker: "خطة الجودة",
    title: "إدارة الجودة تبدأ قبل التنفيذ",
    text:
      "تمثل جودة المشروع أحد العناصر الأساسية لنجاحه، ولذلك جرى تطبيق خطة جودة تصف الأنشطة والمعايير والعمليات اللازمة لضمان التنفيذ بالشكل الأمثل، بدءًا من مرحلة ما قبل التنفيذ."
  },
  {
    kicker: "المعايير الفنية والهندسية",
    title: "التقيد بالمواصفات الوطنية والدولية",
    text:
      "راعى المشروع اتباع المعايير الفنية والهندسية التي تضمن الجودة في التنفيذ والإخراج، ومنها أنظمة الجودة العالمية ISO 9001 والعديد من المواصفات الوطنية والدولية والأكواد والأدلة المرجعية المختلفة."
  },
  {
    kicker: "معايير السلامة المهنية",
    title: "حماية العاملين والمجتمع أثناء التنفيذ",
    text:
      "وُصفت معايير السلامة المهنية بأنها المسؤولة عن ضمان سلامة وصحة ظروف العمل للعاملين وللمجتمع، بما يحد من المخاطر ويحافظ على الأرواح والممتلكات."
  },
  {
    kicker: "معايير جودة الخامات",
    title: "اختيار الخامات عبر الاعتماد والاختبار",
    text:
      "اتبع المشروع سياسة جودة في اختيار الخامات من خلال تحديد نوع الخامة، وطلب اعتمادها، واختبارها، ثم تحديد حالتها قبولًا أو رفضًا، بما يضمن تنفيذ شبكة ذات جودة وكفاءة عالية تعمل في أشد الظروف ولأطول فترة ممكنة."
  },
  {
    kicker: "الجودة البيئية",
    title: "حماية البيئة المحيطة بالمشروع",
    text:
      "شملت أعمال المشروع مراعاة معايير الجودة البيئية عبر التخلص السليم من المخلفات والردميات، والحد من عوادم المعدات والانبعاثات الحرارية والأتربة والضوضاء، واستخدام مواد وخامات صديقة للبيئة."
  },
  {
    kicker: "مراقبة الجودة واختبارات التحقق",
    title: "رقابة مستمرة على التنفيذ والمخرجات",
    text:
      "اعتمد المشروع سياسة مراقبة الجودة في جميع مراحل التنفيذ، مع اختبارات تحقق للمواد والخامات والأدوات، ومراجعة واعتماد المخططات التنفيذية، واستلام واعتماد الأعمال المنفذة، والقيام بجولات ميدانية واجتماعات دورية."
  }
];

const standardItems = [
  {
    src: png(76),
    title: "ISO 9001",
    caption: "نظام جودة عالمي ضمن المرجعيات الفنية والهندسية بالمشروع."
  },
  {
    src: png(78),
    title: "الهيئة السعودية للمواصفات والمقاييس",
    caption: "مرجعية وطنية للمواصفات والمعايير الفنية المرتبطة بجودة التنفيذ."
  },
  {
    src: png(75),
    title: "المواصفات القياسية البريطانية",
    caption: "مرجع فني دولي ضمن المواصفات الهندسية المعتمدة."
  },
  {
    src: png(74),
    title: "الجمعية الأمريكية لمهندسي الطرق",
    caption: "مرجع فني للمواصفات الهندسية المعتمدة في التنفيذ."
  },
  {
    src: png(77),
    title: "وزارة الشؤون البلدية والقروية",
    caption: "مواصفات ومرجعيات تنظيمية مرتبطة بالمشروع والتنفيذ."
  },
  {
    src: png(79),
    title: "وزارة النقل",
    caption: "مرجعية فنية وتنظيمية مرتبطة بالمواصفات المعتمدة في التنفيذ."
  }
];

const docItems = [
  { src: png(93), title: "شهادة ضمان خامة", caption: "نموذج من شهادات ضمان الخامات بالمشروع." },
  { src: png(94), title: "نموذج اعتماد خامة", caption: "وثيقة مرتبطة بإجراءات اعتماد المواد والخامات قبل التنفيذ." },
  { src: png(95), title: "نموذج اختبار خامة", caption: "مادة داعمة لاختبارات التحقق وصلاحية الاستخدام في التنفيذ." },
  { src: png(96), title: "نموذج متابعة جودة", caption: "صفحة توثيقية داعمة لمحور الجودة ومراقبة التنفيذ." },
  { src: png(102), title: "وثيقة تحقق واعتماد", caption: "مستند بصري مساند لأعمال التحقق والاعتماد والمتابعة." },
  { src: png(103), title: "وثيقة داعمة للجودة", caption: "وثيقة إضافية مرتبطة بمحاور الجودة والامتثال والتحقق." }
];

const numberFormatter = new Intl.NumberFormat("ar-SA");

const heroBadgesContainer = document.getElementById("heroBadges");
const chapterGrid = document.getElementById("chapterGrid");
const strategyGrid = document.getElementById("strategyGrid");
const heroFeatureTrigger = document.getElementById("heroFeatureTrigger");
const heroFeatureImage = document.getElementById("heroFeatureImage");
const heroFeatureCaption = document.getElementById("heroFeatureCaption");
const heroThumbs = document.getElementById("heroThumbs");
const metricGrid = document.getElementById("metricGrid");
const resourceGrid = document.getElementById("resourceGrid");
const phaseGrid = document.getElementById("phaseGrid");
const overviewGrid = document.getElementById("overviewGrid");
const mapFeatureTrigger = document.getElementById("mapFeatureTrigger");
const mapFeatureImage = document.getElementById("mapFeatureImage");
const mapFeatureKicker = document.getElementById("mapFeatureKicker");
const mapFeatureTitle = document.getElementById("mapFeatureTitle");
const mapFeatureText = document.getElementById("mapFeatureText");
const mapThumbs = document.getElementById("mapThumbs");
const mapInsights = document.getElementById("mapInsights");
const siteGrid = document.getElementById("siteGrid");
const stageGrid = document.getElementById("stageGrid");
const safetyPointsContainer = document.getElementById("safetyPoints");
const safetyGallery = document.getElementById("safetyGallery");
const safetyDetailGrid = document.getElementById("safetyDetailGrid");
const qualityGrid = document.getElementById("qualityGrid");
const standardsWall = document.getElementById("standardsWall");
const docGrid = document.getElementById("docGrid");
const mediaModal = document.getElementById("mediaModal");
const modalImage = document.getElementById("modalImage");
const modalOverline = document.getElementById("modalOverline");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");

function setZoomTarget(element, item, fallbackKicker) {
  if (!element || !item) {
    return;
  }

  element.dataset.modalSrc = item.src;
  element.dataset.modalTitle = item.title;
  element.dataset.modalCaption = item.caption || item.text || "";
  element.dataset.modalKicker = item.kicker || fallbackKicker || "عرض تفصيلي";
}

function renderHeroBadges() {
  heroBadgesContainer.innerHTML = heroBadges
    .map(
      (item) => `
        <article class="hero-badge">
          <div class="hero-badge-head">
            ${item.logo ? `<span class="entity-badge-mark"><img src="${item.logo}" alt="${item.logoAlt || item.title}" loading="lazy"></span>` : ""}
            <strong>${item.title}</strong>
          </div>
          <span>${item.text}</span>
        </article>
      `
    )
    .join("");
}

function renderChapterGrid() {
  chapterGrid.innerHTML = chapterItems
    .map(
      (item) => `
        <article class="chapter-card reveal">
          <strong>${item.number}</strong>
          <h3>${item.title}</h3>
        </article>
      `
    )
    .join("");
}

function renderDetailCards(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <article class="detail-card reveal">
          <div class="detail-card-head ${item.logo ? "detail-card-head--with-logo" : ""}">
            ${item.logo ? `<span class="entity-card-mark"><img src="${item.logo}" alt="${item.logoAlt || item.title}" loading="lazy"></span>` : ""}
            <div>
              ${item.kicker ? `<p class="section-kicker">${item.kicker}</p>` : ""}
              <h3>${item.title}</h3>
            </div>
          </div>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderHeroMedia() {
  const current = heroMediaItems[state.heroMedia];
  heroFeatureImage.src = current.src;
  heroFeatureImage.alt = current.title;
  heroFeatureCaption.textContent = current.caption;
  setZoomTarget(heroFeatureTrigger, current, "المشهد المكاني");

  heroThumbs.innerHTML = heroMediaItems
    .map(
      (item, index) => `
        <button
          class="thumb-button ${index === state.heroMedia ? "is-active" : ""}"
          type="button"
          data-hero-index="${index}"
        >
          <img src="${item.src}" alt="${item.title}" loading="lazy">
        </button>
      `
    )
    .join("");
}

function renderMetrics(container, items, className = "metric-card") {
  container.innerHTML = items
    .map(
      (metric) => `
        <article class="${className} reveal">
          <small>${metric.label}</small>
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

function renderPhases() {
  phaseGrid.innerHTML = phases
    .map(
      (phase, index) => `
        <article class="phase-card reveal">
          <strong>${numberFormatter.format(index + 1)}</strong>
          <h3>${phase.title}</h3>
          <p>${phase.text}</p>
        </article>
      `
    )
    .join("");
}

function renderMapSection() {
  const current = mapMediaItems[state.mapMedia];

  mapFeatureImage.src = current.src;
  mapFeatureImage.alt = current.title;
  mapFeatureKicker.textContent = current.kicker;
  mapFeatureTitle.textContent = current.title;
  mapFeatureText.textContent = current.text;
  setZoomTarget(
    mapFeatureTrigger,
    {
      src: current.src,
      title: current.title,
      caption: current.text,
      kicker: current.kicker
    },
    current.kicker
  );

  mapThumbs.innerHTML = mapMediaItems
    .map(
      (item, index) => `
        <button
          class="thumb-button ${index === state.mapMedia ? "is-active" : ""}"
          type="button"
          data-map-index="${index}"
        >
          <img src="${item.src}" alt="${item.title}" loading="lazy">
        </button>
      `
    )
    .join("");

  mapInsights.innerHTML = `
    <strong>أبرز القراءات</strong>
    ${current.insights.map((item) => `<p>${item}</p>`).join("")}
  `;
}

function createMediaFigure(item, className, kicker = "") {
  return `
    <article class="${className} reveal">
      <button
        type="button"
        data-modal-src="${item.src}"
        data-modal-title="${item.title}"
        data-modal-caption="${item.caption}"
        data-modal-kicker="${kicker || item.kicker || ""}"
      >
        <figure>
          <img src="${item.src}" alt="${item.title}" loading="lazy">
          <figcaption>
            <h3>${item.title}</h3>
            ${item.caption ? `<p>${item.caption}</p>` : ""}
          </figcaption>
        </figure>
      </button>
    </article>
  `;
}

function renderStageGrid() {
  stageGrid.innerHTML = stageItems
    .map(
      (item) => `
        <article class="stage-card reveal">
          <button
            type="button"
            data-modal-src="${item.src}"
            data-modal-title="${item.title}"
            data-modal-caption=""
            data-modal-kicker="مراحل العمل بالمشروع"
          >
            <figure>
              <img src="${item.src}" alt="${item.title}" loading="lazy">
              <figcaption>
                <h3>${item.title}</h3>
              </figcaption>
            </figure>
          </button>
        </article>
      `
    )
    .join("");
}

function renderSafetySection() {
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

  safetyGallery.innerHTML = safetyItems.map((item) => createMediaFigure(item, "safety-card", "الأمن والسلامة")).join("");
  renderDetailCards(safetyDetailGrid, safetyDetailItems);
}

function renderWall(container, items, kicker) {
  container.innerHTML = items
    .map(
      (item) => `
        <article class="logo-card reveal">
          <button
            type="button"
            data-modal-src="${item.src}"
            data-modal-title="${item.title}"
            data-modal-caption="${item.caption}"
            data-modal-kicker="${kicker}"
          >
            <img src="${item.src}" alt="${item.title}" loading="lazy">
          </button>
        </article>
      `
    )
    .join("");
}

function renderDocGrid() {
  docGrid.innerHTML = docItems.map((item) => createMediaFigure(item, "doc-card", "الوثائق والشهادات")).join("");
}

function openModal(source, title, caption, kicker) {
  modalImage.src = source;
  modalImage.alt = title;
  modalOverline.textContent = kicker || "مرفق بصري";
  modalTitle.textContent = title;
  modalCaption.textContent = caption || "";
  modalCaption.hidden = !caption;
  mediaModal.classList.add("is-open");
  mediaModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  mediaModal.classList.remove("is-open");
  mediaModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
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
  const counters = Array.from(document.querySelectorAll("[data-counter]"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initReveals() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -36px 0px"
    }
  );

  items.forEach((item) => observer.observe(item));
}

function initScrollButtons() {
  Array.from(document.querySelectorAll("[data-scroll]")).forEach((button) => {
    button.addEventListener("click", () => {
      const selector = button.dataset.scroll;
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function attachEvents() {
  heroThumbs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-index]");
    if (!button) {
      return;
    }

    state.heroMedia = Number(button.dataset.heroIndex);
    renderHeroMedia();
  });

  mapThumbs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-map-index]");
    if (!button) {
      return;
    }

    state.mapMedia = Number(button.dataset.mapIndex);
    renderMapSection();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal-src]");
    if (!trigger) {
      return;
    }

    openModal(
      trigger.dataset.modalSrc,
      trigger.dataset.modalTitle,
      trigger.dataset.modalCaption,
      trigger.dataset.modalKicker
    );
  });

  Array.from(document.querySelectorAll("[data-close-modal]")).forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function render() {
  renderHeroBadges();
  renderChapterGrid();
  renderDetailCards(strategyGrid, strategyItems);
  renderHeroMedia();
  renderMetrics(metricGrid, metrics);
  renderMetrics(resourceGrid, resourceItems, "resource-card");
  renderPhases();
  renderDetailCards(overviewGrid, overviewItems);
  renderMapSection();
  renderDetailCards(siteGrid, siteItems);
  renderStageGrid();
  renderSafetySection();
  renderDetailCards(qualityGrid, qualityItems);
  renderWall(standardsWall, standardItems, "المراجع الفنية والهندسية");
  renderDocGrid();
}

render();
attachEvents();
initScrollButtons();
initCounters();
initReveals();
