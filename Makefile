jstests:
	find static/js -iname '*.js'  ! -name jquery.min.js ! -name bootstrap.min.js | xargs jshint
	karma start my.conf.js

package32:
	go get
	bee pack -v=true -be="GOARCH=386"
