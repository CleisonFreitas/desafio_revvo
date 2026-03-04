// Mock de cursos para o pilot
const mockCourses = [
  {
    id: 1,
    title: "Pellentesque malesuada",
    description:
      "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.",
    thumbnail: "https://via.placeholder.com/320x200?text=Curso+1",
    link: "#",
    badge: null,
  },
  {
    id: 2,
    title: "Curso avançado de UX e UI design",
    description:
      "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    thumbnail: "https://via.placeholder.com/320x200?text=Curso+2",
    link: "#",
    badge: "Novo",
  },
  {
    id: 3,
    title: "Introdução à programação em JavaScript",
    description:
      "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.",
    thumbnail: "https://via.placeholder.com/320x200?text=Curso+3",
    link: "#",
    badge: null,
  },
  {
    id: 4,
    title: "Fotografia para iniciantes",
    description:
      "Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper.",
    thumbnail: "https://via.placeholder.com/320x200?text=Curso+4",
    link: "#",
    badge: null,
  },
  {
    id: 5,
    title: "Marketing digital completo",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna.",
    thumbnail: "https://via.placeholder.com/320x200?text=Curso+5",
    link: "#",
    badge: null,
  },
  {
    id: 6,
    title: "Curso de produtividade extrema para o dia a dia profissional",
    description:
      "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    thumbnail: "https://via.placeholder.com/320x200?text=Curso+6",
    link: "#",
    badge: null,
  },
];

// Slides usam os mesmos dados, mas poderiam vir separados da API
const mockSlides = [
  {
    id: 1,
    courseId: 1,
    title: "Lorem ipsum",
    description:
      "Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    image:
      "assets/c__Users_Meu-PC_AppData_Roaming_Cursor_User_workspaceStorage_dc4b738645ce8d200b875bd2edb21a42_images_home-7589657b-0290-4a04-ae80-23687c7996a3.png",
    link: "#",
  },
  {
    id: 2,
    courseId: 2,
    title: "Curso avançado de UX e UI design",
    description:
      "Aprenda a criar interfaces limpas e modernas com foco em usabilidade.",
    image: "https://via.placeholder.com/1200x400?text=Slide+2",
    link: "#",
  },
  {
    id: 3,
    courseId: 3,
    title: "Introdução ao JavaScript moderno",
    description:
      "Descubra os fundamentos da linguagem da web com exemplos práticos.",
    image: "https://via.placeholder.com/1200x400?text=Slide+3",
    link: "#",
  },
];

function attachSearchHandler(courses) {
  const form = document.querySelector(".header__search");
  const input = document.querySelector("#search-input");

  if (!form || !input) return;

  // Pensado para futura integração com API:
  // - hoje filtramos localmente a lista mock
  // - no futuro basta trocar pelo fetch na API e atualizar o grid
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = input.value.trim().toLowerCase();

    const filtered = !term
      ? courses
      : courses.filter((course) =>
          course.title.toLowerCase().includes(term)
        );

    renderCoursesGrid(filtered);
  });
}

function renderCoursesGrid(courses) {
  const grid = document.querySelector(".js-courses-grid");
  if (!grid) return;

  grid.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";

    card.innerHTML = `
      <div class="course-card__image">
        <img src="${course.thumbnail}" alt="${course.title}" loading="lazy" />
        ${
          course.badge
            ? `<span class="course-card__image-badge">${course.badge}</span>`
            : ""
        }
      </div>
      <div class="course-card__body">
        <h3 class="course-card__title" title="${course.title}">${course.title}</h3>
        <p class="course-card__description">${course.description}</p>
        <div class="course-card__footer">
          <a href="${course.link}" class="btn btn--primary">Ver curso</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Botão adicionar curso
  const addCard = document.createElement("button");
  addCard.type = "button";
  addCard.className = "course-card course-card--add";
  addCard.innerHTML = `
    <div class="course-card__icon">+</div>
    <h3 class="course-card__title">Adicionar curso</h3>
  `;
  grid.appendChild(addCard);
}

function initHeroSlider(slides) {
  const slider = document.querySelector(".js-hero-slider");
  if (!slider) return;

  const slideTemplate = slider.querySelector(".hero__slide");
  const dotsContainer = slider.querySelector(".hero__dots");
  const prevBtn = slider.querySelector(".hero__control--prev");
  const nextBtn = slider.querySelector(".hero__control--next");

  if (!slideTemplate || !dotsContainer || !prevBtn || !nextBtn) return;

  // Cria slides a partir do mock (o primeiro já existe como template)
  slider.querySelectorAll(".hero__slide").forEach((el, index) => {
    if (index > 0) el.remove();
  });

  slides.forEach((slide, index) => {
    const slideEl =
      index === 0 ? slideTemplate : slideTemplate.cloneNode(true);

    slideEl.dataset.slideIndex = String(index);
    slideEl.dataset.courseId = String(slide.courseId);

    const bg = slideEl.querySelector(".hero__background");
    const title = slideEl.querySelector(".hero__title");
    const description = slideEl.querySelector(".hero__description");
    const link = slideEl.querySelector(".btn");

    if (bg) {
      bg.style.backgroundImage = `url('${slide.image}')`;
    }
    if (title) {
      title.textContent = slide.title;
    }
    if (description) {
      description.textContent = slide.description;
    }
    if (link) {
      link.setAttribute("href", slide.link);
    }

    slideEl.classList.toggle("is-active", index === 0);

    if (index > 0) {
      slider.insertBefore(slideEl, prevBtn);
    }
  });

  let current = 0;

  function goTo(index) {
    const allSlides = Array.from(
      slider.querySelectorAll(".hero__slide")
    );
    if (!allSlides.length) return;

    const total = allSlides.length;
    current = (index + total) % total;

    allSlides.forEach((slide, idx) => {
      slide.classList.toggle("is-active", idx === current);
    });

    const dots = dotsContainer.querySelectorAll(".hero__dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === current);
    });
  }

  // Dots
  dotsContainer.innerHTML = "";
  slides.forEach((_slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero__dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    dotsContainer.appendChild(dot);
  });

  goTo(0);

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
}

document.addEventListener("DOMContentLoaded", () => {
  renderCoursesGrid(mockCourses);
  initializeSearchState();
  attachSearchHandler(mockCourses);
  initHeroSlider(mockSlides);
});

// Mantém o termo de busca caso queira evoluir para history / query string depois
function initializeSearchState() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (!q) return;

  const input = document.querySelector("#search-input");
  if (input) {
    input.value = q;
  }
}

