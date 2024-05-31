package repositories

import (
	"database/sql"

	"github.com/caio1459/tasksmanager/src/models"
)

// Struct com os métodos de crud
type categoryRepositorie struct {
	db *sql.DB
}

// Recebe um banco de dados que é aberto no controller
func NewRepositorieCategory(db *sql.DB) *categoryRepositorie {
	return &categoryRepositorie{db}
}

func (c categoryRepositorie) InsertCategory(category models.Category) (uint64, error) {
	statement, err := c.db.Prepare(
		"INSERT INTO categories (description) VALUES(?)",
	)
	if err != nil {
		return 0, err
	}
	defer statement.Close()

	results, err := statement.Exec(category.Description)
	if err != nil {
		return 0, err
	}

	lastID, err := results.LastInsertId()
	if err != nil {
		return 0, err
	}
	return uint64(lastID), err
}

func (c categoryRepositorie) SelectAll() ([]models.Category, error) {
	rows, err := c.db.Query("SELECT * FROM categories")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	categories := []models.Category{}
	for rows.Next() {
		category := models.Category{}
		if err = rows.Scan(&category.ID, &category.Description); err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}
	return categories, nil
}
