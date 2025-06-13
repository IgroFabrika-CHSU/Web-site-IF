document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "наверх"
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Мобильное меню
    const iframe = document.querySelector('iframe');
    iframe.onload = function() {
        const currentPage = window.location.pathname.split('/').pop();
        iframe.contentWindow.postMessage(currentPage, '*');
    };
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mob-menu');
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    function closeMenu() {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    window.addEventListener('message', function(e) {
        if (e.data === 'closeMobileMenu') {
        closeMenu();
        }
    });

    // Подсветка активной страницы для пк меню
    // Получаем текущую страницу и хэш
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const currentPage = currentPath + currentHash;
    // Находим все ссылки в основном меню
    const menuLinks = document.querySelectorAll('.menu-link');
    // Список подстраниц мероприятий
    const eventsSubpages = ['archive.html', 'archive.html#ifest-2025', 'archive.html#omut-autumn-2024'];
    menuLinks.forEach(link => {
        // Удаляем активный класс у всех ссылок
        link.classList.remove('active');
        // Получаем URL ссылки
        const linkPage = link.getAttribute('href');
        // Проверяем, является ли текущая страница подстраницей мероприятий
        const isEventsSubpage = eventsSubpages.some(page => 
            currentPage === page || 
            (page.includes('#') && currentPath === page.split('#')[0])
        );
        // Проверяем условия для подсветки
        if (linkPage === currentPage || 
           (linkPage === 'archive.html' && isEventsSubpage)) {
            link.classList.add('active');
        }
    });
});

