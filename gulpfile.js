


let project_folder = 'dist';
let folder_src = 'src';


let path = {
    // папка куда выгружаем файлы
    build: {
        html: project_folder + '/',
        css: project_folder + '/css',
        js: project_folder + '/js',
        img: project_folder + '/img',
        icon: project_folder + '/icon',
        fonts: project_folder + '/fonts'
    },
    // папка с исходниками src
    src: {
        html: [folder_src + '/*.html',"!"+ folder_src + '/_*.html'], //если у нас 2 index.html например второй это header он будет собираться в один,толко прописывать через лодаш _headerc
        css: folder_src + '/scss/style.scss',
        js: folder_src + '/js/bundle.js',
        img: folder_src + '/img/**/*.{jpg,png,svg}',
        icon: folder_src + '/icon/**/*',
        fonts: folder_src + '/fonts/**/*'
      
    },

    // следить за элементами постоянно
    watch: {
        html: folder_src + '/**/*.html',
        css: folder_src + '/scss/**/*.scss',
        js: folder_src + '/js/**/*.js',
        img: folder_src + '/img/**/*.{jpg,png,svg}',
        icons: folder_src + '/icons/**/*',
        fonts: folder_src + '/fonts/**/*'
      
    },
    // удаляет все элементы во время нового запуска gulp 
    clean: './' + project_folder + '/'
}

let {src,dest} = require('gulp'), //папки для написания сценария
    gulp = require('gulp'), // папка для отдельных задач
    browsersync = require('browser-sync').create(),
    include = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefex = require('gulp-autoprefixer'),
    clean_css = require('gulp-clean-css'),
    rename_css = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    icons = require('gulp-iconfont');

function browserSync(item) {
    browsersync.init({
        server: { //настройка сервера
            baseDir: './' + project_folder + '/' //базовая папка 
        },
        port:3000, //порт 
        notify: true // при обновление показывает надпись 
    })
}


function html(){
    return src(path.src.html) // возвращаем html из src
    .pipe(include())
    .pipe(dest(path.build.html))// строит в папку  build html
    .pipe(browsersync.stream()) // обновляет браузер 
}


function js(){
    return src(path.src.js) // возвращаем js из src
    .pipe(include())
    .pipe(dest(path.build.js))// строит в папку  build js
    .pipe(
        uglify(

        )
    )
    .pipe(
        rename_css({
            extname: ".min.js"
        }))
    .pipe(dest(path.build.js)) // вставляем еще раз в папку dist
    .pipe(browsersync.stream()) // обновляет браузер 
}

function fonts(){
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
}

function img(){
    return src(path.src.img) // возвращаем html из src
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [
            {
                removeViewBox: true
            }
        ]})
    )
    .pipe(dest(path.build.img))// строит в папку  build html
    .pipe(browsersync.stream()) // обновляет браузер 
}


function icon(){
    return src(path.src.icon) // возвращаем html из src
    .pipe(dest(path.build.icon))// строит в папку  build html
    .pipe(browsersync.stream()) // обновляет браузер 
}

function css(){
    return src(path.src.css) // возвращаем css из src
    .pipe(
        scss({
           outputStyle: 'compressed'  //устанавливает из scss компрессинный файл css в папку dist
        })
    )
    .pipe(dest(path.build.css))
    .pipe(
        clean_css() // сжатие файла css
    )
    .pipe(
        rename_css({
           extname: '.min.css' // переименование файла css
        })
    )
    .pipe(
        autoprefex({
            overrideBrowserslist: ['last 5 version'], // версия автопрефикса
            cascade:true // стиль написания автопрефикса

    }))
    .pipe(dest(path.build.css))// строит в папку  build css
    .pipe(browsersync.stream()) // обновляет браузер 
}

function clean(){
    return del(path.clean) // удаляет новые не нужные созданные файлы в dist 
}

function watchFile(){
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.css],css)
    gulp.watch([path.watch.js],js)      // смотрит за обновлением html,css,js,image
    gulp.watch([path.watch.img],img)
    gulp.watch([path.watch.icons],icon)
    gulp.watch([path.watch.fonts],fonts)
   
}

let build = gulp.series(clean,gulp.parallel(js,css,html,img,icon,fonts))
let watch = gulp.parallel(build,watchFile,browserSync); // создаем переменную и запускаем метод асинхронного выполнения всех функии 


exports.icon = icon;
exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
