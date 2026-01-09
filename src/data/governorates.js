// Utility to generate procedural math/logic puzzles to fill space
const generateFillerLevels = (startId, count) => {
    const fillers = [];
    for (let i = 0; i < count; i++) {
        const type = Math.random() > 0.5 ? 'logic' : 'choice';
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        let question, answer, options;

        if (type === 'logic') {
            question = `${num1} + ${num2} × 2 = ?`;
            answer = (num1 + num2 * 2).toString();
        } else {
            const res = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            answer = res.toString();
            options = [
                (res - 1).toString(),
                res.toString(),
                (res + 2).toString(),
                (res + 5).toString()
            ].sort(() => Math.random() - 0.5);
        }

        fillers.push({
            id: `${startId}-gen-${i}`,
            type,
            question,
            options,
            answer,
            points: 10
        });
    }
    return fillers;
};

// Core Culture Questions per Governorate
const ammanLevels = [
    {
        id: 'amman-1',
        type: 'choice',
        question: 'ما هو اسم المدرج الروماني الشهير في وسط البلد؟',
        options: ['مدرج جرش', 'المدرج الروماني', 'مدرج البتراء', 'مدرج أم قيس'],
        answer: 'المدرج الروماني',
        points: 20
    },
    {
        id: 'amman-2',
        type: 'text',
        question: 'أكلة شعبية تشتهر بها مطاعم وسط البلد وتؤكل غالباً يوم الجمعة؟',
        answer: 'المنسف', // Or Falafel/Hummus context dependent, but Mansaf is king
        points: 20
    },
    {
        id: 'amman-3',
        type: 'choice',
        question: 'منطقة في عمان تشتهر بالمقاهي والكتب القديمة (كشك الثقافة)؟',
        options: ['شارع الرينبو', 'وسط البلد', 'العبدلي', 'دابوق'],
        answer: 'وسط البلد',
        points: 25
    },
    {
        id: 'amman-4',
        type: 'text',
        question: 'جسر معلق شهير في عمان يربط بين الدوار الرابع وعبدون؟',
        answer: 'جسر عبدون',
        points: 25
    },
    {
        id: 'amman-5',
        type: 'choice',
        question: 'ما هو الاسم القديم لمدينة عمان؟',
        options: ['فيلادلفيا', 'جراسيا', 'أرابيلا', 'بترا'],
        answer: 'فيلادلفيا',
        points: 30
    }
];

const irbidLevels = [
    {
        id: 'irbid-1',
        type: 'choice',
        question: 'ما هو اللقب الذي يطلق على مدينة إربد؟',
        options: ['عروس الشمال', 'مدينة الجبال', 'أم المدارس', 'المدينة الوردية'],
        answer: 'عروس الشمال',
        points: 20
    },
    {
        id: 'irbid-2',
        type: 'text',
        question: 'جامعة ومنارة علمية تقع في إربد وتعتبر من الأقدم؟',
        answer: 'جامعة اليرموك',
        points: 20
    },
    {
        id: 'irbid-3',
        type: 'choice',
        question: 'اسم المدينة الرومانية الأثرية في إربد؟',
        options: ['أم قيس', 'الكرك', 'عجلون', 'الشوبك'],
        answer: 'أم قيس', // Gadara
        points: 25
    }
];

const zarqaLevels = [
    {
        id: 'zarqa-1',
        type: 'choice',
        question: 'تعتبر الزرقاء المدينة الصناعية الأولى في الأردن؟',
        options: ['صح', 'خطأ'],
        answer: 'صح',
        points: 20
    },
    {
        id: 'zarqa-2',
        type: 'text',
        question: 'نهر يمر من الزرقاء وسميت المدينة باسمه؟',
        answer: 'سيل الزرقاء',
        points: 20
    }
];

const aqabaLevels = [
    {
        id: 'aqaba-1',
        type: 'choice',
        question: 'المنفذ البحري الوحيد للأردن يقع في؟',
        options: ['العقبة', 'البحر الميت', 'طبريا', 'قناة الملك عبدالله'],
        answer: 'العقبة',
        points: 20
    },
    {
        id: 'aqaba-2',
        type: 'text',
        question: 'ما اسم القلعة التاريخية الموجودة في العقبة؟',
        answer: 'قلعة العقبة', // or Mamluk Castle
        points: 25
    }
];

// Helper to build full 50 levels
const buildLevels = (baseLevels, fillerId) => {
    const needed = 50 - baseLevels.length;
    return [...baseLevels, ...generateFillerLevels(fillerId, needed)];
};

export const governorates = [
    {
        id: 'amman',
        name: 'عمّان',
        desc: 'العاصمة وقلب الأردن',
        img: 'bg-gradient-to-br from-slate-700 to-slate-600', // Placeholder for Image
        levels: buildLevels(ammanLevels, 'amman')
    },
    {
        id: 'irbid',
        name: 'إربد',
        desc: 'عروس الشمال',
        img: 'bg-gradient-to-br from-green-700 to-green-600',
        levels: buildLevels(irbidLevels, 'irbid')
    },
    {
        id: 'zarqa',
        name: 'الزرقاء',
        desc: 'قلعة الصناعة',
        img: 'bg-gradient-to-br from-blue-900 to-slate-800',
        levels: buildLevels(zarqaLevels, 'zarqa')
    },
    {
        id: 'aqaba',
        name: 'العقبة',
        desc: 'ثغر الأردن الباسم',
        img: 'bg-gradient-to-br from-cyan-600 to-blue-500',
        levels: buildLevels(aqabaLevels, 'aqaba')
    },
    {
        id: 'balqa',
        name: 'البلقاء',
        desc: 'مدينة السلط العريقة',
        img: 'bg-gradient-to-br from-yellow-700 to-orange-800',
        levels: buildLevels([], 'balqa') // Fill completely generated for now
    },
    {
        id: 'madaba',
        name: 'مادبا',
        desc: 'مدينة الفسيفساء',
        img: 'bg-gradient-to-br from-purple-700 to-indigo-800',
        levels: buildLevels([], 'madaba')
    },
    {
        id: 'jerash',
        name: 'جرش',
        desc: 'مدينة الألف عمود',
        img: 'bg-gradient-to-br from-stone-600 to-stone-500',
        levels: buildLevels([], 'jerash')
    },
    {
        id: 'ajloun',
        name: 'عجلون',
        desc: 'الطبيعة والقلعة',
        img: 'bg-gradient-to-br from-emerald-700 to-teal-800',
        levels: buildLevels([], 'ajloun')
    },
    {
        id: 'karak',
        name: 'الكرك',
        desc: 'أرض القلاع والمجد',
        img: 'bg-gradient-to-br from-orange-800 to-red-900',
        levels: buildLevels([], 'karak')
    },
    {
        id: 'tafila',
        name: 'الطفيلة',
        desc: 'الهاشمية',
        img: 'bg-gradient-to-br from-amber-700 to-yellow-800',
        levels: buildLevels([], 'tafila')
    },
    {
        id: 'maang',
        name: 'معان',
        desc: 'بوابة التاريخ',
        img: 'bg-gradient-to-br from-orange-900 to-yellow-900',
        levels: buildLevels([], 'maan')
    },
    {
        id: 'mafraq',
        name: 'المفرق',
        desc: 'مفترق الطرق',
        img: 'bg-gradient-to-br from-slate-500 to-gray-600',
        levels: buildLevels([], 'mafraq')
    }
];
