$(document).ready(function() {
    const businessAddressContainer = '.js-business-address';
    const privateRadioBtn = '.js-private-btn';
    const companyRadioBtn = '.js-company-btn';

    toggleBusinessAddress();

    $('input[name="addressType"]').change(function() {
        toggleBusinessAddress();
    });

    function toggleBusinessAddress() {
        if ($(privateRadioBtn).prop('checked')) {
            $(companyRadioBtn).removeAttr('checked'); 
            $(privateRadioBtn).attr('checked', 'checked');
            $(businessAddressContainer).addClass('d-none');
        } else {
            $(privateRadioBtn).removeAttr('checked'); 
            $(companyRadioBtn).attr('checked', 'checked');
            $(businessAddressContainer).removeClass('d-none');
        }
    }
});