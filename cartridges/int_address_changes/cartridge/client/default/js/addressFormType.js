const businessAddressContainer = '.js-business-address';

$(document).ready(function() {
    toggleBusinessAddress();

    $('input[name="addressType"]').change(function() {
        toggleBusinessAddress();
    });

    function toggleBusinessAddress() {
        if ($('#companyRadio').prop('checked')) {
            $(businessAddressContainer).removeClass('d-none');
        } else {
            $(businessAddressContainer).addClass('d-none');
        }
    }
});