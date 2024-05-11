
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const askButton = document.getElementById('askButton');
    
    const wrestlerOne = document.getElementById('wrestlerOne').value;
    const wrestlerTwo = document.getElementById('wrestlerTwo').value;

    // const questionInput = document.getElementById('questionInput');
    
    const answerDiv = document.getElementById('answerDiv');
    const copyButton = document.getElementById('copyButton'); 

    askButton.addEventListener('click', function() {
        const prompt = `Please create a play by play recap of a professional wrestling match between ${wrestlerOne} and ${wrestlerTwo}. Please write it as if it were a multi-paragraph recap in a review of the show it was on.`;
        console.log(prompt);
        /*fetch('/api/query', {
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
            answerDiv.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            answerDiv.textContent = 'Failed to load response. ' + error.message;
        });*/
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
