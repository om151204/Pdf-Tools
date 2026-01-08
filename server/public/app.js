console.log("app.js loaded");

let redirectUrl = "";

function openDialog(title, desc, url) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  redirectUrl = url;

  document.getElementById("modal").classList.add("active");
}

function closeDialog() {
  document.getElementById("modal").classList.remove("active");
}

function proceed() {
  if (!redirectUrl) {
    alert("No destination set");
    return;
  }
  window.location.href = redirectUrl;
}
