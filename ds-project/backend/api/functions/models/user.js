'use strict'

class users {
  constructor ({ id, username, name, surname, email, password, status }) {
    this.id = id
    this.username = username
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.status = status
  }
}

module.exports = users
