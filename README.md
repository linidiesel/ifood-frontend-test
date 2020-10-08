# iFood Frontend Test

Create a web application called Spotifood used to display the preferred playlists from iFood's customers. The web application has only one page:
* A page that lists the featured playlists at Spotify according to some criteria.

## Business rules

* The page is composed of two components:
    * One list of featured playlists
    * One filter component with API filter fields and one local search text input to filter the playlists by "name".

* The filter component should be used to filter the elements displayed by the list of featured playlists.
* The API filter fields and their possible values/type should be mounted by consuming this API **[1. Playlists Filters]** (http://www.mocky.io/v2/5a25fade2e0000213aa90776)
* The featured playlists to be displayed should be consumed from this API **[2. See the documentation from Spotify]** (https://developer.spotify.com/web-api/get-list-featured-playlists/)
* Every time the user change any information on the filter component, the list should be refresh accordingly. In case of API filter field change you should recall the playlists API with the filter parameters every time.
* Considering that we live in a chaotic and fast-changing world, the page should refresh its content every 30 seconds, to see if any information from the Spotify APIs had been changed.

## Hints or Constraints

We will use one API from Spotify Web API. You should follow the Spotify guide in order to create a token needed to access Spotify's API.
To mount the API filter fields on the filter component, you **must** consume the API that provides the metadata about the fields (Link 1).
You could use Material UI, Bootstrap or any other toolkit to accelerate your resolution. We will not provide any UI prototype or design.

## Non functional requirements

As this application will be a worldwide success, it must be prepared to be accessible, responsive, fault tolerant and resilient.
We **strongly recommend** using React to build the application.
Also, briefly elaborate on your solution architecture details, choice of patterns and frameworks.
Fork this repository and submit your code.

## Instalation guide

Requirements:
* Node > 10
* Docker - if you want the application running in a container

**1. Creating your `.env` file**

The project has a `sample.env` file that contains the format of the environment variables expected by the application. Use these sample variables to create your `.env` file in the projects root folder.

_This step is essential for the execution of the project._

**2. Configure your spotify app**

Configure your spotify app callback to `<host:port>/callback`

**3. Running the tests**

execute: `npm test`

The current test coverage is low. :(
This is the point of more attention to me.

**4. Runnign the project**

_**local**_

after the `npm i` command, you should run:` npm start`.
The project will be available in the PORT variable configured on .env file

_**In a container**_

run the command: `npm run docker: build`

then run: `npm run docker: start`

Note that both the container exposure port and the port that I direct are 3001, and this information needs to be in accordance with the `.env` file.


**General notes**

Its possible that is a CORS related problem that was not prioritized in development. I suggest, in a palliative way, that you enable some CORS plugins. =x

This bug will be fixed in the future.


## Licence

This app was created using `create-react-app` cli. [See more about the licence](https://github.com/facebook/create-react-app/).

## Author

[Aline Diesel](https://github.com/alineDiesel)

This code is in a different repository, compared to the link, cause I lost the password and the recovery process takes time. (:


I hope you enjoy.


