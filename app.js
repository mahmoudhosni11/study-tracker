const TOTAL_DAYS = 46;
let planData = [];
let userStats = { xp: 0, correct: 0, wrong: 0 };
let startDate = null;
let progressChartInstance = null;
const syncKey = 'mahmoud_v10_pro'; 
const CLOUD_URL = `https://kvdb.io/A9B8C7D6E5F4G3H2I1J0K9/`;

// ===== CURRENT USER SESSION =====
let currentUser = null; // { id, name, isOwner }
const OWNER_ID = 'mahmoud_owner';

// ===== i18n TRANSLATION SYSTEM =====
let currentLang = localStorage.getItem('studyTracker_lang') || 'ar';

const TRANSLATIONS = {
    ar: {
        darkMode: 'الوضع الداكن', lightMode: 'الوضع الفاتح',
        dashboard: 'لوحة التحكم', tasks: 'المهام', focusTimer: 'مؤقت التركيز',
        archive: 'سجل الإنجازات', sync: 'مزامنة يدوية', guide: 'دليل الاستخدام',
        xpPoints: 'نقاط XP', correctAnswers: 'إجابات صحيحة', completedTasks: 'المهام المكتملة',
        experiencePoints: 'نقاط الخبرة', totalProgress: 'الإنجاز الكلي', daysRemaining: 'الأيام المتبقية',
        overallCompletion: 'نسبة الإنجاز الكلية',
        aiAnalysis: '🧠 تحليل ذكي لأدائك', aiDefault: 'نجمع المعطيات... قم بحل بضع مهام لنقوم بتحليل مستواك.',
        detailedProgress: 'التقدم التفصيلي',
        overdueTasks: '⚠️ مهام متراكمة', todayTasks: 'مهام اليوم',
        tomorrowTasks: 'مهام الغد — XP مضاعف', show: 'إظهار', hide: 'إخفاء',
        allDone: '🎉 أنجزت مهام اليوم! استمر.', currentSummary: '📝 ملخص المستوى الحالي',
        focusTimerTitle: '⏱️ مؤقت التركيز', pomodoroDesc: 'استخدم تقنية بومودورو للتركيز العميق أثناء الدراسة',
        start: 'ابدأ', stop: 'إيقاف', reset: 'إعادة', todaySessions: 'جلسات اليوم',
        fullReset: 'إعادة التهيئة الشاملة', logout: 'خروج',
        archiveTitle: '📜 سجل الإنجازات', downloadPDF: '📥 تحميل PDF',
        addCustomTask: '➕ إضافة مهمة مخصصة', add: 'إضافة', addTask: '➕ إضافة المهمة',
        taskNamePlaceholder: 'مثال: مراجعة الفصل الثالث...',
        taskName: 'اسم المهمة', taskDescription: 'وصف المهمة / ملاحظات',
        taskResource: 'رابط المصدر (اختياري)', taskCategory: 'التصنيف',
        descPlaceholder: 'تفاصيل إضافية...',
        details: 'التفاصيل', editDetails: '✉️ تعديل', description: 'الوصف',
        resource: 'المصدر', userNotes: 'ملاحظاتي', save: 'حفظ', cancel: 'إلغاء',
        noDetails: 'لا توجد تفاصيل. اضغط تعديل لإضافة معلومات.',
        loginTitle: 'تسجيل الدخول', registerTitle: 'إنشاء حساب جديد',
        loginSubtitle: 'سجل دخولك لمتابعة إنجازاتك', registerSubtitle: 'انضم للمنصة وابدأ رحلتك',
        nameLabel: 'الاسم', passwordLabel: 'كلمة المرور',
        loginBtn: 'دخول', registerBtn: 'إنشاء حساب',
        switchToRegister: 'ليس لديك حساب؟', switchToLogin: 'لديك حساب بالفعل؟',
        createAccount: 'أنشئ حساب', loginHere: 'سجل دخول',
        continueAsOwner: 'متابعة كمحمود حسني (المالك)',
        errorEmptyFields: 'يرجى ملء جميع الحقول', errorUserExists: 'هذا الاسم مسجل بالفعل',
        errorWrongPassword: 'كلمة المرور غير صحيحة', errorUserNotFound: 'المستخدم غير موجود',
        welcomeBack: 'مرحباً بعودتك', day: 'اليوم', streakDays: 'يوم متواصل'
    },
    en: {
        darkMode: 'Dark Mode', lightMode: 'Light Mode',
        dashboard: 'Dashboard', tasks: 'Tasks', focusTimer: 'Focus Timer',
        archive: 'Achievements', sync: 'Manual Sync', guide: 'User Guide',
        xpPoints: 'XP Points', correctAnswers: 'Correct Answers', completedTasks: 'Completed Tasks',
        experiencePoints: 'Experience Points', totalProgress: 'Total Progress', daysRemaining: 'Days Remaining',
        overallCompletion: 'Overall Completion',
        aiAnalysis: '🧠 Smart Performance Analysis', aiDefault: 'Collecting data... Complete some tasks for analysis.',
        detailedProgress: 'Detailed Progress',
        overdueTasks: '⚠️ Overdue Tasks', todayTasks: "Today's Tasks",
        tomorrowTasks: "Tomorrow's Tasks — Double XP", show: 'Show', hide: 'Hide',
        allDone: '🎉 All done for today! Keep it up.', currentSummary: '📝 Current Level Summary',
        focusTimerTitle: '⏱️ Focus Timer', pomodoroDesc: 'Use Pomodoro technique for deep focus while studying',
        start: 'Start', stop: 'Stop', reset: 'Reset', todaySessions: "Today's Sessions",
        fullReset: 'Full System Reset', logout: 'Logout',
        archiveTitle: '📜 Achievement Log', downloadPDF: '📥 Download PDF',
        addCustomTask: '➕ Add Custom Task', add: 'Add', addTask: '➕ Add Task',
        taskNamePlaceholder: 'e.g. Review chapter 3...',
        taskName: 'Task Name', taskDescription: 'Description / Notes',
        taskResource: 'Resource URL (optional)', taskCategory: 'Category',
        descPlaceholder: 'Additional details...',
        details: 'Details', editDetails: '✉️ Edit', description: 'Description',
        resource: 'Resource', userNotes: 'My Notes', save: 'Save', cancel: 'Cancel',
        noDetails: 'No details yet. Click edit to add info.',
        loginTitle: 'Sign In', registerTitle: 'Create Account',
        loginSubtitle: 'Sign in to track your progress', registerSubtitle: 'Join the platform and start your journey',
        nameLabel: 'Name', passwordLabel: 'Password',
        loginBtn: 'Sign In', registerBtn: 'Create Account',
        switchToRegister: "Don't have an account?", switchToLogin: 'Already have an account?',
        createAccount: 'Create one', loginHere: 'Sign in',
        continueAsOwner: 'Continue as Mahmoud Hosni (Owner)',
        errorEmptyFields: 'Please fill all fields', errorUserExists: 'Username already exists',
        errorWrongPassword: 'Incorrect password', errorUserNotFound: 'User not found',
        welcomeBack: 'Welcome back', day: 'Day', streakDays: 'day streak'
    }
};

function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['ar'][key] || key;
}

function applyLanguage() {
    const isAr = currentLang === 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.getElementById('lang-label').textContent = isAr ? 'English' : 'العربية';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[currentLang]?.[key]) {
            el.textContent = TRANSLATIONS[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[currentLang]?.[key]) {
            el.placeholder = TRANSLATIONS[currentLang][key];
        }
    });

    // Update theme button text
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const themeSpan = document.querySelector('#theme-toggle [data-i18n]');
    if (themeSpan) themeSpan.textContent = t(isDark ? 'lightMode' : 'darkMode');
}

window.toggleLanguage = function() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('studyTracker_lang', currentLang);
    applyLanguage();
};

const MOTIVATIONAL_PHRASES = [
    "أنا أتعلم اليوم لأكون خبيراً غداً 🚀",
    "لن أتوقف حتى أفتخر بنفسي وبإنجازي 🏆",
    "كل فيديو أشاهده يقربني خطوة للهدف 🔥",
    "أنا قادر على إنهاء هذا المسار وتغيير حياتي 💻",
    "انضباطي هو سر نجاحي وتفوقي ⏳",
    "اليوم سأكون أفضل نسخة من نفسي ✨",
    "سأنهي هذا المسار قبل شهر يونيو بكل قوة 💪"
];

const MB_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLdUaS_5kt47mywMelxDv4WoPQxJ8uyKqh";

const JS_SUMMARIES = {
    "0-1": "أساسيات التعامل مع البيانات: قمت بتعلم الدوال parseInt و parseFloat والتعامل مع الكائنات الحسابية في Math. كما بدأت في فهم المقارنات المنطقية. **تحدي المحترفين:** كيف تجعل الرقم 100.555 يظهر كـ 100 فقط بـ 4 طرق مختلفة؟",
    "2-3": "التحكم في مسار الكود: تعلمت كيفية استخدام if...else و switch لاتخاذ القرارات البرمجية، وفهمت الفرق بين المقارنة العادية والعنيفة (Strict Equality). **تحدي المحترفين:** متى نستخدم switch بدلاً من if في المشاريع الكبيرة ولماذا؟",
    "4-5": "المصفوفات والعمليات عليها: تعلمت كيفية إضافة وحذف العناصر باستخدام push, pop, shift, unshift وكيفية قطع المصفوفات. **تحدي المحترفين:** ما الفرق الجوهري بين slice و splice في التأثير على المصفوفة الأصلية؟",
    "6-7": "الحلقات التكرارية الأساسية: فهمت كيف نكرر العمليات باستخدام For Loop وكيفية التعامل مع المصفوفات بداخلها. **تحدي المحترفين:** كيف تقوم بعمل حلقة تكرارية عكسية تبدأ من آخر عنصر إلى الأول؟"
};

const JS_BANK = [
    // Basics (1-9)
    { range: [1, 9], q: "كيف تخرج رسالة تحذير للمستخدم في نافذة منبثقة؟", a: "alert", tip: "دالة alert هي أقدم طريقة." },
    { range: [1, 9], q: "طريقة طباعة رسالة في الـ Console لا يراها المستخدم؟", a: "console.log", tip: "تستخدم للتصحيح." },
    { range: [1, 9], q: "الوسم الذي نكتب بداخلة كود الجافا سكريبت؟", a: "script", tip: "<script>." },
    { range: [1, 9], q: "كيف تكتب تعليقاً من سطر واحد؟", a: "//", tip: "Inline Comment." },
    { range: [1, 9], q: "ما هي الخاصية التي تعرض نوع البيانات لمتغير ما؟", a: "typeof", tip: "typeof operator." },
    
    // Numbers & Strings (10-30)
    { range: [10, 30], q: "كلمة تعريف متغير 'لا يمكن' تغيير قيمته؟", a: "const", tip: "Constant." },
    { range: [10, 30], q: "نوع البيانات للقيمة (100) بدون علامات تنصيص؟", a: "number", tip: "Numeric." },
    { range: [10, 30], q: "اسم الطريقة للكتابة المتغيرات داخل الـ Backticks؟", a: "template literals", tip: "`${}`." },
    { range: [10, 30], q: "الكلمة الجديدة في ES6 لتعريف المتغيرات مع Block Scope؟", a: "let", tip: "Let vs Var." },
    { range: [10, 30], q: "نتيجة العملية: 10 + '20'؟", a: "1020", tip: "String Concatenation." },
    { range: [10, 30], q: "ما ناتج '10' - 5؟", a: "5", tip: "JavaScript Coercion (Implicit Convert)." },
    { range: [10, 30], q: "ما ناتج '10' * '5'؟", a: "50", tip: "Math operators convert strings to numbers." },
    { range: [10, 30], q: "ما هي القيمة الناتجة عن قسمة رقم على صفر؟", a: "infinity", tip: "Positive Infinity." },
    
    // Math & Precision (27-30)
    { range: [27, 30], q: "دالة تحول النص '100' إلى رقم صحيح؟", a: "parseInt", tip: "parseInt." },
    { range: [27, 30], q: "دالة في Math تقرب الرقم 'للأعلى' دائماً؟", a: "Math.ceil", tip: "Ceiling." },
    { range: [27, 30], q: "دالة في Math تقرب الرقم 'للأسفل' دائماً؟", a: "Math.floor", tip: "Floor." },
    { range: [27, 30], q: "دالة في Math تعيد القيمة المطلقة (بدون إشارة)؟", a: "Math.abs", tip: "Absolute." },
    { range: [27, 30], q: "دالة في Math تعيد القيمة الأصغر من مجموعة أرقام؟", a: "Math.min", tip: "Minimum." },
    { range: [27, 30], q: "ما نوع البيانات الناتج عن استخدام دالة toFixed؟", a: "string", tip: "انتبه! تعيد نصاً وليس رقماً." },

    // Comparison & Logic (31-39)
    { range: [31, 39], q: "المعامل للتحقق من القيمة والنوع معاً؟", a: "===", tip: "Strict Equality." },
    { range: [31, 39], q: "المعامل المنطقي 'أو' (OR)؟", a: "||", tip: "Logical OR." },
    { range: [31, 39], q: "المعامل المنطقي 'و' (AND)؟", a: "&&", tip: "Logical AND." },
    { range: [31, 39], q: "المعامل المنطقي 'ليس' (NOT)؟", a: "!", tip: "Logical NOT." },
    { range: [31, 39], q: "ما ناتج العملية: (true || false && false)؟", a: "true", tip: "الأولوية لـ && قبل ||." },
    
    // Arrays (40-60)
    { range: [40, 60], q: "دالة تضيف عنصراً 'في نهاية' المصفوفة؟", a: "push", tip: "Push." },
    { range: [40, 60], q: "دالة تحذف عنصراً 'من نهاية' المصفوفة؟", a: "pop", tip: "Pop." },
    { range: [40, 60], q: "دالة تضيف عنصراً 'في بداية' المصفوفة؟", a: "unshift", tip: "Unshift." },
    { range: [40, 60], q: "دالة تحذف عنصراً 'من بداية' المصفوفة؟", a: "shift", tip: "Shift." },
    { range: [40, 60], q: "دالة تبحث عن مكان عنصر في المصفوفة؟", a: "indexOf", tip: "Index Finder." },
    { range: [40, 60], q: "دالة تقطع جزءاً من المصفوفة وترجعه في مصفوفة 'جديدة'؟", a: "slice", tip: "Slice doesn't change original." },
    { range: [40, 60], q: "دالة 'تحذف' أو 'تستبدل' عناصر من المصفوفة 'الأصلية'؟", a: "splice", tip: "Splice modifies the original." },
    { range: [40, 60], q: "كيف نعرف طول المصفوفة (عدد عناصرها)؟", a: "length", tip: ".length." },
    
    // Loops (60-100)
    { range: [60, 100], q: "الكلمة المستخدمة للخروج الفوري من الحلقة التكرارية؟", a: "break", tip: "Break out." },
    { range: [60, 100], q: "الكلمة المستخدمة لتخطي الدورة الحالية والانتقال للتالية? ", a: "continue", tip: "Skip iteration." },
    { range: [60, 100], q: "الكلمة لإرجاع قيمة من داخل الدالة؟", a: "return", tip: "Return value." },
    { range: [102, 188], q: "اختيار عنصر باستخدام الـ ID؟", a: "getElementById", tip: "ID Selector." },
    { range: [102, 188], q: "ما هي الكلمة المحجوزة للوصول للكائن الحالي داخل الدالة؟", a: "this", tip: "Context." }
];

const MB_BANK = [
    // Principles (4-10)
    { range: [4, 10], q: "ما هو الـ Inbound Marketing؟", a: "التسويق الداخلي", tip: "جذب العملاء بالمحتوى." },
    { range: [4, 10], q: "ما المقصود بـ Buyer Persona؟", a: "شخصية المشتري", tip: "تحديد الملف الشخصي للعميل." },
    { range: [4, 10], q: "ما هو الـ USP؟", a: "الميزة التنافسية", tip: "Unique Selling Proposition." },
    { range: [4, 10], q: "ماذا تعني الأهداف SMART؟", a: "أهداف ذكية", tip: "محددة، قابلة للقياس، الخ." },
    { range: [4, 10], q: "ما هو الـ Copywriting؟", a: "كتابة النصوص", tip: "كتابة إعلانية مقنعة." },

    // Setup & Strategy (11-20)
    { range: [11, 20], q: "ما أول خطوة قبل كتابة المحتوى؟", a: "التخطيط", tip: "التخطيط والبحث." },
    { range: [11, 20], q: "ما هو الـ Marketing Loop؟", a: "حلقة التسويق", tip: "رحلة العميل من الوعي للشراء." },
    { range: [11, 20], q: "أين نضبط إعدادات الصفحة الاحترافية؟", a: "إعدادات الصفحة", tip: "Settings." },
    { range: [11, 20], q: "ما أهمية الـ Business Manager؟", a: "إدارة الأصول", tip: "تحكم مركزي في الحسابات." },
    { range: [11, 20], q: "ما الفرق بين Awareness و Traffic؟", a: "الوعي مقابل الزيارات", tip: "هدف الحملة." },

    // Campaigns (21-35)
    { range: [21, 35], q: "ما هو الـ CBO؟", a: "تحسين الميزانية", tip: "Campaign Budget Optimization." },
    { range: [21, 35], q: "ما هو الـ Detailed Targeting؟", a: "الاستهداف التفصيلي", tip: "الاهتمامات والخصائص." },
    { range: [21, 35], q: "ما هي إعلانات الـ Leads؟", a: "تجميع البيانات", tip: "Lead Generation." },
    { range: [21, 35], q: "ما هو الـ Retargeting؟", a: "إعادة الاستهداف", tip: "استهداف من تفاعل سابقاً." },
    { range: [21, 35], q: "كيف تزيد جودة الإعلان؟", a: "المحتوى والتفاعل", tip: "Quality Ranking." },

    // Advanced & Tracking (36-47)
    { range: [36, 47], q: "ما هو الـ Custom Audience؟", a: "جمهور مخصص", tip: "مثلاً زوار الموقع." },
    { range: [36, 47], q: "ما هو الـ Lookalike Audience؟", a: "جمهور مشابه", tip: "LAL." },
    { range: [36, 47], q: "ما وظيفة الـ Meta Pixel؟", a: "تتبع الحركات", tip: "الكود المثبت في الموقع." },
    { range: [36, 47], q: "ما معنى Conversion؟", a: "التحويل", tip: "إتمام العملية المطلوبة." },
    { range: [36, 47], q: "ما هو الـ Event في التتبع؟", a: "حدث", tip: "مثل الشراء أو الإضافة للسلة." }
];

function getTaskQuiz(category, videoNum = 1) {
    if (category === 'js') {
        let relevant = JS_BANK.filter(q => videoNum >= q.range[0] && videoNum <= q.range[1]);
        if (relevant.length < 3) {
            let others = JS_BANK.filter(q => !(videoNum >= q.range[0] && videoNum <= q.range[1]));
            relevant = relevant.concat(others.sort(() => 0.5 - Math.random()).slice(0, 3 - relevant.length));
        }
        return relevant.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    if (category === 'media') {
        let relevant = MB_BANK.filter(q => videoNum >= q.range[0] && videoNum <= q.range[1]);
        if (relevant.length < 3) {
            let others = MB_BANK.filter(q => !(videoNum >= q.range[0] && videoNum <= q.range[1]));
            relevant = relevant.concat(others.sort(() => 0.5 - Math.random()).slice(0, 3 - relevant.length));
        }
        return relevant.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    return [
        { q: "ما هي أول خطوة قبل البدء في أي عمل احترافي؟", a: "التخطيط", tip: "التخطيط يوفر 50% من الجهد." },
        { q: "ما هو سر الاستمرار في التعلم؟", a: "الانضباط", tip: "الانضباط أهم من الشغف." },
        { q: "ماذا نفعل عند مواجهة مشكلة تقنية؟", a: "البحث", tip: "البحث مهارة أساسية." }
    ];
}

function generateInitialData() {
    let tasks = [];
    let jsCounter = 27; 
    let mbCounter = 4; // تبدأ من الفيديو الرابع بناءً على طلب المستخدم
    let canvaCounter = 1;
    let capcutCounter = 1;

    for (let day = 0; day <= TOTAL_DAYS; day++) {
        // JS Tasks (4 per day)
        for (let j = 0; j < 4; j++) {
            if (jsCounter <= 188) {
                tasks.push({ id: `js_${jsCounter}`, category: 'js', dayAssigned: day, completed: false, text: `JS: فيديو ${jsCounter} (Elzero)`, videoNum: jsCounter });
                jsCounter++;
            }
        }

        // Media Buying (1 per day)
        if (mbCounter <= 47) {
            tasks.push({ id: `mb_${mbCounter}`, category: 'media', dayAssigned: day, completed: false, text: `ميديا باينج: محاضرة ${mbCounter} (YouTube)`, videoNum: mbCounter });
            mbCounter++;
        }

        // Canva (1 per 5 days)
        if (day % 5 === 0 && canvaCounter <= 7) {
            tasks.push({ id: `canva_${canvaCounter}`, category: 'canva', dayAssigned: day, completed: false, text: `Canva: تطبيق ${canvaCounter}` });
            canvaCounter++;
        }

        // CapCut (5 days intensives)
        if (day <= 4 && capcutCounter <= 5) {
            tasks.push({ id: `capcut_${capcutCounter}`, category: 'capcut', dayAssigned: day, completed: false, text: `CapCut: يوم ${capcutCounter}` });
            capcutCounter++;
        }
    }
    return tasks;
}

function initApp() {
    // Apply saved theme
    const savedTheme = localStorage.getItem('studyTracker_theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').textContent = '☀️';
    }
    applyLanguage();

    // Check user session
    const savedUser = localStorage.getItem('studyTracker_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        startUserSession();
    } else {
        showAuthScreen();
    }
}

function startUserSession() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-wrapper').style.display = 'flex';
    document.getElementById('top-toolbar').style.display = 'flex';
    document.getElementById('logout-btn').style.display = 'inline-flex';

    // Update sidebar with user info
    const nameEl = document.getElementById('sidebar-name');
    const avatarEl = document.getElementById('sidebar-avatar');
    if (currentUser.isOwner) {
        nameEl.textContent = 'محمود حسني';
        avatarEl.src = 'profile.jpg.jpeg';
    } else {
        nameEl.textContent = currentUser.name;
        // Create avatar placeholder for guest users
        const initials = currentUser.name.charAt(0).toUpperCase();
        avatarEl.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'user-avatar-placeholder';
        placeholder.textContent = initials;
        placeholder.id = 'avatar-placeholder';
        const existing = document.getElementById('avatar-placeholder');
        if (existing) existing.remove();
        avatarEl.parentNode.insertBefore(placeholder, avatarEl);
    }

    // Load user-specific data
    const userKey = `studyTracker_${currentUser.id}`;
    let saved = localStorage.getItem(userKey + '_data');
    if (!saved) {
        if (currentUser.isOwner) {
            // Migration: try loading old data
            const oldData = localStorage.getItem('studyTracker_data_v3');
            if (oldData) {
                planData = JSON.parse(oldData);
                startDate = localStorage.getItem('studyTracker_startDate_v3');
                userStats = JSON.parse(localStorage.getItem('studyTracker_stats_v3')) || { xp: 0, correct: 0, wrong: 0 };
            } else {
                planData = generateInitialData();
                startDate = new Date().toISOString();
                userStats = { xp: 0, correct: 0, wrong: 0 };
            }
        } else {
            planData = [];
            startDate = new Date().toISOString();
            userStats = { xp: 0, correct: 0, wrong: 0 };
        }
        saveData();
    } else {
        planData = JSON.parse(saved);
        startDate = localStorage.getItem(userKey + '_startDate');
        userStats = JSON.parse(localStorage.getItem(userKey + '_stats')) || { xp: 0, correct: 0, wrong: 0 };
    }

    updateMotivationalTitle();
    updateCurrentDate();
    initSidebarToggle();
    updateStreak();
    renderApp();
}

function updateMotivationalTitle() {
    const titleEl = document.getElementById('main-title');
    if (titleEl) {
        const randomQuote = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
        titleEl.textContent = randomQuote;
    }
}

window.openArchive = function() {
    showArchive();
    const modal = document.getElementById('archive-modal');
    if (modal) modal.style.display = 'flex';
};

window.closeArchive = function() {
    const modal = document.getElementById('archive-modal');
    if (modal) modal.style.display = 'none';
};

window.onclick = function(event) {
    const modal = document.getElementById('archive-modal');
    if (event.target === modal) modal.style.display = 'none';
};

function renderApp() {
    let daysPassed = getDaysPassed();
    updateStatsHeader();
    let totalCompleted = planData.filter(t => t.completed).length;
    let percent = Math.round((totalCompleted / planData.length) * 100);
    document.getElementById('overall-percent').textContent = percent + '%';
    document.getElementById('overall-fill').style.width = percent + '%';
    const percentMetric = document.getElementById('overall-percent-metric');
    if (percentMetric) percentMetric.textContent = percent + '%';

    // Days remaining
    const daysRemaining = document.getElementById('days-remaining');
    if (daysRemaining) daysRemaining.textContent = Math.max(0, TOTAL_DAYS - daysPassed);

    const overdueList = document.getElementById('overdue-list');
    const todayList = document.getElementById('today-list');
    const tomorrowList = document.getElementById('tomorrow-list');

    overdueList.innerHTML = ''; todayList.innerHTML = ''; tomorrowList.innerHTML = '';

    let overdueCount = 0;
    planData.forEach(task => {
        if (!task.completed) {
            const html = buildTaskHTML(task);
            if (task.dayAssigned < daysPassed) { overdueList.appendChild(html); overdueCount++; }
            else if (task.dayAssigned === daysPassed) todayList.appendChild(html);
            else if (task.dayAssigned === daysPassed + 1) tomorrowList.appendChild(html);
        }
    });

    // Show/hide overdue
    const overdueContainer = document.getElementById('overdue-container');
    if (overdueContainer) overdueContainer.style.display = overdueCount > 0 ? 'block' : 'none';

    // Show completed message if today tasks are done
    const todayTasks = planData.filter(t => t.dayAssigned === daysPassed);
    const todayDone = todayTasks.every(t => t.completed);
    const completedContainer = document.getElementById('completed-container');
    if (completedContainer) completedContainer.style.display = todayDone && todayTasks.length > 0 ? 'block' : 'none';

    // Update sidebar completed count
    const completedSide = document.getElementById('completed-count-side');
    if (completedSide) completedSide.textContent = totalCompleted;

    renderTrackStats();
    drawChart();
    renderSummaries();
    updateAIAdvice();
}

function renderTrackStats() {
    const container = document.getElementById('track-stats');
    if (!container) return;

    const tracks = [
        { id: 'js', name: 'JavaScript', icon: '💻' },
        { id: 'media', name: 'Media Buying', icon: '📈' },
        { id: 'canva', name: 'Canva', icon: '🎨' },
        { id: 'capcut', name: 'CapCut', icon: '🎬' }
    ];

    container.innerHTML = '';
    tracks.forEach(track => {
        const trackTasks = planData.filter(t => t.category === track.id);
        const completed = trackTasks.filter(t => t.completed).length;
        const total = trackTasks.length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        let linkHtml = '';
        if (track.id === 'media') {
            linkHtml = `<a href="${MB_PLAYLIST_URL}" target="_blank" class="track-link" style="font-size: 0.7rem; color: var(--accent); text-decoration: none; display: block; margin-top: 5px;">🔗 رابط قائمة التشغيل</a>`;
        } else if (track.id === 'js') {
            linkHtml = `<a href="https://www.youtube.com/playlist?list=PLDoPjvoNmBAx87uJ96W19LL1e23356241" target="_blank" class="track-link" style="font-size: 0.7rem; color: var(--accent); text-decoration: none; display: block; margin-top: 5px;">🔗 رابط قائمة Elzero</a>`;
        }

        const card = document.createElement('div');
        card.className = `track-card ${track.id}`;
        card.innerHTML = `
            <div class="track-header">
                <span>${track.icon} ${track.name}</span>
                <span class="track-count">${completed} / ${total}</span>
            </div>
            <div class="track-bar-bg">
                <div class="track-bar-fill" style="width: ${percent}%"></div>
            </div>
            <div class="track-percent">${percent}%</div>
            ${linkHtml}
        `;
        container.appendChild(card);
    });
}

function buildTaskHTML(task) {
    let li = document.createElement('li');
    li.className = `task-item ${task.category}-task`;
    
    const hasDetails = task.description || task.resourceUrl || task.userNotes;
    const resourceBadge = task.resourceUrl ? `<a href="${task.resourceUrl}" target="_blank" class="resource-badge">🔗 ${t('resource')}</a>` : '';
    
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" onchange="toggleTask('${task.id}')">
        <div class="task-content">
            <label for="${task.id}">${task.text}</label>
            <div class="task-meta">
                <span>📅 ${t('day')} ${task.dayAssigned}</span>
                ${resourceBadge}
            </div>
        </div>
        <button class="task-expand-btn" onclick="event.preventDefault(); toggleTaskDetails('${task.id}')">${hasDetails ? '📋' : '➕'} ${t('details')}</button>
        <div class="task-details-panel" id="details-${task.id}">
            ${hasDetails ? `
                ${task.description ? `<div class="task-detail-row"><span class="task-detail-icon">📝</span><span class="task-detail-label">${t('description')}</span><span class="task-detail-value">${task.description}</span></div>` : ''}
                ${task.resourceUrl ? `<div class="task-detail-row"><span class="task-detail-icon">🔗</span><span class="task-detail-label">${t('resource')}</span><span class="task-detail-value"><a href="${task.resourceUrl}" target="_blank">${task.resourceUrl}</a></span></div>` : ''}
                ${task.userNotes ? `<div class="task-detail-row"><span class="task-detail-icon">📌</span><span class="task-detail-label">${t('userNotes')}</span><span class="task-detail-value">${task.userNotes}</span></div>` : ''}
            ` : `<p style="color:var(--text-light); font-size:0.8rem;">${t('noDetails')}</p>`}
            <div class="task-actions">
                <button class="task-action-btn" onclick="editTaskDetails('${task.id}')">${t('editDetails')}</button>
            </div>
        </div>
    `;
    return li;
}

window.toggleTaskDetails = function(taskId) {
    const panel = document.getElementById('details-' + taskId);
    if (panel) panel.classList.toggle('open');
};

window.editTaskDetails = function(taskId) {
    const task = planData.find(t => t.id === taskId);
    if (!task) return;
    
    const modal = document.createElement('div');
    modal.className = 'detail-modal';
    modal.innerHTML = `
        <div class="detail-modal-content" style="direction: ${currentLang === 'ar' ? 'rtl' : 'ltr'};">
            <h3>✉️ ${task.text}</h3>
            <div class="plan-input-group">
                <label>${t('description')}</label>
                <textarea id="edit-desc" rows="3">${task.description || ''}</textarea>
            </div>
            <div class="plan-input-group">
                <label>${t('resource')}</label>
                <input type="url" id="edit-url" class="auth-input" style="direction:ltr; text-align:left; margin-bottom:0;" value="${task.resourceUrl || ''}" placeholder="https://...">
            </div>
            <div class="plan-input-group">
                <label>${t('userNotes')}</label>
                <textarea id="edit-notes" rows="2">${task.userNotes || ''}</textarea>
            </div>
            <div class="detail-modal-btns">
                <button class="save-btn" id="detail-save">${t('save')}</button>
                <button class="cancel-btn" id="detail-cancel">${t('cancel')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('detail-save').onclick = () => {
        task.description = document.getElementById('edit-desc').value.trim();
        task.resourceUrl = document.getElementById('edit-url').value.trim();
        task.userNotes = document.getElementById('edit-notes').value.trim();
        document.body.removeChild(modal);
        saveData();
        renderApp();
        showToast(currentLang === 'ar' ? '✅ تم حفظ التفاصيل' : '✅ Details saved');
    };
    document.getElementById('detail-cancel').onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };
};

function getDaysPassed() {
    let start = new Date(startDate);
    let today = new Date();
    return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

window.toggleTask = function(taskId) {
    let task = planData.find(t => t.id === taskId);
    let cb = document.getElementById(taskId);
    if (!task.completed) {
        let questions = getTaskQuiz(task.category, task.videoNum);
        showQuiz(questions, (success, skipped) => {
            if (success) {
                task.completed = true;
                if (!skipped) {
                    task.quizData = questions.map(q => ({ q: q.q, a: q.a }));
                    userStats.xp += 150;
                    userStats.correct += questions.length;
                    showToast("✨ رائع! تم الإلمام الكامل (+150 XP)");
                } else {
                    userStats.xp += 0;
                    showToast("⚠️ تم التخطي بنجاح (لم يتم إضافة نقاط)");
                }
                task.notes = skipped ? "تم تخطي الاختبار" : `أنهيت اختبار الإلمام بـ ${questions.length} أسئلة`;
                task.completionDate = new Date().toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
                saveData(); renderApp();
            } else { cb.checked = false; }
        });
    }
};

window.showTomorrow = function() {
    const tomorrowList = document.getElementById('tomorrow-list');
    const button = document.querySelector('.upcoming-card .small-btn');
    
    if (tomorrowList.style.display === 'none') {
        tomorrowList.style.display = 'block';
        button.textContent = 'إخفاء';
        button.style.background = 'var(--accent)';
        button.style.color = 'white';
    } else {
        tomorrowList.style.display = 'none';
        button.textContent = 'إظهار';
        button.style.background = 'transparent';
        button.style.color = 'var(--accent)';
    }
};

function showQuiz(questions, callback) {
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    document.body.appendChild(modal);
    let idx = 0;
    const render = () => {
        const q = questions[idx];
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <h3 style="margin:0;">🎯 سؤال ${idx + 1} من ${questions.length}</h3>
                    <span style="background:var(--accent); color:white; padding:2px 8px; border-radius:10px; font-size:12px;">تلميح متاح</span>
                </div>
                <p style="margin-bottom:10px;">${q.q}</p>
                <div style="background:rgba(245,158,11,0.1); padding:10px; border-radius:8px; border-right:3px solid #f59e0b; margin-bottom:15px; font-size:0.9rem; color:#f59e0b;">
                    💡 <b>تسهيل الحل:</b> ${q.tip}
                </div>
                <input type="text" id="q-ans" placeholder="اكتب الإجابة هنا..." autocomplete="off">
                <div class="quiz-btns" style="display:flex; flex-direction:column; gap:8px; margin-top:15px;">
                    <button id="q-sub" style="background:var(--success)">تحقق وإضافة نقاط ✨</button>
                    <div style="display:flex; gap:8px;">
                        <button id="q-reveal" style="flex:1; background:#0ea5e9; font-size:0.8rem;">✅ كشف الإجابة</button>
                        <button id="q-skip" style="flex:1; background:#64748b; font-size:0.8rem;">تخطي (0 XP)</button>
                        <button id="q-can" style="flex:1; background:#444; font-size:0.8rem;">تراجع</button>
                    </div>
                </div>
            </div>
        `;
        const input = document.getElementById('q-ans');
        input.focus();

        document.getElementById('q-reveal').onclick = () => {
            if(confirm("هل تريد كشف الإجابة الصحيحة للتعلم منها؟ (يمكنك نسخها وكتابتها للمتابعة)")) {
                alert(`الإجابة الصحيحة هي: [ ${q.a} ]`);
                input.value = q.a;
                input.focus();
            }
        };

        document.getElementById('q-skip').onclick = () => {
            if(confirm("هل أنت متأكد من تخطي هذا الدرس؟ (لن تحصل على أي XP ولن يتم تسجيل إجابة صحيحة)")) {
                document.body.removeChild(modal);
                callback(true, true); // (success=true, skipped=true)
            }
        };

        document.getElementById('q-sub').onclick = () => {
            if (input.value.trim().toLowerCase() === q.a.toLowerCase()) {
                idx++;
                if (idx < questions.length) render();
                else { document.body.removeChild(modal); callback(true); }
            } else { input.style.borderColor = 'red'; }
        };
        document.getElementById('q-can').onclick = () => { document.body.removeChild(modal); callback(false); };
    };
    render();
}

function showArchive() {
    const container = document.getElementById('archive-content');
    const completedTasks = planData.filter(t => t.completed).sort((a, b) => b.dayAssigned - a.dayAssigned);
    
    if (completedTasks.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--text-muted);">لا يوجد سجل مهام مكتملة حتى الآن.</p>';
        return;
    }

    container.innerHTML = completedTasks.map(task => `
        <div class="archive-item">
            <div class="archive-header">
                <span style="font-weight:bold; color:var(--accent);">${task.text}</span>
                <span style="font-size:0.8rem; color:var(--text-muted);">📅 اليوم ${task.dayAssigned}</span>
            </div>
            <div style="font-size:0.85rem; color: #10b981; margin-bottom: 5px;">✅ ${task.notes || 'تم الإكمال بنجاح'}</div>
            ${task.quizData ? `
                <div class="archive-q-box">
                    <p style="font-weight:bold; font-size:0.8rem; margin-bottom:5px;">📋 الأسئلة التي أجبت عليها:</p>
                    ${task.quizData.map(q => `
                        <div class="archive-q-item">
                            <div class="archive-q-text">س: ${q.q}</div>
                            <div class="archive-a-text">ج: ${q.a}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function renderSummaries() {
    const daysPassed = getDaysPassed();
    const summaryContainer = document.getElementById('summary-section');
    const summaryText = document.getElementById('summary-text');
    
    if (!summaryContainer || !summaryText) return;

    // العثور على الملخص المناسب بناءً على المستوى الحالي (كل يومين)
    // المستوى 1: أيام 0-1، المستوى 2: أيام 2-3...
    const level = Math.floor(daysPassed / 2);
    const key = `${level * 2}-${level * 2 + 1}`;
    
    if (JS_SUMMARIES[key]) {
        summaryText.textContent = JS_SUMMARIES[key];
        summaryContainer.style.display = 'block';
    } else {
        summaryContainer.style.display = 'none';
    }
}

function updateStatsHeader() {
    document.getElementById('xp-score').textContent = userStats.xp;
    const xpSide = document.getElementById('xp-score-side');
    if (xpSide) xpSide.textContent = userStats.xp;
    const correctSide = document.getElementById('correct-score-side');
    if (correctSide) correctSide.textContent = userStats.correct;
    const correctMain = document.getElementById('correct-score');
    if (correctMain) correctMain.textContent = userStats.correct;
    let rank = userStats.xp > 3000 ? "أسطورة 👑" : userStats.xp > 1000 ? "محترف 🔥" : "مبتدئ 🐣";
    document.getElementById('user-rank').textContent = rank;
}

function drawChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    if (progressChartInstance) progressChartInstance.destroy();
    progressChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['منجز', 'متبقي'],
            datasets: [{
                data: [planData.filter(t => t.completed).length, planData.filter(t => !t.completed).length],
                backgroundColor: ['#312C85', '#E5E5E0'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    labels: { font: { family: 'Open Sans', size: 13 }, color: '#6B7280' }
                }
            }
        }
    });
}

function saveData() {
    const userKey = currentUser ? `studyTracker_${currentUser.id}` : 'studyTracker_default';
    localStorage.setItem(userKey + '_data', JSON.stringify(planData));
    localStorage.setItem(userKey + '_startDate', startDate);
    localStorage.setItem(userKey + '_stats', JSON.stringify(userStats));
    // Also save to legacy keys for owner (backward compat)
    if (currentUser && currentUser.isOwner) {
        localStorage.setItem('studyTracker_data_v3', JSON.stringify(planData));
        localStorage.setItem('studyTracker_startDate_v3', startDate);
        localStorage.setItem('studyTracker_stats_v3', JSON.stringify(userStats));
        syncToCloud();
    }
}

async function fetchCloudData() {
    try {
        updateSyncStatus('⏳ جاري جلب البيانات...');
        const res = await fetch(CLOUD_URL + syncKey);
        if (res.ok) {
            const data = await res.json();
            if (data && data.progress) {
                planData.forEach(task => {
                    let r = data.progress.find(rt => rt.id === task.id);
                    if (r) {
                        task.completed = r.c;
                        task.notes = r.n;
                        task.completionDate = r.d;
                    }
                });
                userStats = data.userStats || userStats;
                startDate = data.startDate || startDate;
                localStorage.setItem('studyTracker_data_v3', JSON.stringify(planData));
                localStorage.setItem('studyTracker_stats_v3', JSON.stringify(userStats));
                localStorage.setItem('studyTracker_startDate_v3', startDate);
                renderApp();
                updateSyncStatus('✅ تم استعادة البيانات');
            } else {
                updateSyncStatus('✅ السحابة جاهزة');
            }
        } else if (res.status === 404) {
            updateSyncStatus('✅ السحابة جاهزة (تلقائي)');
        } else {
            updateSyncStatus('⚠️ خطأ في الاتصال ' + res.status);
        }
    } catch (e) {
        updateSyncStatus('⚠️ وضع عدم الاتصال');
    }
}

async function syncToCloud() {
    try {
        const payload = { 
            progress: planData.map(t => ({ id: t.id, c: t.completed, n: t.notes, d: t.completionDate })), 
            userStats, 
            startDate,
            lastUpdated: Date.now() 
        };
        const res = await fetch(CLOUD_URL + syncKey, { method: 'POST', body: JSON.stringify(payload) });
        if (res.ok) updateSyncStatus('✅ تمت المزامنة');
        else updateSyncStatus('❌ فشل الحفظ ' + res.status);
    } catch (e) {
        updateSyncStatus('❌ فشل الاتصال');
    }
}

async function clearCloudData() {
    try { await fetch(CLOUD_URL + syncKey, { method: 'DELETE' }); } catch (e) {}
}

function updateSyncStatus(msg) {
    const el = document.getElementById('last-sync-time');
    if (el) el.textContent = msg;
}

window.forceSync = fetchCloudData;

window.downloadPDF = function() {
    const completedTasks = planData.filter(t => t.completed).sort((a, b) => a.dayAssigned - b.dayAssigned);
    const totalXP = userStats.xp;
    const completionPercent = Math.round((planData.filter(t => t.completed).length / planData.length) * 100);
    const daysPassed = getDaysPassed();
    const profileImg = document.querySelector('.profile-pic');
    const profileImgSrc = profileImg ? profileImg.src : '';

    const printSection = document.getElementById('print-section');
    
    // فلترة الملخصات المتاحة
    let availableSummaries = [];
    Object.keys(JS_SUMMARIES).forEach(key => {
        const range = key.split('-');
        if (range.length === 2 && daysPassed >= parseInt(range[0])) {
            availableSummaries.push({ period: `الأيام ${key}`, text: JS_SUMMARIES[key] });
        }
    });

    printSection.innerHTML = `
        <div style="padding: 40px; font-family: 'Cairo', sans-serif; direction: rtl;">
            <div style="display:flex; align-items:center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
                ${profileImgSrc ? `<img src="${profileImgSrc}" style="width:80px; height:80px; border-radius:50%; margin-left:20px; border:1px solid #000;">` : ''}
                <h1 style="margin:0; color:#000; font-size:1.8rem;">سجل الإنجاز الهندسي وتطوير المنظومة 🎓</h1>
                <p style="margin:5px 0; color:#000; font-weight:bold;">بواسطة المطور: محمود حسني</p>
                    <p style="margin:0; color:#666; font-size:0.9rem;">التاريخ: ${new Date().toLocaleDateString('ar-EG')}</p>
                </div>
            </div>

            <div style="border: 2px solid #000; padding: 15px; margin-bottom: 30px; display: flex; justify-content: space-between;">
                <span>نقاط الخبرة (XP): ${totalXP}</span>
                <span>نسبة الإنجاز: ${completionPercent}%</span>
                <span>المهام المنجزة: ${completedTasks.length}</span>
            </div>

            <h2 style="border-bottom: 2px solid #333; margin-bottom: 15px;">📝 الملخصات العلمية المكتسبة</h2>
            ${availableSummaries.map(s => `
                <div style="margin-bottom: 15px; border-right: 4px solid #000; padding-right: 10px;">
                    <strong>${s.period}</strong>: ${s.text}
                </div>
            `).join('')}

            <h2 style="border-bottom: 2px solid #333; margin-top:30px; margin-bottom: 15px;">📜 سجل الدروس والمهام + الإجابات</h2>
            ${completedTasks.map(task => {
                const quiz = task.quizData || getTaskQuiz(task.category, task.videoNum).map(q => ({ q: q.q, a: q.a }));
                return `
                    <div style="margin-bottom:20px; border-bottom:1px solid #ccc; padding-bottom:10px;">
                        <strong>• ${task.text}</strong> (يوم ${task.dayAssigned})
                        <div style="margin-top:8px; margin-right:20px;">
                            ${quiz.map((q, i) => `
                                <div style="font-size:0.9rem;">س${i+1}: ${q.q}</div>
                                <div style="color:green; font-weight:bold; margin-bottom:5px;">ج: ${q.a} ✅</div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}

            <h2 style="border-bottom: 2px solid #333; margin-top:30px; margin-bottom: 15px;">🔥 بنك تحديات المحترفين (مراجعة نموذجية)</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="border:1px solid #000; padding:15px;">
                    <h3 style="margin-top:0; font-size: 1rem; border-bottom: 1px solid #000;">مسار JavaScript</h3>
                    ${JS_BANK.filter(q => q.range[0] >= 10).sort(() => 0.5 - Math.random()).slice(0, 10).map((q, idx) => `
                        <div style="margin-bottom:10px;">
                            <strong>تحدي ${idx+1}: ${q.q}</strong><br>
                            <span style="color:blue;">الجهاز: ${q.a}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="border:1px solid #000; padding:15px;">
                    <h3 style="margin-top:0; font-size: 1rem; border-bottom: 1px solid #000;">مسار Media Buying</h3>
                    ${MB_BANK.sort(() => 0.5 - Math.random()).slice(0, 10).map((q, idx) => `
                        <div style="margin-bottom:10px;">
                            <strong>سؤال ${idx+1}: ${q.q}</strong><br>
                            <span style="color:green;">الإجابة: ${q.a}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="margin-top:60px; text-align:center; padding:20px; border-top: 1px solid #000;">
                <p style="font-size:1.1rem; font-weight:bold;">صاحب المشروع والمطور الرئيسي: محمود حسني © 2026</p>
                <p>تم استخراج هذا التقرير من النظام الخاص بي - جميع الحقوق محفوظة</p>
            </div>
        </div>
    `;

    setTimeout(() => {
        window.print();
    }, 500);
};

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
}

// ===== NEW FEATURES =====

// Current Date Display
function updateCurrentDate() {
    const el = document.getElementById('current-date');
    if (el) {
        el.textContent = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
}

// Sidebar Toggle (mobile)
function initSidebarToggle() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 && !sidebar.contains(e.target) && e.target !== toggle) {
                sidebar.classList.remove('open');
            }
        });
    }
}

// Section Switching
window.switchSection = function(section) {
    ['dashboard', 'tasks', 'focus'].forEach(s => {
        const el = document.getElementById('section-' + s);
        if (el) el.style.display = s === section ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-item[data-section]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    // Close sidebar on mobile
    if (window.innerWidth <= 900) {
        document.getElementById('sidebar')?.classList.remove('open');
    }
};

// Daily Streak
function updateStreak() {
    const streakData = JSON.parse(localStorage.getItem('studyTracker_streak') || '{"count":0,"lastDate":""}');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const completedToday = planData.some(t => t.completed && t.completionDate);
    
    if (completedToday && streakData.lastDate !== today) {
        if (streakData.lastDate === yesterday || streakData.count === 0) {
            streakData.count++;
        } else if (streakData.lastDate !== today) {
            streakData.count = 1;
        }
        streakData.lastDate = today;
        localStorage.setItem('studyTracker_streak', JSON.stringify(streakData));
    }
    
    const badge = document.getElementById('streak-badge');
    if (badge) badge.textContent = `🔥 ${streakData.count} يوم متواصل`;
}

// AI Advice Update
function updateAIAdvice() {
    const el = document.getElementById('ai-advice-text');
    if (!el) return;
    const completed = planData.filter(t => t.completed).length;
    const total = planData.length;
    const percent = Math.round((completed / total) * 100);
    
    if (completed < 5) {
        el.textContent = 'ابدأ بإنهاء بعض المهام لنتمكن من تحليل أدائك وتوجيهك.';
    } else if (percent < 25) {
        el.textContent = `أنت في بداية الطريق (${percent}%). ركز على إنهاء مهام اليوم أولاً ولا تتأخر عن الجدول.`;
    } else if (percent < 50) {
        el.textContent = `تقدم جيد! (${percent}%) استمر بنفس الوتيرة. حاول إنهاء المهام المتراكمة إن وجدت.`;
    } else if (percent < 75) {
        el.textContent = `أداء ممتاز! (${percent}%) أنت في منتصف الطريق. لا تفقد الزخم الآن!`;
    } else {
        el.textContent = `أنت قريب جداً من الهدف! (${percent}%) اندفع نحو خط النهاية! 🏆`;
    }
}

// Focus Timer (Pomodoro)
let timerInterval = null;
let timerSeconds = 25 * 60;
let timerRunning = false;
let pomodoroCount = parseInt(localStorage.getItem('studyTracker_pomodoro') || '0');

function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (!el) return;
    const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const s = (timerSeconds % 60).toString().padStart(2, '0');
    el.textContent = `${m}:${s}`;
}

window.toggleTimer = function() {
    const btn = document.getElementById('timer-start');
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        if (btn) { btn.textContent = 'ابدأ'; btn.classList.remove('active'); }
    } else {
        timerRunning = true;
        if (btn) { btn.textContent = 'إيقاف'; btn.classList.add('active'); }
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                pomodoroCount++;
                localStorage.setItem('studyTracker_pomodoro', pomodoroCount);
                const countEl = document.getElementById('pomodoro-count');
                if (countEl) countEl.textContent = pomodoroCount;
                if (btn) { btn.textContent = 'ابدأ'; btn.classList.remove('active'); }
                showToast('🎉 انتهت الجلسة! خذ استراحة قصيرة.');
                timerSeconds = 25 * 60;
                updateTimerDisplay();
            }
        }, 1000);
    }
};

window.resetTimer = function() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 25 * 60;
    updateTimerDisplay();
    const btn = document.getElementById('timer-start');
    if (btn) { btn.textContent = 'ابدأ'; btn.classList.remove('active'); }
};

window.setTimer = function(minutes) {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = minutes * 60;
    updateTimerDisplay();
    const btn = document.getElementById('timer-start');
    if (btn) { btn.textContent = 'ابدأ'; btn.classList.remove('active'); }
};

// Init pomodoro display
setTimeout(() => {
    const countEl = document.getElementById('pomodoro-count');
    if (countEl) countEl.textContent = pomodoroCount;
    updateTimerDisplay();
}, 100);

// ===== THEME TOGGLE =====
window.toggleTheme = function() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
        html.removeAttribute('data-theme');
        document.getElementById('theme-icon').textContent = '🌙';
        localStorage.setItem('studyTracker_theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').textContent = '☀️';
        localStorage.setItem('studyTracker_theme', 'dark');
    }
    const themeSpan = document.querySelector('#theme-toggle [data-i18n]');
    if (themeSpan) themeSpan.textContent = t(!isDark ? 'lightMode' : 'darkMode');
    // Redraw chart with correct colors
    drawChart();
};

// ===== AUTH SYSTEM =====
function showAuthScreen() {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app-wrapper').style.display = 'none';
    renderAuthForm('login');
}

function renderAuthForm(mode) {
    const card = document.getElementById('auth-card');
    const isLogin = mode === 'login';
    card.innerHTML = `
        <span class="logo-icon">📚</span>
        <h1>${t(isLogin ? 'loginTitle' : 'registerTitle')}</h1>
        <p>${t(isLogin ? 'loginSubtitle' : 'registerSubtitle')}</p>
        <div class="auth-error" id="auth-error"></div>
        <input class="auth-input" id="auth-name" type="text" placeholder="${t('nameLabel')}" autocomplete="off">
        <input class="auth-input" id="auth-pass" type="password" placeholder="${t('passwordLabel')}">
        <button class="auth-btn" id="auth-submit">${t(isLogin ? 'loginBtn' : 'registerBtn')}</button>
        <button class="auth-btn secondary" id="auth-owner-btn">${t('continueAsOwner')}</button>
        <div class="auth-switch">
            ${t(isLogin ? 'switchToRegister' : 'switchToLogin')}
            <a id="auth-switch-link">${t(isLogin ? 'createAccount' : 'loginHere')}</a>
        </div>
    `;
    document.getElementById('auth-submit').onclick = () => isLogin ? loginUser() : registerUser();
    document.getElementById('auth-switch-link').onclick = () => renderAuthForm(isLogin ? 'register' : 'login');
    document.getElementById('auth-owner-btn').onclick = () => loginAsOwner();
}

function getUsers() {
    return JSON.parse(localStorage.getItem('studyTracker_users') || '{}');
}

function saveUsers(users) {
    localStorage.setItem('studyTracker_users', JSON.stringify(users));
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function loginUser() {
    const name = document.getElementById('auth-name').value.trim();
    const pass = document.getElementById('auth-pass').value;
    if (!name || !pass) return showAuthError(t('errorEmptyFields'));
    const users = getUsers();
    const userId = name.toLowerCase().replace(/\s+/g, '_');
    if (!users[userId]) return showAuthError(t('errorUserNotFound'));
    if (users[userId].password !== pass) return showAuthError(t('errorWrongPassword'));
    currentUser = { id: userId, name: users[userId].name, isOwner: false };
    localStorage.setItem('studyTracker_currentUser', JSON.stringify(currentUser));
    startUserSession();
}

function registerUser() {
    const name = document.getElementById('auth-name').value.trim();
    const pass = document.getElementById('auth-pass').value;
    if (!name || !pass) return showAuthError(t('errorEmptyFields'));
    const users = getUsers();
    const userId = name.toLowerCase().replace(/\s+/g, '_');
    if (users[userId]) return showAuthError(t('errorUserExists'));
    users[userId] = { name, password: pass, created: Date.now() };
    saveUsers(users);
    currentUser = { id: userId, name, isOwner: false };
    localStorage.setItem('studyTracker_currentUser', JSON.stringify(currentUser));
    startUserSession();
}

function loginAsOwner() {
    currentUser = { id: OWNER_ID, name: 'محمود حسني', isOwner: true };
    localStorage.setItem('studyTracker_currentUser', JSON.stringify(currentUser));
    startUserSession();
}

window.logoutUser = function() {
    localStorage.removeItem('studyTracker_currentUser');
    currentUser = null;
    location.reload();
};

// ===== CUSTOM TASKS FOR ALL USERS =====
window.addCustomTask = function() {
    const input = document.getElementById('custom-task-input');
    const descEl = document.getElementById('custom-task-desc');
    const urlEl = document.getElementById('custom-task-url');
    const catEl = document.getElementById('custom-task-category');
    const taskName = input.value.trim();
    if (!taskName) return;
    const daysPassed = getDaysPassed();
    const id = 'custom_' + Date.now();
    planData.push({
        id,
        category: catEl ? catEl.value : 'custom',
        dayAssigned: daysPassed,
        completed: false,
        text: taskName,
        videoNum: 0,
        description: descEl ? descEl.value.trim() : '',
        resourceUrl: urlEl ? urlEl.value.trim() : '',
        userNotes: ''
    });
    input.value = '';
    if (descEl) descEl.value = '';
    if (urlEl) urlEl.value = '';
    if (catEl) catEl.value = 'custom';
    saveData();
    renderApp();
    showToast(currentLang === 'ar' ? '✅ تمت إضافة المهمة' : '✅ Task added');
};

// ===== INIT =====
initApp();
if (currentUser && currentUser.isOwner) fetchCloudData();

document.getElementById('reset-btn').addEventListener('click', async () => {
    let password = prompt(currentLang === 'ar' ? 'لإجراء هذا التغيير الجذري، الرجاء إدخال كلمة السر:' : 'Enter password to reset:');
    if (password === '01024669873') {
        if (confirm(currentLang === 'ar' ? 'طوارئ: هل تريد تصفير جميع المستويات والبدء من خط الصفر؟' : 'Are you sure you want to reset everything?')) {
            updateSyncStatus('⏳ جاري مسح السحابة...');
            if (currentUser && currentUser.isOwner) await clearCloudData();
            const userKey = currentUser ? `studyTracker_${currentUser.id}` : 'studyTracker_default';
            localStorage.removeItem(userKey + '_data');
            localStorage.removeItem(userKey + '_startDate');
            localStorage.removeItem(userKey + '_stats');
            if (currentUser && currentUser.isOwner) {
                localStorage.removeItem('studyTracker_data_v3');
                localStorage.removeItem('studyTracker_startDate_v3');
                localStorage.removeItem('studyTracker_stats_v3');
            }
            localStorage.removeItem('studyTracker_streak');
            localStorage.removeItem('studyTracker_pomodoro');
            alert('✅ تم المسح الشامل بنجاح!');
            location.reload();
        }
    } else if (password !== null) {
        alert(currentLang === 'ar' ? 'كلمة السر غير صحيحة!' : 'Incorrect password!');
    }
});
