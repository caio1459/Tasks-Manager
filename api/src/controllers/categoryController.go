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

func PostCategory(w http.ResponseWriter, r *http.Request) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.Erro(w, http.StatusUnprocessableEntity, err)
		return
	}

	category := models.Category{}
	if err = json.Unmarshal(requestBody, &category); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	if err = category.Prepare(); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repositorie := repositories.NewRepositorieCategory(db)
	category.ID, err = repositorie.InsertCategory(category)
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusCreated, category)
}

func GetAllCategories(w http.ResponseWriter, r *http.Request) {
	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repositorie := repositories.NewRepositorieCategory(db)
	categories, err := repositorie.SelectAll()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusOK, categories)
}
