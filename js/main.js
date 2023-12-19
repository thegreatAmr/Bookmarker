// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  var bookmark = {
    name: siteName,
    url: siteUrl,
    index: bookmarks.length + 1 // Add index to the bookmark
  };

  // Add bookmark to array
  bookmarks.push(bookmark);

  // Set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  
  // Find the index of the bookmark to delete
  var indexToDelete = -1;
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      indexToDelete = i;
      break;
    }
  }

  // If the bookmark was found, remove it from the array
  if (indexToDelete !== -1) {
    bookmarks.splice(indexToDelete, 1);

    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
  }
}




// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    var index = bookmarks[i].index;

    bookmarksResults.innerHTML += '<div class="well">' +
      '<h3>[' + index + '] ' + name +
      ' <a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</h3>' +
      '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}