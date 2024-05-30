package repositories

import (
	"database/sql"

	"github.com/caio1459/tasksmanager/src/models"
)

// Struct com os métodos de crud
type usersRepositorie struct {
	db *sql.DB
}

// Recebe um banco de dados que é aberto no controller
func NewRepositorieUser(db *sql.DB) *usersRepositorie {
	return &usersRepositorie{db}
}

func (u usersRepositorie) SelectUserFromEmail(email string) (models.User, error) {
	row, err := u.db.Query("SELECT * FROM users WHERE email = ?", email)
	if err != nil {
		return models.User{}, err
	}
	defer row.Close()

	user := models.User{}
	if row.Next() {
		if err = row.Scan(
			&user.ID, &user.Name, &user.Email,
			&user.Password, &user.Register); err != nil {
			return models.User{}, err
		}
	}
	return user, nil
}

func (u usersRepositorie) InsertUser(user models.User) (uint64, error) {
	statement, err := u.db.Prepare(
		"INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
	)
	if err != nil {
		return 0, err
	}
	defer statement.Close()

	results, err := statement.Exec(user.Name, user.Email, user.Password)
	if err != nil {
		return 0, err
	}

	lastID, err := results.LastInsertId()
	if err != nil {
		return 0, err
	}
	return uint64(lastID), err
}
