axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var app = new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
    data: {
        message: "message in vue",
        searchTerm: "Star Wars",
        currentCarousel: [],
        currentMovies: [],
        currentReviews: [],
        displayLimit: 4, // how many movies are displayed at once
        imgLink: "https://image.tmdb.org/t/p/original",
        currentAside: {},
        currentLeft: 0,
        currentRight: 4,
        currentUser: 1,
        myLen: 0,
        currentProviders: [],
        firstDisplay: true,
        //form variables
        reviewText: "",
        reviewNum: 5,
        reviewMinimize: "hide input",
        ratingNumText: "Entertaining But Forgettable",
        currentUserImgs: [],


    },
    computed: {
        myCurrentProviders: function() {
            app.getWatchProviders(currentAside.id)
            return app.currentProviders
        },
        myCurrentUserImgs: function() {
            if (app.currentReviews) {
                for (let i = 0; i < app.currentReviews.length; ++i) {
                    currentUserImgs.push(app.getUserImgs(app.currentReviews[i].author))
                }
                return this.currentUserImgs
            }
        },
        reversedMessage: function() {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    },

    mounted() {
        let url = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + TMDB_KEY
        axios.get(url).then((response) => {
            console.log(response.data.results)
            for (let i = 0; i < response.data.results.length; ++i) {
                app.currentMovies.push(response.data.results[i])
                if (app.displayLimit > 0) {
                    app.currentCarousel.push(response.data.results[i]);
                    --app.displayLimit;
                }
                // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
            }
            app.currentAside = app.currentMovies[0]
            app.searchId()
            app.getWatchProviders(app.currentAside.id)
        }).finally(() => { console.log('finally') })

    },
    updated() {
        // this.$nextTick(app.fillUserImgs())
    },
    methods: {
        //this function is used to search by key word with axios,The search bar is on the expandable navbar. 
        searchKeyword: function() {
            // document.getElementById('imageBox').src = "img/apple_" + total + ".png";
            let url = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_KEY + "&query=" + this.searchTerm
            app.resetData()
            axios.get(url).then((response) => {
                console.log(response.data.results)
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
            }).then(() => {
                if (app.currentCarousel.length == 0) {
                    app.hideContent()
                } else {
                    app.showContent()
                }
            }).finally(() => {
                console.log("UHHHHHHHHHHHHH")
                app.currentAside = app.currentCarousel[0]
                app.searchId()

                app.getWatchProviders(app.currentAside.id)
                    // app.showContent()
            })
        },
        //this function makes a request to the tmdb api for current popular movies. It is callable from nav bar.
        popularSearch: function() {
            app.resetData()
            app.showContent()
            let url = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                console.log(response.data.results)
                for (let i = 0; i < response.data.results.length; ++i) {
                    app.currentMovies.push(response.data.results[i])
                    if (app.displayLimit > 0) {
                        app.currentCarousel.push(response.data.results[i]);
                        --app.displayLimit;
                    }
                    // console.log(app.currentMovies[i][app.currentMovies[i].length + 1])
                    app.currentMovies[i]["posterLink"] = ("imgLink", app.imgLink + response.data.results[i].poster_path)
                }
                // app.currentAside = app.currentMovies[0]

                app.currentAside = app.currentCarousel[0]
                app.searchId()
                app.getWatchProviders(app.currentAside.id)
            })
        },
        //this function is used to get data for the current aside
        movieDetail: function(id) {
            app.currentAside = app.currentCarousel[id]
            app.searchId()
            app.getMovieVideos(app.currentAside.id)
            app.getWatchProviders(app.currentAside.id)
        },
        //this function is used to add movie trailers
        getMovieVideos: function(id) {
            let url = "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + TMDB_KEY
            axios.get(url).then((response) => {
                app.currentAside['videos'] = response.data.results
            })
        },
        //this function is used to get watch providers... the icons of available steaming services. They are a added to an array
        getWatchProviders: function(id) {
            let url = "https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=" + TMDB_KEY
            app.currentProviders = [];
            axios.get(url).then((response) => {
                    if (response.data.results.US && response.data.results.US.rent) {
                        console.log("HELLLLLLLLLLLLLLLOOOOOOOOOOOO?")
                        app.currentAside['providers'] = response.data.results.US.rent
                        for (let i = 0; i < response.data.results.US.rent.length; ++i) {
                            app.currentProviders[i] = {
                                    logo_path: app.imgLink + app.currentAside['providers'][i]['logo_path'],
                                    provider_name: app.currentAside['providers'][i]['provider_name']
                                }
                                // app.currentAside['providers'][i]['logo_path'] = app.imgLink + app.currentAside['providers'][i]['logo_path']
                        }
                        // app.myLen = app.currentAside['providers'].length
                    } else {
                        // console.log("ELSEEEEEEEEEEEE")
                    }
                }).finally(() => { this.$forceUpdate(); }) //Used to update the first instance of data.. the providers are added after view checks for changes so it must be forced to update.
                // return app.currentAside['providers']
        },
        //this function is used to make an axios request to DRF to get reviews.
        searchId: function() {
            this.currentReviews = []
            let url = "http://127.0.0.1:8000/apis/v1/search/custom?search=" + this.currentAside.id
            axios.get(url).then((response) => {
                console.log("heeeeeeeeeeeeeeere")
                console.log(response.data)

                for (let i = 0; i < response.data.length; ++i) {
                    app.currentReviews.push(response.data[i])
                }
                // console.log("------------------------------------------")
                // console.log(this.currentReviews)
                // console.log("------------------------------------------")
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
        //used to scroll the screen to the top - used in the fixed button at the bottom
        goTop: function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        //this function sends an axios put to increment the vote counter. It also adds the id to the users upvoted list.
        upVote: function(id, upVote, downVote, myVotedIds, index) {
            console.log("MY IDS     " + myVotedIds);
            if (app.getVoteStatus(myVotedIds) && !app.currentReviews[id].voted) {
                console.log("YOU ALREADY VOTED")
            } else {
                app.currentReviews[index]['voted'] = true
                    ++app.currentReviews[index].upVotes
                let url = "http://127.0.0.1:8000/apis/v1/vote/" + id + "/"
                    // console.log("voteCount: " + voteCount)
                    // console.log("id: " + id)
                axios.put(url, {
                    "upVotes": upVote + 1,
                    "downVotes": downVote,
                    "myVotedIds": myVotedIds + "," + app.currentUser
                }).then(() => {}).catch((error) => {
                    if (error.response) {
                        console.log('data')
                        console.log(error.response)
                    }
                    console.log(error)
                })
            }
        },
        downVote: function(id, upVote, downVote, myVotedIds, index) {
            if (app.getVoteStatus(myVotedIds) && !app.currentReviews[id].voted) {
                console.log("YOU ALREADY VOTED")
            } else {

                app.currentReviews[index]['voted'] = true
                let url = "http://127.0.0.1:8000/apis/v1/vote/" + id + "/"
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
                })
            }
        },
        //this function is used to get a boolean to indicate if the user has already upvoted or downvoted the current review. Returns true if user is in the list.
        getVoteStatus: function(votedList) {
            myList = votedList.split(",")
            for (let i = 0; i < myList.length; ++i) {
                console.log(myList[i])
                if (app.currentUser == myList[i]) {
                    return true
                }
            }
            return false
        },
        // setUser: function(my_id) {
        //     app.currentUser = 4
        //         // for (let i = 0; i < app.currentReviews.length; ++i) {
        //         //     app.requestUserInfo(app.currentReviews[i].author)
        //         // }
        // },
        submitReview: function() {
            let url = "http://127.0.0.1:8000/apis/v1"
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
            })
        },
        fillUserImgs: function() {
            console.log('filllllllllll')
            reviewContainer = document.getElementById("myReviewContainer")
            reviewContainer.classList.remove("hide")
            app.currentUserImgs = []
            if (app.currentReviews)
                for (let i = 0; i < app.currentReviews.length; ++i) {
                    app.requestUserInfo(app.currentReviews[i].author)
                }
        },
        requestUserInfo: function(authorId) {
            // let myId = document.getElementById("currentUserId")
            // console.log("HERRRRRRRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEE" + myId.value)
            console.log("MY ID: " + authorId)
            let url = "http://127.0.0.1:8000/apis/v1/user/" + authorId + "/"
            axios.get(url, {}).then(response => {
                console.log(response.data)
                app.currentUserImgs[response.data.pk] = [response.data.avatar, response.data.username]
            }).finally(() => {
                app.$forceUpdate()
            });
        },
        getUserImgs: function(authorId) {
            let currentUserImg = ""
            let url = "http://127.0.0.1:8000/apis/v1/user/" + authorId + "/"

            axios.get(url, {}).then(response => {
                console.log(response.data)
                return parseString(response.data.avatar)
            }).finally(() => {
                console.log('finally')
            });
            return currentUserImg
        },
        getImage: function(id) {
            return this.currentUserImgs[id]
        },
        incRating: function() {
            if (app.reviewNum < 11) {
                ++app.reviewNum
                app.getRatingText(app.reviewNum)
            }
        },
        decRating: function() {
            if (app.reviewNum > 1) {
                --app.reviewNum
                app.getRatingText(app.reviewNum)
            }
        },
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
            app.ratingNumText = ratingsDict[num];
        },
        showInput: function() {
            reviewInput = document.getElementById("reviewInput")
            if (reviewInput.classList.contains('flex')) {
                reviewInput.classList.add('hide')
                reviewInput.classList.remove('flex')
                app.reviewMinimize = "show input"
            } else {
                app.reviewMinimize = "hide input"
                reviewInput.classList.add('flex')
                reviewInput.classList.remove('hide')
            }
        }

    }

})