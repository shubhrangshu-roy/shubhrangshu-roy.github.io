const uri = 'https://api.caint.casa/api/Comments';
const threadUri = 'https://api.caint.casa/api/Threads';

const threadHost = "shubhrangshuroy.com";
const threadPath = document.location.pathname;

const thisThread = getThreadId();

function getThreadId()
{
  const threadLocation = {
    hostname: threadHost,
    path: threadPath,
  };

  fetch(threadUri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(threadLocation)
  })
    .then(response => response.json())
    .then(_data => {
      data = _data;
      document.getElementById("threadID").value = data;
      getThread(data);
      return data;
  })
    .catch(error => console.error('Unable to get thread id.', error));
}

function getThread(thread) {
  fetch(uri + "/thread/" + thread)
    .then(response => response.json())
    .then(data => _displayThread(data))
    .catch(error => console.error('Unable to get comments.', error));
}

async function addItem() {
  const commenterNameTextbox = document.getElementById('commenterName');
  const commentBodyTextbox = document.getElementById('commentBody');
  var commentThreadId = document.getElementById('threadID').value;
  console.log(commentThreadId);

  if (commentBodyTextbox.value.length == 0)
  {
    console.log(commentBodyTextbox.value.length);
    return;
  }
  else
  {
    const item = {
      name: commenterNameTextbox.value.trim(),
      body: commentBodyTextbox.value.trim(),
      threadId: commentThreadId,
    };

    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => {
        getThread(commentThreadId);
        commenterNameTextbox.value = '';
        commentBodyTextbox.value = '';
      })
      .catch(error => console.error('Unable to add comment.', error));
  }


}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function approveItem(id) {
    fetch(`${uri}/admin/approve/${id}`, {
        method: 'POST'
      })
      .then(() => getItems())
      .catch(error => console.error('Unable to approve comments.', error));
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'comment' : 'comments';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

var sanitizeHTML = function (str) { return str.replace(/[^\w. ]/gi, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }

function _displayThread(data) {
  const threadBody = document.getElementById('commentThread');
  threadBody.setAttribute('class', 'commentThread');
  threadBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  var x = 0;

  data.forEach(item => {
    var commentDiv = document.createElement('div');
    var commentName = document.createElement('h3');
    var commentBody = document.createElement('p');

    commentDiv.setAttribute('class', 'comment');

    commentName.setAttribute('class', 'commenterName');
    commentBody.setAttribute('class', 'commentBody');

    commentName.innerHTML = sanitizeHTML(item.name);
    commentBody.innerHTML = sanitizeHTML(item.body);

    commentDiv.appendChild(commentName);
    commentDiv.appendChild(commentBody);

    threadBody.appendChild(commentDiv);
  });

  comments = data;
}
