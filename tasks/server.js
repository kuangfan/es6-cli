import gulp from 'gulp'
import gulpif from 'gulp-if'
import liveserver from 'gulp-live-server'
import args from './util/args'

gulp.task('serve', (cb) => {
  console.log('serve:' + args.watch)
  if (!args.watch) return cb()
  let server = liveserver.new(['--harmony', 'server/bin/www'])
  server.start()

  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file) {
    server.notify.apply(server, [file])
  })

  gulp.watch(['server/routes/**/*.js', 'server/app.js'], function() {
    server.start.bind(server)()
  })
})
