const Api = {
  index(search = "") {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    return fetch(`/api/courses/?${params.toString()}`, {
      credentials: "same-origin",
    }).then((r) => r.json());
  },

  show(id) {
    return fetch(`/api/courses/${id}`, { credentials: "same-origin" }).then(
      (r) => r.json()
    );
  },

  create(data) {
    return fetch(`/api/courses/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "same-origin",
    }).then((r) => r.json());
  },

  delete(id) {
    return fetch(`/api/courses/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    }).then((r) => r.json());
  },
};

function attachSearchHandler() {
  const form = document.querySelector(".header__search");
  const input = document.querySelector("#search-input");

  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = input.value.trim();

    // update query string without reloading
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    history.replaceState({}, "", `${location.pathname}?${params.toString()}`);

    loadCourses(term);
  });
}

// helper used by search and other actions
function loadCourses(term = "") {
  Api.index(term).then((list) => {
    renderCoursesGrid(list);
    // usa os últimos 3 cursos para o slideshow
    const slides = list
      .slice(-3)
      .map((c) => ({
        id: c.id,
        courseId: c.id,
        title: c.title,
        description: c.description,
        image: c.banner || c.thumbnail || "",
        link: c.link || "#",
      }));
    initHeroSlider(slides);
  });
}

// simple prompt-based creation, simulating an API call
function openCreateDialog() {
  const title = prompt("Título do curso?");
  if (!title) return;
  const description = prompt("Descrição do curso?");
  const thumbnail = prompt(
    "URL da imagem do card?",
    "https://via.placeholder.com/320x200"
  );
  const banner = prompt(
    "URL da imagem de banner?",
    thumbnail.replace("320x200", "1200x400")
  );
  const link = prompt("Link do botão (Ver curso)?", "#");

  Api.create({ title, description, thumbnail, banner, link }).then((created) => {
    const params = new URLSearchParams(window.location.search);
    loadCourses(params.get("q") || "");
    if (created && created.id) {
      alert(`Curso criado!\nTítulo: ${created.title}\nDescrição: ${created.description}`);
    }
  });
}

function renderCoursesGrid(courses) {
  const grid = document.querySelector(".js-courses-grid");
  if (!grid) return;

  grid.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.dataset.id = course.id;

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
          <a href="${course.link}" class="btn btn--primary btn--view">Ver curso</a>
          <button type="button" class="btn btn--secondary btn--delete">Excluir</button>
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

  // delegate events
  grid.onclick = (e) => {
    const target = e.target;

    // add new course
    if (target.closest(".course-card--add")) {
      openCreateDialog();
      return;
    }

    // view details
    if (target.matches(".btn--view")) {
      e.preventDefault();
      const cardEl = target.closest(".course-card");
      const id = parseInt(cardEl.dataset.id, 10);
      Api.show(id).then((c) => {
        if (c) {
          alert(`Título: ${c.title}\nDescrição: ${c.description}`);
        }
      });
      return;
    }

    // delete
    if (target.matches(".btn--delete")) {
      const cardEl = target.closest(".course-card");
      const id = parseInt(cardEl.dataset.id, 10);
      if (confirm("Deseja realmente excluir este curso?")) {
        Api.delete(id).then(() => {
          const params = new URLSearchParams(window.location.search);
          loadCourses(params.get("q") || "");
        });
      }
    }
  };
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
  const initial = initializeSearchState();
  loadCourses(initial);
  attachSearchHandler();
});

// Mantém o termo de busca e retorna o valor para carregar
function initializeSearchState() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";

  const input = document.querySelector("#search-input");
  if (input) {
    input.value = q;
  }

  return q;
}

