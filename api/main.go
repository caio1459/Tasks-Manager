package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/caio1459/tasksmanager/src/config"
	"github.com/caio1459/tasksmanager/src/router"
	"github.com/gorilla/handlers"
)

func main() {
	config.Load()

	fmt.Printf("Escutando na porta %v", os.Getenv("PORT"))
	r := router.GenerateRouter()

	// Adicione o manipulador CORS aqui para autorização de outras aplicações
	headers := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3001"}) 

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", os.Getenv("PORT")), handlers.CORS(headers, methods, origins)(r)))
}