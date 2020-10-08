# About the decisions

## Global authentication context

To simplify the management of user authentication, I used an application-wide authentication context. In this way, it is possible to have the authentication responsibilities all centralized and, at the same time, make important information available to the entire component tree.
One of the advantages of using context is that we don't need to add another dependency, like redux, for example, to have global and / or shared state control.


## React router dependency

It was used for the ease of making internal redirection in the app.


## Integration tests for components only


I understand that we hardly use a single component in an exclusive context. Usually, the construction of components that add value comes from compositions. With this mindset, and reading the lib documentation chosen for the tests, along with several articles by its creator - and on the concept of test trophy - I adopted this strategy for the application.
I don't think there is a need for unit tests for front apps, I understand that each situation needs a different analysis.
One of the things on the TODO list is improving test coverage, too. The callback page is out of time :(


## .env file

The .env file was created so as not to have any sensitive information, such as the connection keys of the Spotify application, for example, circulating through the code and / or browser.
It also assists us in decoupling information from the code, such as consumption URLs from the Spotify APIs and filter, and allows us to have different values per environment.
There is a sample-env file in the root that can be used as an example.

Remembering that sensitive `!==` secret






