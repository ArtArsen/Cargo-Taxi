function openModal() {
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Обработка формы
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const csrftokenInput = document.querySelector('[name=csrfmiddlewaretoken]');
        if (!csrftokenInput) {
            alert('CSRF token не найден');
            return;
        }

        const csrftoken = csrftokenInput.value;

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            point_a: document.getElementById('point_a').value,
            point_b: document.getElementById('point_b').value,
            comment: document.getElementById('comment').value,
        };

        try {
            const response = await fetch('/api/create-order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === 'success') {
                alert('✅ Спасибо! Мы свяжемся с вами в ближайшее время 🚚');
                form.reset();
                closeModal();
            } else {
                alert('❌ Ошибка: ' + result.message);
            }
        } catch (error) {
            alert('❌ Не удалось отправить заявку');
            console.error(error);
        }
    });
});

// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Запустить при загрузке

// Entrance animations для карточек
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }, 300);
});


const translations = {
    ru: { 
        logo: "Грузовое такси",
        hero_title: "Грузовое такси и перевозки<br>в Кызыл-Кые и области",
        hero_desc: "Подбираем подходящую машину и берём на себя организацию перевозки.",
        hero_sub: "Переезды, мебель, техника, уголь и стройматериалы.",
        order_btn: "Оставить заявку",
        when_title: "Когда вам к нам",
        case_move: "Переезд",
        case_move_desc: "Квартирные и частные переезды.",
        case_furniture: "Мебель",
        case_furniture_desc: "Диваны, шкафы, кровати.",
        case_tech: "Техника",
        case_tech_desc: "Холодильники и бытовая техника.",
        cars_title: "Наши автомобили",
        car_porter: "Универсальный городской вариант.",
        car_gazel: "Большие переезды и объёмы.",
        car_labo: "Небольшие доставки.",
        car_board: "Бортовая машина",
        car_board_desc: "Уголь, стройматериалы, мешки.",
        steps_title: "Как мы работаем",
        step_1: "1️⃣ Вы оставляете заявку",
        step_2: "2️⃣ Мы перезваниваем",
        step_3: "3️⃣ Согласовываем цену",
        step_4: "4️⃣ Машина приезжает",
        geo_title: "География работы",
        geo_desc: "Кызыл-Кыя, Уч-Коргон, Караван и ближайшие районы.",
        form_title: "Заявка на перевозку",
        point_a: "📍 Откуда",
        point_b: "📍 Куда",
        name: "👤 Ваше имя",
        phone: "📱 Телефон",
        comment: "💬 Комментарий",
        form_note: "Мы перезвоним и уточним детали.",
        form_agree: "Отправляя заявку, вы соглашаетесь на обработку данных.",
        send: "Отправить заявку",
        contacts_title: "Наши контакты",
    },

    kg: {
        logo: "Жүк такси",
        hero_title: "Жүк такси жана ташуулар<br>Кызыл-Кыяда жана аймакта",
        hero_desc: "Ылайыктуу унааны тандап, ташууну уюштурабыз.",
        hero_sub: "Көчүү, эмерек, техника, көмүр жана курулуш материалдары.",
        order_btn: "Буйрутма берүү",
        when_title: "Качан бизге кайрыласыз",
        case_move: "Көчүү",
        case_move_desc: "Квартира жана жеке көчүүлөр.",
        case_furniture: "Эмерек",
        case_furniture_desc: "Диван, шкаф, керебет.",
        case_tech: "Техника",
        case_tech_desc: "Муздаткыч жана үй техникасы.",
        cars_title: "Биздин унаалар",
        car_porter: "Шаар үчүн универсалдуу унаа.",
        car_gazel: "Чоң көчүүлөр жана жүк көлөмү үчүн.",
        car_labo: "Кичи жеткирүүлөр.",
        car_board: "Борттук унаа",
        car_board_desc: "Көмүр, курулуш материалдары, баштык.",
        steps_title: "Кантип иштейбиз",
        step_1: "1️⃣ Сиз буйрутма калтырасыз",
        step_2: "2️⃣ Биз чалабыз",
        step_3: "3️⃣ Бааны макулдашабыз",
        step_4: "4️⃣ Унаа келет",
        geo_title: "Иш аймагы",
        geo_desc: "Кызыл-Кыя, Уч-Коргон, Караван жана жакынкы аймактар.",
        form_title: "Буйрутма",
        point_a: "📍 Кайдан",
        point_b: "📍 Кайда",
        name: "👤 Атыңыз",
        phone: "📱 Телефон",
        comment: "💬 Комментарий",
        form_note: "Биз чалып, маалымат тактайбыз.",
        form_agree: "Буйрутма берип, маалыматты иштетүүгө макулсуз.",
        send: "Жөнөтүү",
        contacts_title: "Биздин байланыштар",
    },

    uz: {
        logo: "Yuk taksi",
        hero_title: "Yuk taksi va tashish<br>Qizil-Qiyada va viloyatda",
        hero_desc: "Mos mashinani tanlab, tashishni uyushtiramiz.",
        hero_sub: "Ko‘chish, mebel, texnika, ko‘mir va qurilish materiallari.",
        order_btn: "Buyurtma berish",
        when_title: "Qachon murojaat qilasiz",
        case_move: "Ko‘chish",
        case_move_desc: "Kvartira va shaxsiy ko‘chishlar.",
        case_furniture: "Mebel",
        case_furniture_desc: "Divan, shkaf, karavot.",
        case_tech: "Texnika",
        case_tech_desc: "Sovutgich va maishiy texnika.",
        cars_title: "Bizning mashinalar",
        car_porter: "Shahar uchun universal variant.",
        car_gazel: "Katta ko‘chishlar va yuklar uchun.",
        car_labo: "Kichik yetkazishlar.",
        car_board: "Bortli mashina",
        car_board_desc: "Ko‘mir, qurilish materiallari, sumkalar.",
        steps_title: "Qanday ishlaymiz",
        step_1: "1️⃣ Siz buyurtma qoldirasiz",
        step_2: "2️⃣ Biz qo‘ng‘iroq qilamiz",
        step_3: "3️⃣ Narxni kelishamiz",
        step_4: "4️⃣ Mashina keladi",
        geo_title: "Ish hududi",
        geo_desc: "Qizil-Qiya, Uch-Kurgan, Karavan va yaqin hududlar.",
        form_title: "Buyurtma",
        point_a: "📍 Qayerdan",
        point_b: "📍 Qayerga",
        name: "👤 Ismingiz",
        phone: "📱 Telefon",
        comment: "💬 Izoh",
        form_note: "Biz qo‘ng‘iroq qilib, ma’lumotni aniqlaymiz.",
        form_agree: "Buyurtma berish bilan ma’lumotni qayta ishlashga rozisiz.",
        send: "Yuborish",
        contacts_title: "Bizning kontaktlarimiz",
    },

    tj: {
        logo: "Такси боркаш",
        hero_title: "Такси боркаш ва нақлиёт<br>дар Қизил-Қия ва минтақа",
        hero_desc: "Мошинаро мувофиқ интихоб мекунем ва нақлиётро ташкил мекунем.",
        hero_sub: "Кӯчиш, мебел, техника, ангишт ва маводҳои сохтмон.",
        order_btn: "Дархост фиристодан",
        when_title: "Қачон муроҷиат мекунед",
        case_move: "Кӯчиш",
        case_move_desc: "Кӯчиши хона ва шахсӣ.",
        case_furniture: "Мебел",
        case_furniture_desc: "Диван, шкаф, кат.",
        case_tech: "Техника",
        case_tech_desc: "Яхдон ва техникаи хонагӣ.",
        cars_title: "Мошинҳои мо",
        car_porter: "Варианти универсалӣ барои шаҳр.",
        car_gazel: "Барои кӯчишҳои калон ва миқдорҳои зиёд.",
        car_labo: "Расонидани хурд.",
        car_board: "Мошини боркаш",
        car_board_desc: "Ангишт, маводҳои сохтмон, халтаҳо.",
        steps_title: "Чӣ гуна кор мекунем",
        step_1: "1️⃣ Шумо дархост медиҳед",
        step_2: "2️⃣ Мо занг мезанем",
        step_3: "3️⃣ Нархро мувофиқ мекунем",
        step_4: "4️⃣ Мошин меояд",
        geo_title: "Минтақаи кор",
        geo_desc: "Қизил-Қия, Уч-Кургон, Караван ва ноҳияҳои наздик.",
        form_title: "Дархост",
        point_a: "📍 Аз куҷо",
        point_b: "📍 Ба куҷо",
        name: "👤 Ном",
        phone: "📱 Телефон",
        comment: "💬 Шарҳ",
        form_note: "Мо занг мезанем ва тафсилотро дақиқ мекунем.",
        form_agree: "Бо фиристодани дархост, шумо бо коркарди маълумот розӣ ҳастед.",
        send: "Фиристодан",
        contacts_title: "Алокахои мо",
    }
};


function setLang(lang) {
    localStorage.setItem("lang", lang);
    applyLang(lang);
}

function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

const savedLang = localStorage.getItem("lang") || "ru";
applyLang(savedLang);

// MODAL
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
