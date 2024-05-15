document.addEventListener('DOMContentLoaded', function() {
    const askButton = document.getElementById('askButton');
    const wrestlerOne = document.getElementById('wrestlerOne');
    const wrestlerTwo = document.getElementById('wrestlerTwo');
    const matchGimmick = document.getElementById('matchGimmick');
    const answerDiv = document.getElementById('answerDiv');
    const copyButton = document.getElementById('copyButton');
    const autocompleteDropdown = document.getElementById('autocompleteDropdown');

    function generatePrompt() {
        return `
            I already have an HTML container with an ID of right-side, and I need you to create its innerHTML.
            I want to create a review for a professional wrestling match between ${wrestlerOne.value} and ${wrestlerTwo.value}.  
            The gimmick of this wrestling match will be ${matchGimmick.value}.
            The review should be written in the tone of a wrestling blogger. 
            The review will give a star rating from 0 to 5 stars, in .25 star increments.  
            Most matches should be 2 or 3 stars, but on very rare occasions more.
            
            It should be five very detailed paragraphs.  
            Center all of the text horizontally.
            Make sure all paragraphs reflect the rules of the ${matchGimmick.value} match.
            The first paragraph will recap why the two wrestlers are fighting. 
            The next three paragraphs will give a recap of the beginning, middle, and end of the match. 
            Specify how the match ends including the final move of the match.  
            These should be detailed, contain descriptions of high points of the match, and be unopinionated.
            The last paragraph will be the reviewer's opinion of the match.  
            It will reflect the star rating and should be very opinionated.
            
            In HTML, I need an H1 containing a creative headline based on the match that does not contain the wrestlers' names.
            An H4 with no label that is in the format of ${wrestlerOne.value} vs. ${wrestlerTwo.value}.
            Five black Font-Awesome star icons.  
            They should reflect the star rating from the review, and if the rating is less than 5, any excess stars should be empty.
            An H6 containing Star Rating: Numeric Value.
            
            Five paragraphs containing the review of the match.  
            None of the paragraphs should have labels.  They should all be detailed and contain at least 5 sentences.
            An H3 displaying who won the match with the structure Winner: Name.
            
            All of the contents should be centered horizontally and have word wrap.
            
            Return only HTML plain text format without \`\`\`html.  Do not include any statements before or after the HTML.
        `;
    }

    askButton.addEventListener('click', function() {
        const prompt = generatePrompt();

        fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            answerDiv.innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            answerDiv.textContent = 'Failed to load response. ' + error.message;
        });
    });

    copyButton.addEventListener('click', function() {
        if (answerDiv.textContent) {
            navigator.clipboard.writeText(answerDiv.textContent)
                .then(() => {
                    console.log('Text copied to clipboard');
                })
                .catch(err => {
                    console.error('Error in copying text: ', err);
                });
        }
    });

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentNode.classList.add('active');
        }
    });

    wrestlerOne.addEventListener('input', async function() {
        const inputValue = this.value;
        
        try {
            const response = await fetch(`/searchone?ringName=${encodeURIComponent(inputValue)}`);
            const data = await response.json();
            
            autocompleteDropdown.innerHTML = ''; // Clear previous autocomplete suggestions
            
            data.forEach(wrestler => {
                const link = document.createElement('a');
                link.href = '#';
                link.classList.add('autocomplete-link');
                link.textContent = wrestler.ringName;
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    wrestlerOne.value = wrestler.ringName;
                    autocompleteDropdown.style.display = 'none';
                });
                autocompleteDropdown.appendChild(link);
            });
            
            autocompleteDropdown.style.display = 'block';
        } catch (error) {
            console.error(error);
            // Handle error
        }
    });

    autocompleteDropdown.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            const selectedName = event.target.textContent;
            wrestlerOne.value = selectedName;
            autocompleteDropdown.style.display = 'none';
        }
    });
});