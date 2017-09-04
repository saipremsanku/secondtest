$(document).ready(function () {
    $("#phone").intlTelInput({
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: "body",
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      //  geoIpLookup: function(callback) {
      //    $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //      callback(countryCode);
      //    });
      //  },
       //initialCountry: "auto",
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
       placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
       separateDialCode: true,
      utilsScript: "/src/assets/js/utils.js"
    });
});
