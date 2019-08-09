export function setUserInCookie(id, name) {
  document.cookie = `user_id=${id};`;
  document.cookie = `username=${name};`;
}

function getUserIDFromCookie() {
  var value = "; " + document.cookie;
  console.log(document.cookie);
  var parts = value.split("; user_id=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  } else {
    return null;
  }
}

function getUserNameFromCookie() {
  var value = "; " + document.cookie;
  console.log(document.cookie);
  var parts = value.split("; username=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  } else {
    return null;
  }
}

export function getUserFromCookie() {
  return {
  	id : getUserIDFromCookie(),
  	name : getUserNameFromCookie(),
  };
}

export function unsetUserInCookie() {
  document.cookie = "user_id=;";
  document.cookie = "username=;";
}
