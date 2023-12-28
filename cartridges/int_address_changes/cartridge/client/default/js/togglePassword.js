$(document).ready(function () {
    // Toggle password visibility
    $('.js-togglePassword').click(function () {
      const passwordInput = $('.js-password');
      const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
      passwordInput.attr('type', type);
      $('.js-icons').toggleClass('fa-eye fa-eye-slash');
    });
});