var gulp = require ( 'gulp' );
var cleanCSS = require ( 'gulp-clean-CSS' );
var linter = require( 'gulp-template-lint' );
var htmlmin = require( 'gulp-htmlmin' );
var imagemin = require( 'gulp-imagemin' );
var sass = require( 'gulp-sass' );
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var cssnano = require( 'cssnano' );
var bump = require( 'gulp-bump' );
var minimist = require( 'minimist' );
var exec = require( 'gulp-exec' );
var runSequence = require( 'run-sequence' );

gulp.task( 'build', function(callback) {

  runSequence( 'lint-template-html', 'minify-html',
               'imagemin', 'sass', 'postcss', 'bump',
	       'deploy',callback);

});

gulp.task( 'deploy', function () {

  return gulp.src('./**/**')
             .pipe( exec( 'git add .' ) )
	     .pipe( exec( 'git commit -am "Releasing"' ) )
	     .pipe( exec( 'git push' ) )
	     .pipe( exec.reporter() );

});

gulp.task( 'bump', function () {

  var knownOptions = {
      
      type: 'type'

  };

  var options = minimist(process.argv.slice(1), knownOptions);

  if ( options.type =='minor') {
    
    gulp.src( ['./index.html', './package.json'] )
        .pipe(bump( { type : 'minor' } ) )
	.pipe(gulp.dest( './dest/bump' ) );
  } else if ( options.type == 'major' ) {
  
      gulp.src( ['./index.html', './package.json'] )
          .pipe(bump( { type : 'major' } ) )
	  .pipe(gulp.dest( './dest/bump' ) );
  
  } else {
  
      gulp.src( ['./index.html', './package.json'] )
          .pipe(bump () )
	  .pipe(gulp.dest( './' ) );
  
  }

});

gulp.task( 'postcss', function () {

 var plugins = [
 
        autoprefixer( { browsers : [ 'last 2 versions' ] } ),
	cssnano ()
 
 ];

 return gulp.src( 'stylesheets/**/*.css' )
            .pipe(postcss(plugins))
	    .pipe(gulp.dest( 'dest/postcss' ) );

});

gulp.task( 'sass', function () {

  return gulp.src( 'stylesheets/**/*.scss' )
             .pipe(sass ().on( 'error', sass.logError) )
	     .pipe(gulp.dest( './dest/sass' ) );

});

gulp.task( 'sass:watch', function () {

  gulp.watch( 'stylesheets/**/*.scss', ['sass'] );

});

gulp.task( 'imagemin', function () {

  return gulp.src( 'images/*' )
             .pipe(imagemin () )
	     .pipe(gulp.dest( 'dest/images' ));

});

gulp.task( 'minify-html', function () {

  return gulp.src( './index.html')
             .pipe(htmlmin( { collapseWhitespace : true } ) )
	     .pipe(gulp.dest( 'dest' ) );

});


gulp.task( 'lint-template-html', function () {

  return gulp.src( './*.html' )
             .pipe( linter () )
	     .pipe( gulp.dest( 'output' ) );

});

gulp.task( 'minify-css', function () {

  return gulp.src( 'stylesheets/*.css' )
             .pipe( cleanCSS() )
	     .pipe( gulp.dest( 'dest') );

});


