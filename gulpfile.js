const gulp = require('gulp');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
//import imagemin from 'gulp-imagemin';
const del= require('del');
const cssnano=require('gulp-cssnano');

gulp.task('css', function (done) {
    console.log('minifying css...');
    
    // Process regular CSS files
    gulp.src('./assets/**/*.css')
        .pipe(cssnano())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    
    done();
});


gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images',function(done){
    console.log('compressing images');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//empty the public assets directory
gulp.task('clean:assets',function(done){
    del.sync('/public/assets');
    done();
});
gulp.task('build',gulp.series('clean:assets','js','css','images'),function(done){
    console.log('Building assets');
    done();
});