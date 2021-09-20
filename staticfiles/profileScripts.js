axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
// This application is used to control objects/buttons/data displayed on the screen. 
var app = new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
    data: {
        currentReviews: [],
        currentUser: 0,

    },
    mounted: {},
    methods: {},

})