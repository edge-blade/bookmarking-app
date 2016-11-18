import { EventEmitter } from 'events'
import Firebase from 'firebase'

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };


Firebase.initializeApp(config)

//Enter your firebase Url below
const db = Firebase.database();
const categoriesRef = db.ref('categories')
const bookmarksRef = db.ref('bookmarks')
const store = new EventEmitter()

let categories = {}
let bookmarks = {}

db.ref().on('value', (snapshot) => {
    var bookmarksData = snapshot.val()
    if (bookmarksData) { 
        categories = bookmarksData.categories
        bookmarks = bookmarksData.bookmarks
        store.emit('data-updated', categories, bookmarks)
    }
})

store.addCategory = (category) => {
    categoriesRef.update(category)
}

store.deleteCategory = (catName) => {
    // first check if an 'Uncategorized' category exists, if not, create it
    console.log(categories)
    if(!('Uncategorized' in categories)) {
        categoriesRef.update({'Uncategorized': 'white'})
    }

    // set all bookmarks in this category to the default 'Uncategorized'
    for(var key in bookmarks) { 
        if (bookmarks[key].category === catName) {
            bookmarksRef.ref(key).update({category: 'Uncategorized'})
        }
    }

    //remove category
    cateogriesRef.ref(catName).remove()
}

store.addBookmark = (bookmark) => {
    bookmarksRef.push(bookmark)
}

store.deleteBookmark = (bookmarkId) => {
    bookmarksRef.ref(bookmarkId).remove()
}

export default store