package routes

import (
	"net/http"

	"github.com/caio1459/tasksmanager/src/controllers"
)

var routesTasks = []Route{
	{
		URI:                    "/api/task",
		Method:                 http.MethodPost,
		Function:               controllers.PostTask,
		RequiresAuthentication: true,
	},
	{
		URI:                    "/api/task",
		Method:                 http.MethodGet,
		Function:               controllers.GetAllTasks,
		RequiresAuthentication: true,
	},
	{
		URI:                    "/api/task/{id}",
		Method:                 http.MethodPut,
		Function:               controllers.UpdateTask,
		RequiresAuthentication: true,
	},
	{
		URI:                    "/api/task/{id}",
		Method:                 http.MethodDelete,
		Function:               controllers.DeleteTask,
		RequiresAuthentication: true,
	},
}
