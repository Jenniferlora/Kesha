# iKe$ha - Your iTunes for Ke$ha

Ke$ha, musical legend and future nobel laureate, wants to create a website to promote everything Ke$ha.  It has to be $wanky, a little trashy and inspire its users to "wake up feeling like PDiddy".  




![](https://i.giphy.com/3o6ZsTlDN953zedm5q.gif)





## Goals

This assignment will use the super friendly iTunes API and ask you to perform various queries.  You will then take the data returned from those queries and apply it to the front end using your excellent DOM skills.  

You have some starter html, css and JS files but they are basically empty.  You are set up with JQuery.

## Specs:

Ke$ha's website should be one page.  That page should be broken into 3 sections.  The sections are:

1. The first section should render an *unordered list* of all of her albums.  Give this section a header that says "Ke$ha's Albums!" with an 'aqua' background.
2. The second section should render images of her albums *that are not explicit* (gotta protect the children).  Albums that are explicit should not be rendered.  Give this section a header that says "Ke$ha's Kid Friendly Jams" and a background that is 'rebeccapurple'.
3. The third section should return her 5 most recent tracks.  Give this section a header that says "Ke$ha's Latest Hits".
4. Optional - Do you think that the old Ke$ha is still alive somewhere in the new "Kesha" (with no '$')?  Write a haiku expressing your thoughts on this controversial rebranding.
5. Make some pretty CSS!  You can change the background colors of each section, just make sure that each section is distinct.


## Suggested Workflow:

For each problem you should:

1. Visit the [iTunes API documentation](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/) and determine what query parameters you need to get the correct information.
2. Enter the right url with those query parameters into postman to get the right JSON.
3. Recreate that query in an ajax call.
4. Create a function that renders the results from the call.
5. Call that function as the ajax callback to render the results.



## Additional Important Information:

The iTunes API technically doesn't serve data in the JSON format.  It serves JSONP (JSON with Padding) data.  [What's JSONP?](https://en.wikipedia.org/wiki/JSONP).  This isn't a big deal, but it does mean you have to add this line to your ajax call:

```dataType: 'JSONP',```

or things will break.

So after all that, your ajax call might look something like:

```$.ajax({
    method: 'GET',
    url: '//your url',
    dataType: 'JSONP',
    success: function(data){
        console.log(data);
        renderAll(data);
      }
    })
     
```

Then it's just business as usual.  Cool?

## Postman

Postman is a "powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing."

Postman is available as an app and as a chrome extension.
- [Install App](https://www.getpostman.com/)
- [Install Extension](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- [Postman Docs](https://www.getpostman.com/docs/)

Keep in mind that the extension can only run in Chrome. The postman docs recommend installing the native app.


## Homework Submission:

* Homework is due at **11PM** tonight!
* [Follow these instructions to submit your assignment](https://git.generalassemb.ly/wdi-jackalope/jackalope-students/blob/master/HOMEWORK.md)
* [If you need help with your homework, check out the Student Resource Center!](https://git.generalassemb.ly/wdi-jackalope/jackalope-students/blob/master/SRC.md)
