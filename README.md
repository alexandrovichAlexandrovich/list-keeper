# list-keeper

list-keeper is a simple front-end application to store and manipulate lists.
Hit enter to submit a text or search field, and use the buttons to navigate and move
lists around.

This approach stores lists in JSON format in AppComponent and uses event emitters
from the child ListComponents to manipulate them.  

## Project Structure

* `src/app` contains the templates, styles, and scripts for the app's components.
* `src/app/app.component.*` contains the main app module.
* `src/app/list/list.component.*` contains the component used for each individual list.
* `src/app/list-form/list-form.component.*` contains the dynamic text field component used in several places in the app. 

## Build and deploy for testing (Angular)

To run, make sure to first install Angular 2+.

`brew install angular`

From the parent directory, run `ng build` to build the project. Then, run `ng serve` to test on a dev server.

If you have `npm` installed and would rather run through Node, use the following commands from the main directory:

`npm install angular`

`npm run ng serve`


Navigate to `http://localhost:4200/` in a browser of your choice. The app will automatically reload if you change any of the source files.

## Compatibility

Tested with up-to-date versions of Chrome, Firefox, and Safari.


