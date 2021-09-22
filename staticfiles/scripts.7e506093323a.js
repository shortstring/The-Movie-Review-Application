axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
// let hostUrl = "https://moviecapstone.herokuapp.com/"
let hostUrl = "https://themoviereviewapplication.com/"
let defaultImg = "https://res.cloudinary.com/depg7toa6/image/upload/v1632258123/hmtrowj28pnvkuoa15l9.png"
    // This application is used to control objects/buttons/data displayed on the screen. 
var app = new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
    data: {
        searchTerm: "",
        currentCarousel: [],
        currentMovies: [],
        currentReviews: [],
        currentCast: [],
        currentCrew: [],
        currentUserImgs: [],
        currentUserNames: [],
        currentProviders: [],
        displayLimit: 4, // how many movies are displayed at once
        imgLink: "https://image.tmdb.org/t/p/original",
        currentAside: {},
        currentLeft: 0,
        currentRight: 4,
        currentUser: 1,
        reviewText: "",
        reviewNum: 5,
        reviewMinimize: "show input",
        ratingNumText: "Entertaining But Forgettable",
        // navArrow: "⇩",
        navArrow: "⇧",
        currError: "",
    },
    mounted() {
        let url = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + TMDB_KEY
        axios.get(url).then((response) => {
            for (let i = 0; i < response.data.results.length; ++i) {
                app.currentMovies.push(response.data.results[i])
                if (app.displayLimit > 0) {
                    app.currentCarousel.push(response.data.results[i]);
                    --app.displayLimit;
                }
                app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
            }
        }).then(() => {
            app.currentAside = app.currentMovies[0]
                // app.getUserId();
        }).finally(() => {
            // app.requestCast(app.currentAside.id)
            app.movieDetail(0)
            app.fillUserImgs()
        })

    },
    methods: {
        notLogged: function() {
            window.location.replace(hostUrl + "accounts/login/");
        },
        //this function is used to search by key word with axios,The search bar is on the expandable navbar. 
        searchKeyword: function() {
            let url = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_KEY + "&query=" + this.searchTerm
            app.resetData()
            axios.get(url).then((response) => {
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
            }).then(() => {
                if (app.currentCarousel.length == 0) {
                    app.hideContent()
                } else {
                    app.showContent()
                }
            }).then(() => {
                app.movieDetail(0)
            })
        },
        //this function makes a request to the tmdb api for current popular movies. It is callable from nav bar.
        trendingSearch: function() {
            app.resetData()
            app.showContent()
            let url = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
            }).finally(() => {
                app.movieDetail(0);
            })
        },
        topRatedSearch: function() {
            app.resetData()
            app.showContent()
            let url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
            }).finally(() => {
                app.movieDetail(0);
            })
        },
        upcomingSearch: function() {
            app.resetData()
            app.showContent()
            let url = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
            }).finally(() => {
                app.movieDetail(0);
            })
        },
        playingSearch: function() {
            app.resetData()
            app.showContent()
            let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
            }).finally(() => {
                app.movieDetail(0);
            })
        },
        //this function is used to get data for the current aside
        movieDetail: function(id) {
            app.currentAside = app.currentCarousel[id]
            app.getUserId()
            app.searchId()
            app.requestCast(app.currentAside.id)
            app.getMovieVideos(app.currentAside.id)
            app.getWatchProviders(app.currentAside.id)
            app.fillUserImgs()
            this.$forceUpdate()
            app.showAside()
        },
        //remove the hide tag from aside container
        showAside: function() {
            asideContainer = document.getElementById("asideContainer")
            asideContainer.classList.remove("hide")
        },
        //this function is used to add movie trailers
        getMovieVideos: function(id) {
            let url = "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                app.currentAside['videos'] = response.data.results
                for (let i = 0; i < app.currentAside['videos'].length; ++i) {
                    console.log("video for....")
                    if (app.currentAside['videos'][i].site == "Youtube")
                        console.log("video if....")
                    app.currentAside['videos'][i].key = "https://www.youtube.com/watch?v=" + app.currentAside['videos'][i].key
                }
            })
        },
        //this function is used to get watch providers... the icons of available steaming services. They are a added to an array
        getWatchProviders: function(id) {
            let url = "https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=" + TMDB_KEY
            app.currentProviders = [];
            axios.get(url).then((response) => {
                    if (response.data.results.US && response.data.results.US.rent) {
                        app.currentAside['providers'] = response.data.results.US.rent
                        for (let i = 0; i < response.data.results.US.rent.length; ++i) {
                            app.currentProviders[i] = {
                                logo_path: app.imgLink + app.currentAside['providers'][i]['logo_path'],
                                provider_name: app.currentAside['providers'][i]['provider_name']
                            }
                        }
                    }
                }).finally(() => {
                    this.$forceUpdate();
                }) //Used to update the first instance of data.. the providers are added after view checks for changes so it must be forced to update.
        },
        //this function is used to make an axios request to DRF to get reviews. 
        //searcing by movie id
        searchId: function() {
            app.getUserId()
            app.currentReviews = []
            let url = hostUrl + "apis/v1/search/custom?search=" + String(app.currentAside.id)
            axios.get(url).then((response) => {
                if (response) {
                    for (let i = 0; i < response.data.length; ++i) {
                        if (response && response.data && response.data[i]) {
                            app.currentReviews.push(response.data[i])
                        }
                    }
                    app.currentReviews = app.currentReviews.slice().reverse()
                } else {}
            })

        },
        //this function is called when the left button is clicked on the carosel at the top of the home page.
        //the function moves the range of the current movies displayed down by one
        carouselLeft: function() {
            if (app.currentLeft - 1 >= 0) {
                --app.currentLeft
                    --app.currentRight
                app.currentCarousel = []
                for (let i = app.currentLeft; i < app.currentRight; ++i) {
                    if (app.currentMovies[i])
                        app.currentCarousel.push(app.currentMovies[i]);
                }
                app.currentAside = app.currentCarousel[0]
                app.searchId()
                app.getWatchProviders(app.currentAside.id)
            }
        },
        //this function is called when the right button is clicked on the carosel at the top of the home page.
        //the function moves the range of the current movies displayed up by one
        carouselRight: function() {
            if (app.currentMovies.length + 1 > app.currentRight + 1) {
                ++app.currentLeft
                    ++app.currentRight
                app.currentCarousel = []
                for (let i = app.currentLeft; i < app.currentRight; ++i) {
                    if (app.currentMovies[i])
                        app.currentCarousel.push(app.currentMovies[i]);
                }
                app.currentAside = app.currentCarousel[0]
                app.searchId()
                app.getWatchProviders(app.currentAside.id)
            } else {
                //get the next page
            }
        },
        //this function is used to hide the movie container
        hideContent: function() {
            myContainer = document.getElementById("allMovies")
            noMovies = document.getElementById("noMovies")
            noMovies.classList.add('flex')
            noMovies.classList.remove('hide')
            myContainer.classList.add('hide')
            myContainer.classList.remove('flex')
        },
        //this function is used to display movie content if it is present
        showContent: function() {
            myContainer = document.getElementById("allMovies")
            noMovies = document.getElementById("noMovies")
            if (myContainer) {
                myContainer.classList.add('flex')
                myContainer.classList.remove('hide')
            }
            noMovies.classList.add('hide')
            noMovies.classList.remove('flex')
        },
        //used to reset the current data being displayed
        resetData: function() {
            app.currentMovies = []
            app.currentAside = {}
            app.currentCarousel = []
            app.displayLimit = 4;
        },
        //this function expands/minimizes the nav bar when the button is clicked.
        displayNavbar: function() {
            myNav = document.getElementById("navBtns")
            myHeader = document.getElementById("header")
            if (myNav.classList.contains("hide")) {
                myNav.classList.remove('hide')
                myNav.classList.add('flex')
                myHeader.classList.remove('headerHide')
            } else {
                myNav.classList.add('hide')
                myNav.classList.remove('flex')
                myHeader.classList.add('headerHide')
            }
        },
        hideSearchBar: function() {
            // myNav = document.getElementById("navBtns")
            // myHeader = document.getElementById("header")
            // myNav.classList.add('hide')
            // myNav.classList.remove('flex')
            // myHeader.classList.add('headerHide')
        },
        //used to scroll the screen to the top - used in the fixed button at the bottom
        goTop: function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        //this function sends an axios put to increment the upvote counter. It also adds the id to the users voted list.
        upVote: function(id, upVote, downVote, myVotedIds, index) {
            // console.log("MY IDS     " + myVotedIds);
            errorContainer = document.getElementById("reviewError" + index)
                // app.currentReviews[index]['voted'] = false
            if (app.getVoteStatus(myVotedIds)) {

                console.log("HELLLLLLLLLLLLOOOOOOOOOOOOOO?????????????????????")
                app.currError = "YOU ALREADY VOTED"
                errorContainer.classList.remove('hide')
            } else {
                errorContainer.classList.add("hide")
                app.currentReviews[index]['voted'] = true
                    ++app.currentReviews[index].upVotes
                app.currentReviews[index].myVotedIds += "," + app.currentUser
                let url = hostUrl + "apis/v1/vote/" + id + "/"
                    // console.log("voteCount: " + voteCount)
                    // console.log("id: " + id)
                axios.put(url, {
                    "upVotes": upVote + 1,
                    "downVotes": downVote,
                    "myVotedIds": myVotedIds + "," + app.currentUser
                }).then(() => {}).catch((error) => {
                    if (error.response) {
                        // console.log('data')
                        console.log(error.response)
                    }
                    console.log(error)
                })
            }
        },
        //this function sends an axios put to increment the downvote counter. It also adds the id to the users voted list.
        downVote: function(id, upVote, downVote, myVotedIds, index) {

            errorContainer = document.getElementById("reviewError" + index)
                // app.currentReviews[index]['voted'] = false
            if (app.getVoteStatus(myVotedIds)) {
                console.log("HELLLLLLLLLLLLOOOOOOOOOOOOOO?????????????????????")
                app.currError = "YOU ALREADY VOTED"
                errorContainer.classList.remove('hide')
                app.showError(index)
            } else {
                errorContainer.classList.add('hide')
                    ++app.currentReviews[index].downVotes
                app.currentReviews[index]['voted'] = true
                app.currentReviews[index].myVotedIds += "," + app.currentUser
                let url = hostUrl + "apis/v1/vote/" + id + "/"
                    // console.log("voteCount: " + voteCount)
                    // console.log("id: " + id)
                axios.put(url, {
                    "upVotes": upVote,
                    "downVotes": downVote + 1,
                    "myVotedIds": myVotedIds + "," + app.currentUser
                }).then(() => {}).catch((error) => {
                    if (error.response) {
                        console.log('data')
                        console.log(error.response)
                    }
                    console.log(error)
                }).finally(() => { app.forceUpdate(); })
            }
        },
        hideError: function(index) {
            errorContainer = document.getElementById("reviewError" + index)
            errorContainer.classList.add('hide')
        },
        showError: function(index) {
            errorContainer = document.getElementById("reviewError" + index)
            errorContainer.classList.remove('hide')
        },
        //this function is used to get a boolean to indicate if the user has already upvoted or downvoted the current review. Returns true if user is in the list.
        getVoteStatus: function(votedList) {
            myList = votedList.split(",")
            for (let i = 0; i < myList.length; ++i) {
                console.log("WOLOLOLOLOL")
                console.log(myList[i])
                if (app.currentUser == myList[i]) {
                    console.log("true true true.....")
                        // app.voted = true;
                    return true
                }
            }
            return false
                // app.voted = false;
        },
        //this function is used to 
        submitReview: function() {
            // app.getUserId()
            let url = hostUrl + "apis/v1"
            axios.post(url, {
                "movieTitle": app.currentAside.title,
                "imdbID": app.currentAside.id,
                "textBody": app.reviewText,
                "numRating": app.reviewNum,
                "author": app.currentUser,
                // "author_id": 1,
                "upVotes": 0,
                "downVotes": 0,
            }).catch((error) => {
                if (error.response) {
                    console.log('data')
                    console.log(error.response)
                }
                console.log(error)
            }).finally(() => {
                app.searchId();
                app.forceUpdate();
                app.showReviews();
                app.requestUserInfo(app.currentUser);
                // app.fillUserImgs();
                // app.forceUpdate();
            })
        },
        //this function is used to clear the arrays of user images and names, then calls the function to fill those arrays
        fillUserImgs: function() {
            app.showReviews()
            app.currentUserImgs = []
            app.currentUserNames = []

            if (app.currentReviews) {
                for (let i = 0; i < app.currentReviews.length; ++i) {
                    if (app.currentReviews[i] && app.currentReviews[i].author) {
                        app.requestUserInfo(app.currentReviews[i].author)

                    }
                }
            }
            return true;
        },
        //this function makes a request to drf to get the users name and avatar
        requestUserInfo: function(authorId) {
            let url = hostUrl + "apis/v1/user/" + String(authorId) + "/"
            axios.get(url, {}).then(response => {
                app.currentUserNames[response.data.pk] = response.data.username
                app.currentUserImgs[response.data.pk] = "https://res.cloudinary.com/depg7toa6/" + response.data.avatar
            }).finally(() => {
                app.$forceUpdate()
            });
        },
        //this function is used to show the reviews container and hide everything else
        showReviews: function() {
            app.hideCast();
            app.hideCrew();
            app.hideTrailers()
            app.hideInput()
                //show review container
            my_reviews = document.getElementById("myReviewContainer")
            my_reviews.classList.remove("hide")
                // hide_btn = document.getElementById("hideReview")
                // hide_btn.classList.remove("hide")
                //     //hide showreview button
                // fill_btn = document.getElementById("fillReview")
                // fill_btn.classList.add("hide")
                //     //show button to hide the input minimize button
                // inputHideBtn = document.getElementById("hideInputBtn")
                // inputHideBtn.classList.remove("hidden")

        },
        //this function is used to hide the reviews container
        hideReviews: function() {
            reviewInput = document.getElementById("reviewInput")
            my_reviews = document.getElementById("myReviewContainer")
            fill_btn = document.getElementById("fillReview")
            hide_btn = document.getElementById("hideReview")
            reviewInput.classList.add("hide")
            reviewInput.classList.remove("flex")
            fill_btn.classList.remove("hide")
            hide_btn.classList.add("hide")
            my_reviews.classList.add("hide")
        },

        //this function is used to get the user avatar image
        getImage: function(id) {
            return this.currentUserImgs[id]
        },
        //this function is used on the input form to increase the review number
        incRating: function() {
            if (app.reviewNum < 11) {
                ++app.reviewNum
                app.ratingNumText = app.getRatingText(app.reviewNum)
            }
        },
        //this function is used on the input form to decrease the review number
        decRating: function() {
            if (app.reviewNum > 1) {
                --app.reviewNum
                app.ratingNumText = app.getRatingText(app.reviewNum)
            }
        },
        //this function is used to get the text version of the rating.. (the argument num) and then returns it
        getRatingText: function(num) {
            let ratingsDict = {
                    1: "Absolutley Terrible",
                    2: "Waste of Time",
                    3: "Wouldn't Care if it Didn't Exist",
                    4: "Some effort but still lame",
                    5: "Entertaining But Forgettable",
                    6: "Would watch on tv",
                    7: "Would Rent",
                    8: "Watch in Theater",
                    9: "Will Buy",
                    10: "Will watch over and over",
                    11: "Unbelievably Good",
                }
                // console.log(ratingsDict[num])
            return ratingsDict[num];
        },
        //This function is used to display the review input form
        showInput: function() {
            app.hideReviews()
            app.hideCast()
            app.hideCrew()
            app.hideTrailers()
            reviewInput = document.getElementById("reviewInput")
            reviewInput.classList.remove('hide')
            reviewInput.classList.add('flex')
        },
        //This function is used to hide the review input form
        hideInput: function() {
            reviewInput = document.getElementById("reviewInput")
            reviewInput.classList.remove('flex')
            reviewInput.classList.add('hide')
        },
        //this function is used to hide the top movie carousel
        hideNavBar: function() {
            // console.log('hide nav')
            navHideBtn = document.getElementById("navHide")
            navBar = document.getElementById("navContent")
            navContainer = document.getElementById("topBar")
                // asideContainer = document.getElementById("asideContainer")
            if (navBar.classList.contains('topBar')) {
                navContainer.classList.add('hide')
                navBar.classList.remove('topBar')
                navBar.classList.add('hide')
                    // asideContainer.classList.remove('asideIndentSmall')
                    // asideContainer.classList.add('asideIndentLarge')
                app.navArrow = "⇩"
            } else {
                navContainer.classList.remove('hide')
                navBar.classList.add('topBar')
                navBar.classList.remove('hide')
                    // asideContainer.classList.add('asideIndentSmall')
                    // asideContainer.classList.remove('asideIndentLarge')
                app.navArrow = "⇧"
            }
            this.$forceUpdate
        },
        //this function is used to show the top movie carousel
        showNavBar: function() {
            navHideBtn = document.getElementById("navHide")
            navBar = document.getElementById("navContent")
            asideContainer = document.getElementById("asideContainer")
            navBar.classList.remove('hideNav')
            navBar.classList.add('flex')
                // asideContainer.classList.remove('asideIndentSmall')
                // asideContainer.classList.add('asideIndentLarge')
            app.navArrow = "⇧"
        },
        //this function is used to get the user id from django
        getUserId: function() {
            userIdDiv = document.getElementById("currentUserId")
            app.currentUser = parseInt(userIdDiv.innerHTML)
            parseInt(userIdDiv.value)
        },
        //used for linking to profile
        getProfileLink: function(id) {
            return "/profile/" + id
        },
        //this function is used to make a request for cast member data from tmdb api
        requestCast: function(id) {
            app.currentCast = []
            app.currentCrew = []
            let url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                console.log(response.data)
                for (let i = 0; i < response.data.cast.length; ++i) {
                    app.currentCast.push(response.data.cast[i])
                    app.currentCast[i].profile_path = app.imgLink + app.currentCast[i].profile_path
                    if (app.currentCast[i].profile_path == null)
                        app.currentCast[i].profile_path = defaultImg
                        // app.currentCrew[i].profile_path = app.imgLink + app.currentCrew[i].profile_path
                }
                for (let i = 0; i < response.data.crew.length; ++i) {
                    app.currentCrew.push(response.data.crew[i])
                    if (app.currentCrew[i].profile_path != null)
                        app.currentCrew[i].profile_path = app.imgLink + app.currentCrew[i].profile_path
                    if (app.currentCrew[i].profile_path == null)
                        app.currentCrew[i].profile_path = defaultImg
                }
            }).then(() => {
                // app.displayCast()
            }).finally(() => { this.$forceUpdate })
        },
        //this function is used to display cast members and hide other tabs
        displayCast: function() {
            app.hideReviews()
            app.hideCrew()
            app.hideInput()
            app.hideTrailers()
            castContainer = document.getElementById("castContainer")
            castContainer.classList.remove("hide")
        },
        //this function is used to hide the cast container
        hideCast: function() {
            castContainer = document.getElementById("castContainer")
            castContainer.classList.add("hide")
        },
        //this function is used to display the crew container
        displayCrew: function() {
            app.hideReviews()
            app.hideCast()
            app.hideTrailers()
            app.hideInput()
            crewContainer = document.getElementById("crewContainer")
            crewContainer.classList.remove("hide")
        },
        //this function is used to hide the crew container
        hideCrew: function() {
            crewContainer = document.getElementById("crewContainer")
            crewContainer.classList.add("hide")
        },
        //this function is used to display the trailers container
        displayTrailers: function() {
            app.hideReviews()
            app.hideCast()
            app.hideCrew()
            app.hideInput()
            trailerContainer = document.getElementById("trailerContainer")
            trailerContainer.classList.remove("hide")
        },
        //this function is used to hide the trailers container
        hideTrailers: function() {
            trailerContainer = document.getElementById("trailerContainer")
            trailerContainer.classList.add("hide")
        },
        editReview: function(index) {
            app.reviewText = app.currentReviews[index].textBody
            app.reviewNum = app.currentReviews[index].numRating
            editContainer = document.getElementById("editContainer" + index); // app.currentReviews[index].pk)
            if (editContainer.classList.contains('hide'))
                editContainer.classList.remove('hide')
            else
                editContainer.classList.add('hide')
        },
        submitEdit: function(index) {
            let url = hostUrl + "apis/v1/edit/" + app.currentReviews[index].pk
            axios.put(url, {
                // "movieTitle": app.currentAside.title,
                // "imdbID": app.currentAside.id,
                "textBody": app.reviewText,
                "numRating": app.reviewNum,
                // "author": app.currentUser,
                // "upVotes": app.currentReviews[reviewId].upVotes,
                // "downVotes": app.currentReviews[reviewId].downVotes,
            }).catch((error) => {
                if (error.response) {
                    console.log('data')
                    console.log(error.response)
                }
                console.log(error)
            }).finally(() => {
                editContainer = document.getElementById("editContainer" + index)
                editContainer.classList.add('hide')
                app.displayReviews();
            })

        },
        editContainer(id) {
            return "editContainer" + id
        },
        updateReview(index) {
            app.currentReviews[index].textBody = app.reviewText
            app.currentReviews[index].numRating = app.reviewNum
        },
        deleteReview(index) {
            let url = hostUrl + "apis/v1/edit/" + app.currentReviews[index].pk
            axios.delete(url).catch((error) => {
                if (error.response) {
                    console.log('data')
                    console.log(error.response)
                }
                console.log(error)
            })

        },
        reviewContainer(id) {
            return "reviewContainer" + id
        },
        hideContainer(index) {
            reviewContainer = document.getElementById("reviewContainer" + index)
            reviewContainer.classList.add('hide')
        },
        forceUpdate() {
            this.$forceUpdate();
            console.log("FORCE UPDATE")
        },
        displayReviews() {
            app.hideInput();
            reviewContainer = document.getElementById("myReviewContainer")
            reviewContainer.classList.remove('hide')
            console.log("YREEEEEEEEEEEEEEEEEE")
            app.fillUserImgs();
            app.forceUpdate();

        },
        reviewError(index) {
            return "reviewError" + index
        },
        imdbSearch(name) {
            let spaceReplaced = name.split(' ').join('+');
            let myStr = "https://www.imdb.com/find?q=" + spaceReplaced + "&ref_=nv_sr_sm"
            return myStr
        }
    }
})