document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация иконок Lucide
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. Мобильное меню (Toggle)
  const burger = document.querySelector('.burger');
  const burgerClose = document.querySelector('.burger-close');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav a');

  if (burger && mobileOverlay) {
      const toggleMenu = () => mobileOverlay.classList.toggle('active');
      burger.addEventListener('click', toggleMenu);
      if (burgerClose) burgerClose.addEventListener('click', toggleMenu);

      mobileLinks.forEach(link => {
          link.addEventListener('click', () => mobileOverlay.classList.remove('active'));
      });
  }

  // 3. Эффект скролла хедера
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });

  // 4. GSAP + SplitType (ТОЛЬКО ДЛЯ HERO)
  // Библиотеки подключаются в index.html через CDN
  if (typeof gsap !== 'undefined' && typeof SplitType !== 'undefined') {
      const heroTitle = new SplitType('#hero-title', { types: 'chars, words' });

      gsap.from(heroTitle.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: "back.out(1.7)",
      });

      gsap.from('.hero__subtitle, .hero__actions', {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 1,
          delay: 0.8,
          ease: "power2.out"
      });

      gsap.from('.hero__visual', {
          opacity: 0,
          x: 50,
          duration: 1.5,
          delay: 0.5,
          ease: "power3.out"
      });
  }

  // 5. Появление блоков при скролле (Intersection Observer)
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.info-card, .feature-item, .reveal, .case-card, .resource-item').forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      revealObserver.observe(el);
  });

  // 6. Аккордеон (Секция "Стратегии")
  document.querySelectorAll('.benefit-item__header').forEach(itemHeader => {
      itemHeader.addEventListener('click', () => {
          const item = itemHeader.parentElement;
          const isActive = item.classList.contains('active');

          document.querySelectorAll('.benefit-item').forEach(el => el.classList.remove('active'));

          if (!isActive) {
              item.classList.add('active');
          }
      });
  });

  // 7. КАНВАС-РАДАР (Секция "Инновации")
  const canvas = document.getElementById('radarCanvas');
  if (canvas) {
      const ctx = canvas.getContext('2d');
      let width, height, centerX, centerY;
      let pulse = 0;

      const resize = () => {
          const size = canvas.offsetWidth * window.devicePixelRatio;
          canvas.width = size;
          canvas.height = size;
          width = canvas.width;
          height = canvas.height;
          centerX = width / 2;
          centerY = height / 2;
      };

      const draw = () => {
          ctx.clearRect(0, 0, width, height);
          const radius = (width / 2.5);

          // Рисуем сетку
          ctx.strokeStyle = 'rgba(212, 160, 23, 0.15)';
          ctx.lineWidth = 1;
          for (let i = 1; i <= 4; i++) {
              ctx.beginPath();
              for (let j = 0; j <= 5; j++) {
                  const angle = (j / 5) * Math.PI * 2 - Math.PI / 2;
                  const r = (radius * i) / 4;
                  const x = centerX + Math.cos(angle) * r;
                  const y = centerY + Math.sin(angle) * r;
                  if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
              }
              ctx.closePath();
              ctx.stroke();
          }

          // Рисуем "живую" область данных
          pulse += 0.03;
          ctx.beginPath();
          ctx.fillStyle = 'rgba(212, 160, 23, 0.3)';
          ctx.strokeStyle = '#D4A017';
          ctx.lineWidth = 2;

          for (let i = 0; i <= 5; i++) {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const r = (radius * (0.6 + Math.sin(pulse * 0.5 + i) * 0.15)) + Math.sin(pulse + i) * 5;
              const x = centerX + Math.cos(angle) * r;
              const y = centerY + Math.sin(angle) * r;
              if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          requestAnimationFrame(draw);
      };

      window.addEventListener('resize', resize);
      resize();
      draw();
  }

  // --- ИСПРАВЛЕННАЯ ЛОГИКА ТЕСТА (RADON SCOPE) ---
(function() {
  const quizData = [
      { q: "Какова ваша главная цель на ближайший год?", o: ["Рост дохода", "Релокация в ЕС", "Смена индустрии", "Пассивный доход"] },
      { q: "Насколько вы уверены в своем проф. бренде (1-10)?", o: ["1-3 (Нужен аудит)", "4-6 (Средне)", "7-8 (Уверенно)", "9-10 (Эксперт)"] },
      { q: "Используете ли вы AI-инструменты в работе?", o: ["Да, постоянно", "Иногда", "Только планирую", "Нет, не вижу смысла"] },
      { q: "Какую страну ЕС рассматриваете как приоритет?", o: ["Франция", "Германия", "Бенилюкс", "Другая"] },
      { q: "Ваш уровень иностранного языка?", o: ["A1-A2", "B1 (Intermediate)", "B2 (Upper)", "C1-C2 (Pro)"] },
      { q: "Как часто вы обновляете LinkedIn?", o: ["Раз в неделю", "Раз в месяц", "Раз в год", "Никогда"] },
      { q: "Что является главным барьером?", o: ["Нетворкинг", "Юридические вопросы", "Язык", "Незнание рынка"] },
      { q: "Готовы инвестировать 2 недели в апгрейд?", o: ["Да, готов", "Возможно", "Только бесплатно", "Нет времени"] },
      { q: "Какой тип дохода приоритетнее?", o: ["Фикс. ставка", "Бонусы", "Смешанный", "Свой проект"] },
      { q: "Есть ли у вас чёткий план на 3 года?", o: ["Да, детальный", "В общих чертах", "Только мечты", "Нет плана"] }
  ];

  let currentStep = 1;
  const totalSteps = quizData.length;

  function renderStep() {
      const container = document.getElementById('quiz-container');
      const progressBar = document.getElementById('quiz-progress-bar');
      const progressText = document.getElementById('quiz-progress-text');

      if (!container) return;

      // Если тест пройден
      if (currentStep > totalSteps) {
          container.innerHTML = `
              <div class="quiz-final" style="text-align: center; padding: 20px;">
                  <h3 style="font-family: 'Syne', sans-serif; font-size: 2rem; margin-bottom: 15px;">Анализ завершен!</h3>
                  <p style="margin-bottom: 25px; color: rgba(245,245,245,0.7);">Ваш потенциал для апгрейда в ЕС: <strong>Высокий (87%)</strong>. Мы подготовили индивидуальную стратегию.</p>
                  <button class="btn btn--primary" onclick="document.querySelector('#contact').scrollIntoView({behavior: 'smooth'})">Получить результат</button>
              </div>
          `;
          if (progressBar) progressBar.style.width = '100%';
          if (progressText) progressText.innerText = "Тест пройден";
          return;
      }

      const data = quizData[currentStep - 1];

      // Обновляем прогресс
      if (progressBar) progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
      if (progressText) progressText.innerText = `Вопрос ${currentStep} из ${totalSteps}`;

      // Обновляем контент (Вопрос + Кнопки)
      container.innerHTML = `
          <div class="quiz-step active">
              <h3 class="quiz-question" style="margin-bottom: 25px; font-family: 'Syne', sans-serif;">${data.q}</h3>
              <div class="quiz-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                  ${data.o.map(option => `
                      <button class="quiz-opt-btn" style="
                          padding: 15px 20px;
                          background: rgba(255,255,255,0.05);
                          border: 1px solid rgba(255,255,255,0.1);
                          border-radius: 12px;
                          color: #fff;
                          text-align: left;
                          cursor: pointer;
                          transition: all 0.3s ease;
                      ">${option}</button>
                  `).join('')}
              </div>
          </div>
      `;

      // Навешиваем события на новые кнопки
      const buttons = container.querySelectorAll('.quiz-opt-btn');
      buttons.forEach(btn => {
          btn.addEventListener('mouseenter', () => {
              btn.style.background = '#D4A017';
              btn.style.color = '#2D3319';
          });
          btn.addEventListener('mouseleave', () => {
              btn.style.background = 'rgba(255,255,255,0.05)';
              btn.style.color = '#fff';
          });
          btn.addEventListener('click', () => {
              currentStep++;
              renderStep();
          });
      });
  }

  // Запуск теста при загрузке
  renderStep();
})();

  // 9. ФОРМА КОНТАКТОВ + КАПЧА (5 + 3 = 8)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const captchaInput = document.getElementById('captcha-input').value;
          const messageBox = document.getElementById('form-message');

          if (captchaInput.trim() === "8") {
              messageBox.innerText = "Успешно отправлено! Мы свяжемся с вами.";
              messageBox.className = "form-message success";
              contactForm.reset();
              setTimeout(() => { messageBox.style.display = 'none'; }, 5000);
          } else {
              messageBox.innerText = "Ошибка капчи. Попробуйте еще раз.";
              messageBox.className = "form-message error";
          }
      });
  }

  // 10. COOKIE POPUP
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');

  if (cookiePopup && !localStorage.getItem('radon_cookies_accepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('active');
      }, 2000);
  }

  if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('radon_cookies_accepted', 'true');
          cookiePopup.classList.remove('active');
      });
  }
});