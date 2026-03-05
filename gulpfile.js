const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");

const paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js",
  },
  php: {
    src: "./**/*.php",
  },
};

function styles() {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: "",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(
      rename({
        basename: "main",
        suffix: "",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.reload({ stream: true }));
}

function serve() {
  browserSync.init({
    proxy: "localhost:8080",
    // automatically open the browser when the server starts
    open: true,
    notify: false,
  });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.php.src).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.default = series(parallel(styles, scripts), serve);

