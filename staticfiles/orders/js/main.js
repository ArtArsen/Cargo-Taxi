function openModal() {
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Обработка формы
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
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
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            alert('✅ Спасибо! Мы свяжемся с вами в ближайшее время 🚚');
            document.getElementById('orderForm').reset();
            closeModal();
        } else {
            alert('❌ Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('❌ Не удалось отправить заявку. Попробуйте позже.');
        console.error('Error:', error);
    }
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