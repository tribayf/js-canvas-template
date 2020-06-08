'use strict';

const gulp       = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const rename     = require('gulp-rename')
const sass       = require('gulp-sass')
const terser     = require('gulp-terser')

const babelify   = require('babelify')
const browserify = require('browserify')
const buffer     = require('vinyl-buffer')
const source     = require('vinyl-source-stream')

const bsync      = require('browser-sync').create()
const del        = require('del')


const paths = {
  styles: {
    src: 'src/styles/**/*.sass',
    dst: 'app/styles',
    ignore: ['*.css'],
  },
  scripts: {
    root: 'src/scripts/',
    entries: ['index.js'],
    src: 'src/scripts/**/*.js',
    dst: 'app/scripts',
  },
  html: {
    src: 'src/**/*.html',
    dst: 'app'
  },
}

const clean = () => {
  return del(['app'])
}

const html = () => {
  return gulp.src(paths.html.src)
             .pipe(gulp.dest(paths.html.dst))
}

const styles = () => {
  return gulp.src(paths.styles.src, { sourcemaps: true, ignore: paths.styles.ignore })
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest(paths.styles.dst, { sourcemaps: true }))
}

const scripts = (done) => {
  paths.scripts.entries.map( entry => {
     return browserify({
       basedir: paths.scripts.root,
       entries: [entry],
       debug: true,
     })
    .transform(babelify, { presets: ['@babel/env'] })
    .bundle()
    .pipe( source( entry ))
    .pipe( rename({ suffix: '.min' }) )
    .pipe( buffer() )
    .pipe( sourcemaps.init({ loadMaps: true }))
    .pipe( terser(/* options */) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(paths.scripts.dst) )
  })

  done()
}

const watch = (done) => {
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.html.src, html)

  done()
}

const serve = (done) => {
  bsync.init({
    server: 'app',
    port: '4000',
    ui: false,
    open: false,
    watch: true,
  })

  done()
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts))
const devel = gulp.series(build, gulp.parallel(watch, serve))

exports.clean   = clean
exports.styles  = styles
exports.scripts = scripts
exports.html    = html
exports.build   = build
exports.default = devel
