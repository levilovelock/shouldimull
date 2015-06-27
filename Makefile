jstests:
	karma start my.conf.js

package32:
	go get
	bee pack -v=true -be="GOARCH=386"
