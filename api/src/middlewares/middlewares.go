package middlewares

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/caio1459/tasksmanager/src/authentication"
	"github.com/caio1459/tasksmanager/src/responses"
)

// Verifica se o user fazendo a requisição está autenticado
func Authenticate(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := authentication.ValidadeToken(r); err != nil {
			responses.Erro(w, http.StatusUnauthorized, err)
			return
		}
		next(w, r) //Executa próxima função, que pode ser a passada com parametro
	}
}

// Logger é um middleware que registra os logs das requisições HTTP
func Logger(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Definir o caminho do arquivo de log
		logDir := "logs"
		logFile := filepath.Join(logDir, "logfile.log")
		// Criar o diretório de logs se não existir
		if err := os.MkdirAll(logDir, os.ModePerm); err != nil {
			log.Fatalf("Erro ao criar o diretório de logs: %v", err)
		}
		// Abrir ou criar o arquivo de logs
		file, err := os.OpenFile(logFile, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666)
		if err != nil {
			log.Fatalf("Erro ao abrir o arquivo de logs: %v", err)
		}
		defer file.Close()
		// Configurar o logger para escrever no arquivo
		log.SetOutput(file)
		log.Printf(" | Método: %s | URI: %s", r.Method, r.RequestURI)
		// Chamar o próximo handler na cadeia
		next(w, r)
	}
}
