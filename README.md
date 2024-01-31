# GP Search

GP Search is a web app that shows doctors nearby a location. The app is implemented using a Koa backend and a React frontend, both written in Typescript.

To run both the frontend and backend, you must have Node and Yarn installed. Run `yarn install` and then `yarn start` in the root of the repo. You can now access the web app at [http://localhost:1234/](http://localhost:1234/).

Once you have the app running and understand the codebase, it would be great if you could work through the stages of this technical challenge below.

Your answers will form the basis for our discussions during the technical interview stage.

Please do not spend any more than two hours on this challenge.

## Stage 1 - Implementing Changes

Detail how you would implement the product changes below.

_You can demonstrate your approach to implementing these changes by making changes to the codebase or writing a description of how you would implement each change. Please include details of both the code involved and any changes to the user experience._

1. Display doctors near the end user's current location. The app currently only displays doctors near central Glasgow.

2. Display 100 nearby doctors. The app currently only displays 20 doctors.

3. Add a list view of the doctors to be displayed alongside the map. Clicking on a doctor in the list should highlight the doctor on the map and vice versa.

## Stage 2 - Developer Experience

Briefly answer the following questions (a few bullet points or high level answer):

1. From a technical perspective, what would you change in the current implementation of this app? What improvements would you make?
   Answer - I would improve rendering of the GMap component by including a loading state that will notify the user on errors and data availability,
   I would also include layouts that adapt to both mobile and tablet devices,
   I would use use redux for better state management and prediction,
   I would also like to code split the GMap Icon as an individual component or file to reduce code saturation and allow better debuggging of components

2. If you built this app from scratch, what tools would you use, and why?
   Answer - I would use the following:

- React : it provides inbuilt methods or functions for state management and local storage
- Node : it provides a great way to implement API routes, validate services and authorise data access that integrates with React Front end
- Tailwind CSS : for Flexible Styling that provides a way to adapt component layouts to web and mobile views
- Playwright : Allows End to End Testing of react front end with node database services like mongodb or postgres
- GCP : allow connection and implementation of Google map services with protection options for the application
- MongoDB: MongoDb allows scalable storage for larger applications, easier schema manipulation
  -Typescript : for type validations, error checking and better readabliity of data and functions

3. What technology are you most excited about right now?
   -React ,Node, NextJs , GraphQl, AWS, MongoDb, Postgres, TailWind / Headless UI, React Native
4. What is "good code" to you?

- A good code consist of reusable components and functions
- A good code should have a good way to test and handle errors
- A good code should be easy to read and understand with appropriate format and naming conventions
- A good code should have comments and documentation that allows other developers understand the code
- A good code implements secure abstraction to senstive data
- A good code should always include necessary components
- A good code should always seek optimal rendering of components to improve performance

## Stage 3 - Extending the Product

Briefly answer the following questions (a few bullet points or high level answer):

1. Given a user can find doctors nearby to their location, what other functionality would you add to the application to make it useful to real users?

- I would also love to include the openings time and closing times of each GP location and manage their states in real time
  -I would include a search component that would allow the user find doctors by location or name

2. As our user base grows, using Google's APIs will have an associated running cost. How could we reduce the number of API calls we are making to keep running costs low?

- Through caching of data to reduce request & payload with similar responses
- By adding authentication services to control app sessions to restrict application request to authorised users
