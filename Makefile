jstests:
	karma start my.conf.js

package:
	go get -u
	bee pack -v=true