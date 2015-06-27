jstests:
	karma start my.conf.js

package:
	go get
	bee pack -v=true