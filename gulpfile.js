const {src, dest, series, watch} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del('build')
};

const css = () => {
  return src('src/css/**/*.css')
    .pipe(dest('build/css'))
};

const fonts = () => {
  return src('src/fonts/**/*')
    .pipe(dest('build/fonts'))
};

const mailer = () => {
  return src('src/PHPMailer/**/*')
    .pipe(dest('build/PHPMailer'))
};

const php = () => {
  return src('src/mail.php')
    .pipe(dest('build'))
};

const js = () => {
  return src('src/js/**/*.min.js')
    .pipe(dest('build/js'))
};

const styles = () => {
  return src('src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
};

// const SVGSprites = () => {
//   return src('src/img/svg/**/*.svg')
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest('build/img'))
// };

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img//*.svg',
  ])
    .pipe(image())
    .pipe(dest('build/img'))
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
};

const scripts = () => {
  return src([
    'src/js/index.js',
    'src/js/index-catalog.js',
    'src/js/index-card.js',
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('build/js'))
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  })
};

watch('src/**/*.html', htmlMinify);
watch('src/css/**/*.scss', styles);
watch('src/js/**/*.js', scripts);
// watch('src/img/svg/**/*.svg', SVGSprites);

exports.default = series(clean, htmlMinify, styles, images, css, fonts, js, scripts, watchFiles);

const stylesBuild = () => {
  return src('src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(dest('build/css'))
};

const htmlMinifyBuild = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'))
};

exports.build = series(clean, htmlMinifyBuild, stylesBuild, images, css, fonts, js, scripts, mailer, php);
