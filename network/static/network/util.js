document.addEventListener("DOMContentLoaded", function () {});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function edit(post_id) {
  edit_btn = document.getElementById(`edit${post_id}`);
  post = document.getElementById(`post${post_id}`);

  var textarea_node = document.createElement((tagName = "textarea"));
  textarea_node.id = `text${post_id}`;
  textarea_node.className = "form-control";
  textarea_node.value = post.innerHTML;
  post.innerText = "";
  post.appendChild(textarea_node);

  var save_btn = document.createElement((tagName = "button"));
  save_btn.innerText = "Save";
  save_btn.className = "btn btn-primary ml-auto";
  save_btn.id = `save${post_id}`;
  save_btn.addEventListener("click", () => {
    save(post_id);
  });
  edit_btn.parentNode.appendChild(save_btn);
  edit_btn.parentNode.removeChild(edit_btn);
}

function save(post_id) {
  textarea_node = document.getElementById(`text${post_id}`);
  post_content = textarea_node.value;

  post = document.getElementById(`post${post_id}`);
  post.innerHTML = post_content;

  save_btn = document.getElementById(`save${post_id}`);
  var edit_btn = document.createElement((tagName = "button"));
  edit_btn.innerText = "Edit";
  edit_btn.className = "btn btn-outline-primary ml-auto";
  edit_btn.id = `edit${post_id}`;
  edit_btn.addEventListener("click", () => {
    edit(post_id);
  });
  save_btn.parentNode.appendChild(edit_btn);
  save_btn.parentNode.removeChild(save_btn);
     
      // Using the Fetch Api with Django Rest Framework
      // https://gist.github.com/marteinn/3785ff3c1a3745ae955c
      var Data = {
        post: post_content,
      };

      const csrfToken = getCookie("csrftoken");
      // Save post in database
      fetch(`/api/post/${post_id}/`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "X-CSRFToken": csrfToken,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("Data is ok", data);
        })
        .catch(function (ex) {
          console.log("parsing failed", ex);
        });
}


function like(ids) {
  ids = ids.split(",");
  var post_id = parseInt(ids[0]);
  var user_id = parseInt(ids[1]);

  var likes = parseInt(document.getElementById(`likes${post_id}`).innerHTML);

  // get the post likers
  fetch(`/api/post/${post_id}/`)
    .then((response) => response.json())
    .then((post) => {
      var likers = post["likers"];

      console.log(likers);
      var liked = false;
      var baseURL = "http://127.0.0.1:8000/static/network/";

      // add or remove liker
      let flag = false;
      for(liker in likers){
        console.log(liker)
        if (liker===user_id){
          flag=true
        }
      }
      console.log(flag)
      if (!flag) {
        liked = true;
        likes += 1;
        likers.push({id:user_id})
        console.log(likers);
        document.getElementById(`like${post_id}`).src = baseURL + "like1.png";
      } else {
        likes -= 1;
        likers = likers.filter(item => item !== {id:user_id})
        console.log(likers);
        document.getElementById(`like${post_id}`).src = baseURL + "like.png";
      }

      document.getElementById(`likes${post_id}`).innerHTML = likes;

      var Data = {
        'likers': likers,
      };
      console.log(Data);
      const csrfToken = getCookie("csrftoken");
      // Save post in database
      fetch(`/api/post/${post_id}/`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "X-CSRFToken": csrfToken,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("Data is ok", data);
        })
        .catch(function (ex) {
          console.log("parsing failed", ex);
        });
    });
}
