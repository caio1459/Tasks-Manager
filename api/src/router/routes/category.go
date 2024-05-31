package routes

import (
	"net/http"

	"github.com/caio1459/tasksmanager/src/controllers"
)

var routesCategories = []Route{
	{
		URI:                    "/api/category",
		Method:                 http.MethodPost,
		Function:               controllers.PostCategory,
		RequiresAuthentication: true,
	},
	{
		URI:                    "/api/category",
		Method:                 http.MethodGet,
		Function:               controllers.GetAllCategories,
		RequiresAuthentication: true,
	},
}
