<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LEO - Meus Cursos</title>
    <link rel="stylesheet" href="dist/css/main.css" />
</head>
<body>
    <!-- Modal Welcome -->
    <div class="modal-overlay js-modal-overlay is-hidden" id="welcome-modal">
        <div class="modal-content">
            <button class="modal-close" aria-label="Fechar modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-illustration">
                <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="250" fill="#FF6B5B"/>
                    <rect x="100" y="40" width="120" height="160" rx="8" fill="#1DBCA3"/>
                    <circle cx="180" cy="80" r="12" fill="#FF6B5B"/>
                    <rect x="160" y="100" width="40" height="80" rx="2" fill="#FFF"/>
                    <rect x="240" y="60" width="100" height="120" rx="8" fill="#1DBCA3"/>
                    <circle cx="280" cy="50" r="8" fill="#2C3E50"/>
                    <circle cx="320" cy="70" r="8" fill="#2C3E50"/>
                </svg>
            </div>
            <h2 class="modal-title">EGESTAS TORTOR VULPUTATE</h2>
            <p class="modal-description">
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio dui. Cras
            </p>
            <button class="btn btn--modal-primary" aria-label="Inscrever-se">
                INSCREVA-SE
            </button>
        </div>
    </div>

    <header class="header">
        <div class="header__inner wrapper">
            <div class="header__logo" aria-label="LEO">
                <span class="header__logo-text">LEO</span>
            </div>

            <form class="header__search" role="search" aria-label="Buscar cursos">
                <label class="sr-only" for="search-input">Buscar curso</label>
                <input
                    id="search-input"
                    type="search"
                    name="q"
                    placeholder="Pesquisar curso..."
                    autocomplete="off"
                />
                <button type="submit" aria-label="Pesquisar curso">
                    🔍
                </button>
            </form>

            <div class="header__user">
                <span class="header__user-greeting">Seja bem-vindo</span>
                <span class="header__user-name">John Doe</span>
                <div class="header__user-avatar" aria-hidden="true">JD</div>
            </div>
        </div>
    </header>

    <main>
        <section class="hero" aria-label="Cursos em destaque">
            <div class="hero__slider js-hero-slider">
                <!-- Slides serão controlados via JS; conteúdo mock inicial -->
                <article class="hero__slide is-active" data-course-id="1">
                    <div class="hero__background" style="background-image: url('assets/c__Users_Meu-PC_AppData_Roaming_Cursor_User_workspaceStorage_dc4b738645ce8d200b875bd2edb21a42_images_home-7589657b-0290-4a04-ae80-23687c7996a3.png');"></div>
                    <div class="hero__content wrapper">
                        <div class="hero__text">
                            <h1 class="hero__title">Lorem Ipsum</h1>
                            <p class="hero__description">
                                Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </p>
                            <a href="#" class="btn btn--primary">Ver curso</a>
                        </div>
                    </div>
                </article>

                <!-- Controles do slideshow -->
                <button class="hero__control hero__control--prev" aria-label="Slide anterior">
                    ‹
                </button>
                <button class="hero__control hero__control--next" aria-label="Próximo slide">
                    ›
                </button>

                <div class="hero__dots" role="tablist" aria-label="Selecionar slide">
                    <!-- Gerado via JS -->
                </div>
            </div>
        </section>

        <section class="courses wrapper" aria-labelledby="courses-title">
            <header class="courses__header">
                <h2 id="courses-title">Meus cursos</h2>
            </header>

            <div class="courses__grid js-courses-grid">
                <!-- Cards são preenchidos via JS a partir de mock data -->
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer__inner wrapper">
            <div class="footer__brand">
                <div class="footer__logo">LEO</div>
                <p>
                    Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p class="footer__copyright">
                    Copyright 2017 - All right reserved.
                </p>
            </div>

            <div class="footer__contact">
                <h3>/ Contato</h3>
                <p>(21) 98765-3434</p>
                <p><a href="mailto:contato@leolearning.com">contato@leolearning.com</a></p>
            </div>

            <div class="footer__social">
                <h3>/ Redes sociais</h3>
                <ul>
                    <li><a href="#" aria-label="Facebook">Fb</a></li>
                    <li><a href="#" aria-label="Twitter">Tw</a></li>
                    <li><a href="#" aria-label="YouTube">Yt</a></li>
                    <li><a href="#" aria-label="Pinterest">Pt</a></li>
                </ul>
            </div>
        </div>
    </footer>

    <script src="dist/js/main.js"></script>
</body>
</html>

