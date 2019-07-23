$(document).ready(function() {
  $('.deleteUser').on('click', deleteUser);
});

function deleteUser() {
  event.preventDefault();

  var confirmation = confirm('Are you sure you want to delete this user?');

  if(confirmation) {
    $.ajax({
      type: 'DELETE',
      url: '/user/' + $(".deleteUser").data('user')
    }).done(function(response) {
      window.location.replace('/users');
    });
  } else
      return false;

}