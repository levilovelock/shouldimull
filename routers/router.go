package routers

import (
	"github.com/levilovelock/shouldimull/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}
