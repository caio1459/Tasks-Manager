package repositories

import (
	"database/sql"

	"github.com/caio1459/tasksmanager/src/models"
)

// Struct com os métodos de crud
type taskRepositorie struct {
	db *sql.DB
}

// Recebe um banco de dados que é aberto no controller
func NewRepositorieTask(db *sql.DB) *taskRepositorie {
	return &taskRepositorie{db}
}

func (t taskRepositorie) InsertTask(task models.Task) (uint64, error) {
	statement, err := t.db.Prepare(
		"INSERT INTO tasks (title, description, cat_id) VALUES(?, ?, ?)",
	)
	if err != nil {
		return 0, err
	}
	defer statement.Close()

	results, err := statement.Exec(task.Title, task.Description, task.Category.ID)
	if err != nil {
		return 0, err
	}

	lastID, err := results.LastInsertId()
	if err != nil {
		return 0, err
	}
	return uint64(lastID), err
}

func (t taskRepositorie) SelectAllTasks() ([]models.Task, error) {
	rows, err := t.db.Query(`SELECT t.task_id, t.title, t.description, t.cat_id, c.description 
							FROM tasks t 
							LEFT JOIN categories c 
							ON t.cat_id = c.cat_id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	tasks := []models.Task{}
	for rows.Next() {
		task := models.Task{}
		err = rows.Scan(&task.ID, &task.Title, &task.Description, &task.Category.ID, &task.Category.Description)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	return tasks, nil
}

func (t taskRepositorie) UpdateTask(id uint64, task models.Task) error {
	// Verifica se a tarefa existe
	var exists bool
	err := t.db.QueryRow("SELECT EXISTS(SELECT 1 FROM tasks WHERE task_id = ?)", id).Scan(&exists)
	if err != nil {
		return err
	}
	if !exists {
		return sql.ErrNoRows
	}

	statement, err := t.db.Prepare("UPDATE tasks SET title = ?, description = ?, cat_id = ? WHERE task_id = ?")
	if err != nil {
		return err
	}
	defer statement.Close()

	if _, err = statement.Exec(task.Title, task.Description, task.Category.ID, id); err != nil {
		return err
	}
	return nil
}

func (t taskRepositorie) DeleteTask(id uint64) error {
	// Verifica se a tarefa existe
	var exists bool
	err := t.db.QueryRow("SELECT EXISTS(SELECT 1 FROM tasks WHERE task_id = ?)", id).Scan(&exists)
	if err != nil {
		return err
	}
	if !exists {
		return sql.ErrNoRows
	}

	statement, err := t.db.Prepare("DELETE FROM tasks WHERE task_id = ?")
	if err != nil {
		return err
	}
	defer statement.Close()

	if _, err := statement.Exec(id); err != nil {
		return err
	}
	return nil
}
