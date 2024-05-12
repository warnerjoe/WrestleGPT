// script.js
document.addEventListener('DOMContentLoaded', function() {
    const askButton = document.getElementById('askButton');
    
    const wrestlerOne = document.getElementById('wrestlerOne');
    const wrestlerTwo = document.getElementById('wrestlerTwo');  
    const answerDiv = document.getElementById('answerDiv');
    const copyButton = document.getElementById('copyButton'); 

    askButton.addEventListener('click', function() {
        const prompt = `Please create a play by play recap of a professional wrestling match between ${wrestlerOne.value} and ${wrestlerTwo.value}. Please write it as if it were a multi-paragraph recap in a review of the show it was on, and write the paragraphs using proper HTML markup.`;
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

    // Event listener for the copy button
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
});
