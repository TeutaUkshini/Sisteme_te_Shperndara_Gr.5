var admin = require('firebase-admin')
var serviceAccount = require('../permission.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kidshouse-d646d-default-rtdb.firebaseio.com'
})

module.exports = admin.firestore()
