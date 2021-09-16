# Movie Capstone Proposal :clapper:

This repository contains my capstone project for pdx code guild.

This project will be a movie review application. 

* Primary features to be implemented:
    - [searching for movies](#searching-)
    - [view movie details](#view-movie-details-film_projector)
    - [read/write movie reviews](#data-models-vhs)
    - [custom users with followers](#data-models-vhs)
    
*Secondary/low priority features to be implemented:*
    
    - user direct messaging
    - find movie showtimes
    - movie trailers (youtube api?)
    
## Technologies 🤖
    -Proposed Frameworks/Tools:
        - Python
            - Django
            - Django Rest Framework
            - Pillow
        - Javascript
            - Axios
            - Vue
    
    
## Searching 🔎
Movie data will be requested and obtained from themoviedb api.

The url for this api is: https://developers.themoviedb.org/3/getting-started/introduction

A search will display a list of movies obtained from the api. 

*Searches options will be:*
        
    - by keyword
    - by genre
    - by person
    - TBD..

*Each search result will display:*
    
    - Movie title
    - Movie picture
    - Movie release year
    - Leading cast
    


## View movie details :film_projector:
A detail page for each movie will be viewable. 
*The detail page will contain:*

    - Review input form
    - Average rating
    - Reviews (1 - 11)
    - Release Date
    - Cast
    - Movie image
    - Trailer (or link to trailer)

A list of other possible details can be found on this page:
https://developers.themoviedb.org/3/movies/get-movie-details





## Data Models :vhs:

**Models:**

- CustomUsers:
  - fields
    - profile picture (img field)
    - followers (foreignkey to user)
    - favorite movie (charfield)

- Review:
  - fields
    - Movie title(charfield)
    - Movieid(charfield)(8 digit field from api)
    - Review body (charfield)
    - Review Rating(int field)
    - Author (foreignkey to user)
    - UpVotes (intfield)
    - DownVotes (intfield)

## Schedule

*Week one:*
    
    - ✔️Create Django project with custom users and Review model
    - ✔️Implement one search type
    - ✔️Make a request from movie db api and display data 
    - ✔️Movie detail pages
      
*Week two:*

    - ✔️allow reviews to be:
        - ✔️displayed
        - ✔️added
        - ✔️updated
        - ✔️deleted
    - ✔️add functionality for upvotes/downvotes for reviews
    - list view for recent reviews from people you follow
    - implement other search types

*Week three:*
   
    - frontend polish
    - secondary features(if primary complete)
