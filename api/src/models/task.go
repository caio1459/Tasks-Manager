package models

import (
	"errors"
	"strings"
)

type Task struct {
	ID          uint64 `json:"task_id,omitempty"`
	Title       string `json:"title,omitempty"`
	Description string `json:"description,omitempty"`
	// CatID       uint64 `json:"cat_id,omitempty"`
	Category Category `json:"category,omitempty"`
}

func (t *Task) validate() error {
	if t.Title == "" {
		return errors.New("é necessário informar o titulo")
	}
	return nil
}

func (t *Task) formatStrings() {
	t.Title = strings.TrimSpace(t.Title)
	t.Description = strings.TrimSpace(t.Description)
	t.Category.Description = strings.TrimSpace(t.Category.Description)
}

func (c *Task) Prepare() error {
	c.formatStrings()
	if err := c.validate(); err != nil {
		return err
	}
	return nil
}
