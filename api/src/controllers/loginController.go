package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/caio1459/tasksmanager/src/authentication"
	"github.com/caio1459/tasksmanager/src/database"
	"github.com/caio1459/tasksmanager/src/models"
	"github.com/caio1459/tasksmanager/src/repositories"
	"github.com/caio1459/tasksmanager/src/responses"
	"github.com/caio1459/tasksmanager/src/security"
)

func Login(w http.ResponseWriter, r *http.Request) {
	//Pega o corpo da requisição
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.Erro(w, http.StatusUnprocessableEntity, err)
		return
	}
	//Trasforma o json em um struct
	user := models.User{}
	if err = json.Unmarshal(requestBody, &user); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repositorie := repositories.NewRepositorieUser(db)
	//Faz um SELECT por email pra comparar com o valor da requisição
	savedUser, err := repositorie.SelectUserFromEmail(user.Email)
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	//Compara os valores do banco com o da requisição
	if err = security.CheckPassword(user.Password, savedUser.Password); err != nil {
		responses.Erro(w, http.StatusUnauthorized, err)
		return
	}

	token, err := authentication.GenerateToken(savedUser.ID)
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}

	response := models.ResponseLogin{
		Token: token,
	}

	jsonData, err := json.Marshal(response)
	if err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
