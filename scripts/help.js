document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('openModalBtn').addEventListener('click', function () {
    document.getElementById('helpModal').style.display = 'block';
  });

  document.getElementsByClassName('close')[0].addEventListener('click', function () {
    document.getElementById('helpModal').style.display = 'none';
  });
})