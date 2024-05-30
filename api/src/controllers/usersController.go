package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/caio1459/tasksmanager/src/database"
	"github.com/caio1459/tasksmanager/src/models"
	"github.com/caio1459/tasksmanager/src/repositories"
	"github.com/caio1459/tasksmanager/src/responses"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	//Pega o corpo da requisição
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.Erro(w, http.StatusUnprocessableEntity, err)
		return
	}

	//Converte o json em um struct
	user := models.User{}
	if err = json.Unmarshal(requestBody, &user); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	//Verifica os campos
	if err = user.Prepare("cadastro"); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	//Abre uma conexão
	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	//Cria um novo repositorio
	repositorie := repositories.NewRepositorieUser(db)
	user.ID, err = repositorie.InsertUser(user)
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusCreated, user)
}
