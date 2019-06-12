export default  function drawCloudExample()
{               
            //Some sample data - http://en.wikiquote.org/wiki/Opening_lines
            var words = [
                "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
                "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
                "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
                "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
            ]
            
            //Prepare one of the sample sentences by removing punctuation,
            // creating an array of words and computing a random size attribute.
            function getWords(i) {
                console.log("*********",words[i]);
                return words[i]
                        .replace(/[!\.,:;\?]/g, '')
                        .split(' ')
                        .map(function(d) {
                            return {text: d, size: 10 + Math.random() * 60};
                        })
            }
            
            
            //This method tells the word cloud to redraw with a new set of words.
            //In reality the new words would probably come from a server request,
            // user input or some other source.
            function showNewWords(vis, i) {
                i = i || 0;
            
                vis.update(getWords(i ++ % words.length))
                setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
            }
            
            //Create a new instance of the word cloud visualisation.
            var myWordCloud = wordCloud('body');
            
            //Start cycling through the demo data
            showNewWords(myWordCloud);
            
}
