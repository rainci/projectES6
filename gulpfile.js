var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),//混淆js
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task("js",function(){
    gulp.src("./public/ES6/**/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify({mangle: true,compress: true}))
		.pipe(gulp.dest("./dist/public/js"))
        .pipe(reload({stream: true}))
});

gulp.task("templates", function() {//编译jade成html
 var YOUR_LOCALS = {};
 gulp.src("./views/**/*.html")
   .pipe(gulp.dest("./dist/"))
});

//启动热更新  
gulp.task('serve', function() {

    var files = [
        'views/**/*.html',
        'public/ES6/../*.js'
     ]; 
    browserSync.init({
        port: 9999,
        server: {  
            baseDir: './dist/'
        },
        files: files,
    }); 
   
}); 
gulp.task('watch',function(){//监听事件
    gulp.watch(["./public/ES6/**/*.js"],["js"]);
    gulp.watch(["./views/**/*.html"],["templates"]); 
});
gulp.task("default",["js","templates","watch","serve"]);
