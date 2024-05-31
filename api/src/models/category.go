package models

import (
	"errors"
	"strings"
)

type Category struct {
	ID          uint64 `json:"cat_id,omitempty"`
	Description string `json:"description,omitempty"`
}

func (c *Category) validate() error {
	if c.Description == "" {
		return errors.New("é necessário informar a categoria")
	}
	return nil
}

func (c *Category) formatStrings() {
	c.Description = strings.TrimSpace(c.Description)
}

func (c *Category) Prepare() error {
	c.formatStrings()
	if err := c.validate(); err != nil {
		return err
	}
	return nil
}
