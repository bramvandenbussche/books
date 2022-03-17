(function() {

    var lunrIdx = null;

    function displaySearchResults(results, store) {
        var noResultsDiv = document.getElementById('search-no-results');
        var searchResultsWrapper = document.getElementById('search-results-wrapper');
        var resultsCountSpan = document.getElementById('result-count');

        resultsCountSpan.innerHTML = results.length;

        if (results.length) { // Are there any results?
            noResultsDiv.style.display = "none"
            searchResultsWrapper.style.display = "block"
            
            var appendString = '<div class="posts-wrap cf">'
                                    
    

            for (var i = 0; i < results.length; i++) {  // Iterate over the results
                var item = store[results[i].ref];

                appendString += '<div class="col-2 cf">' +
                                    '<article class="grid-post post type-post format-standard has-post-thumbnail">' +
                                        '<div class="post-header cf">' +
                                            '<div class="post-thumb">' +
                                                '<a href="' + item.url + '" class="image-link">' +
                                                    '<img src="' + item.cover + '"' +
                                                        'class="attachment-large size-large wp-post-image"' +
                                                        'alt="' + item.author + ' – ' + item.title + '"' +
                                                        'title="' + item.author + ' – ' + item.title + '" />' +
                                                '</a>' +
                                            '</div>' +
                                    
                                            '<div class="meta-title">' +
                                                '<div class="post-meta post-meta-a">' +
                                                    '<span class="post-cat">' + item.author + '</span>' +
                                                    '<h2 class="post-title-alt">' +
                                                        '<a href="' + item.url + '">' +
                                                        item.title +
                                                        '</a>' +
                                                    '</h2>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div><!-- .post-header -->' +                                    
                                    '</article>' +
                                '</div>'
            }

            appendString += '</div>';

            searchResultsWrapper.innerHTML = appendString;
        } else {
            
            noResultsDiv.style.display = block;
            searchResultsWrapper.style.display = none;
        }
    }
  
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
  
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
  
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function initialiseIndex() {        
        console.info("building full text index");

        // TODO: get index data from json file on server

        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        lunrIdx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('category');
            this.field('content');
            this.field('cover');

            for (var key in window.store) { // Add the data to lunr
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'author': window.store[key].author,
                    'category': window.store[key].category,
                    'content': window.store[key].content,
                    'cover': window.store[key].cover
                });
            }
        });        
    }
    
    initialiseIndex();
  
    var searchTerm = getQueryVariable('query');
  
    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);
        document.getElementById('search-term').innerHTML = searchTerm;

        var results = lunrIdx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store);
    }

    
  })();
  