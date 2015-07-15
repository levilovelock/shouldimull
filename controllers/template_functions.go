package controllers

import (
	"github.com/astaxie/beego"
)

func init() {
	beego.AddFuncMap("jquerySource", jquerySource)
	beego.AddFuncMap("bootstrapJavascriptSource", bootstrapJavascriptSource)
	beego.AddFuncMap("bootstrapCSSSource", bootstrapCSSSource)
}

func jquerySource() string {
	if beego.RunMode == "prod" {
		return "//code.jquery.com/jquery-1.11.3.min.js"
	}
	return "static/js/jquery.min.js"
}

func bootstrapJavascriptSource() string {
	if beego.RunMode == "prod" {
		return "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
	}
	return "static/js/bootstrap.min.js"
}

func bootstrapCSSSource() string {
	if beego.RunMode == "prod" {
		return "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
	}
	return "static/css/bootstrap.min.css"
}
