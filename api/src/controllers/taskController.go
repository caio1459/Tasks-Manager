package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/caio1459/tasksmanager/src/database"
	"github.com/caio1459/tasksmanager/src/models"
	"github.com/caio1459/tasksmanager/src/repositories"
	"github.com/caio1459/tasksmanager/src/responses"
	"github.com/gorilla/mux"
)

func PostTask(w http.ResponseWriter, r *http.Request) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.Erro(w, http.StatusUnprocessableEntity, err)
		return
	}

	task := models.Task{}
	if err = json.Unmarshal(requestBody, &task); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	if err = task.Prepare(); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repositorie := repositories.NewRepositorieTask(db)
	task.ID, err = repositorie.InsertTask(task)
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusCreated, task)
}

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repositorie := repositories.NewRepositorieTask(db)
	tasks, err := repositorie.SelectAllTasks()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusOK, tasks)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	parameters := mux.Vars(r)
	ID, err := strconv.ParseUint(parameters["id"], 10, 64)
	if err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	repositorie := repositories.NewRepositorieTask(db)

	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.Erro(w, http.StatusUnprocessableEntity, err)
		return
	}

	task := models.Task{}
	if err = json.Unmarshal(requestBody, &task); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	if err = task.Prepare(); err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	if err = repositorie.UpdateTask(ID, task); err != nil {
		if err == sql.ErrNoRows {
			responses.Erro(w, http.StatusNotFound, fmt.Errorf("tarefa %v não encontrada", ID))
			return
		}
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusOK, fmt.Sprintf("Tarefa %v atualizada com sucesso!", ID))
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	parameters := mux.Vars(r)
	ID, err := strconv.ParseUint(parameters["id"], 10, 64)
	if err != nil {
		responses.Erro(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connection()
	if err != nil {
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	//Verifico se a publicação existe
	repositorie := repositories.NewRepositorieTask(db)
	if err = repositorie.DeleteTask(ID); err != nil {
		if err == sql.ErrNoRows {
			responses.Erro(w, http.StatusNotFound, fmt.Errorf("tarefa %v não encontrada", ID))
			return
		}
		responses.Erro(w, http.StatusInternalServerError, err)
		return
	}
	responses.Json(w, http.StatusOK, fmt.Sprintf("tarefa %v deletada com sucesso!", ID))
}
