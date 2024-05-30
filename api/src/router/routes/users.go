package routes

import (
	"net/http"

	"github.com/caio1459/tasksmanager/src/controllers"
)

// Cria rotas de usuarios
var routesUsers = []Route{
	{
		URI:                    "/api/users",
		Method:                 http.MethodPost,
		Function:               controllers.CreateUser,
		RequiresAuthentication: false,
	},
	// {
	// 	URI:                    "/api/users/{id}/update-password",
	// 	Method:                 http.MethodPut,
	// 	Function:               usercontroller.UpdatePassword,
	// 	RequiresAuthentication: true,
	// },
}
