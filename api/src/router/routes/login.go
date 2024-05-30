package routes

import (
	"net/http"

	"github.com/caio1459/tasksmanager/src/controllers"
)

var routeLogin = Route{
	URI:                    "/api/login",
	Method:                 http.MethodPost,
	Function:               controllers.Login,
	RequiresAuthentication: false,
}
