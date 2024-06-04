# 📖 Implement Middleware Function for User Authentication

Work with a group to implement the following user story:

* As a developer, I want to write my own middleware to check for user authentication.

## Acceptance Criteria
:ballot_box_with_check: 
GIVEN a CMS-style blog site
WHEN I visit the site for the first time THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option THEN I am taken to the homepage
WHEN I click on any other links in the navigation THEN I am prompted to either sign up or sign in
WHEN I choose to sign up THEN I am prompted to create a username and password
WHEN I click on the sign-up button THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in THEN I am prompted to enter my username and password
WHEN I am signed in to the site THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation THEN I am signed out of the site
WHEN I am idle on the site for more than a set time THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

## 📝 Notes

Refer to the documentation:

[Express.js documentation on using middleware](https://expressjs.com/en/guide/using-middleware.html)

---

## 💡 Hints

How can you keep the current logic being used in the routes to check whether a user is logged in or not and rewrite it as a middleware function? Where can you write the code for the custom middleware so that it is separate but accessible from the routes? (Where did you put the custom helper functions?)

## 🏆 Bonus

If you have completed this activity, work through the following challenge with your group to further your knowledge:

* What other middleware do developers use with Express.js?

Use [Google](https://www.google.com) or another search engine to research this.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
