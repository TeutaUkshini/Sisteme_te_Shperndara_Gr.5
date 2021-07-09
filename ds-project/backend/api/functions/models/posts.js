'use strict'

class posts {
  constructor ({ postId, userId, text, date}) {
    this.postId=postId
    this.userId=userId
    this.text=text
    this.date=date
  }
}

module.exports = posts
