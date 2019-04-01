var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var htmlmin = require('gulp-html-minifier');

gulp.task('css', function(){
    return gulp.src('resources/scss/*.css')
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(gulp.dest('public/css'));
});

gulp.task('js', function(){
    return gulp.src('resources/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('img', function(){
    return gulp.src('resources/img/*.*')
        .pipe(gulp.dest('public/img'));
})

gulp.task('inject_files', function(){
    return gulp.src('resources/views/**/*.ejs')
        .pipe(inject(gulp.src(['public/js/*.js', 'public/css/*.css']), {
            transform: function (filePath, file) {
                if(filePath.slice(-4) === '.css') {
                    return '<style type="text/css">' + file.contents.toString('utf8') + '</style>';
                }
                return '<script type="text/javascript">' + file.contents.toString('utf8') + '</script>';
            }
        }))
        .pipe(gulp.dest('views/'));
});

gulp.task('default', gulp.series('css', 'js', 'img', 'inject_files', function(){
    return gulp.src('views/index.ejs')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('views/'));
}));


gulp.task('watch', function(){
    gulp.watch('resources/js/*.js', gulp.series('js', 'inject_files'));
    gulp.watch('resources/scss/*.css', gulp.series('css', 'inject_files'));
    gulp.watch('resources/img/*', gulp.series('img'));
    gulp.watch('resources/views/**/*.ejs', gulp.series('inject_files'));
})

