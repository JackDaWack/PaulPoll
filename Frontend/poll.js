     document.addEventListener('DOMContentLoaded', function() {
            const pollForm = document.getElementById('pollForm');
            const addOptionButton = document.getElementById('addOption');
            const pollLink = document.getElementById('pollLink');

            addOptionButton.addEventListener('click', function() {
                const newOption = document.createElement('input');
                newOption.type = 'text';
                newOption.name = 'options[]';
                newOption.required = true;
                pollForm.insertBefore(newOption, addOptionButton);
                pollForm.insertBefore(document.createElement('br'), addOptionButton);
            });

            pollForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(pollForm);
                fetch('/create_poll', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        pollLink.innerHTML = `Poll created! Share this link: <a href="/poll/${data.poll_id}">/poll/${data.poll_id}</a>`;
                    } else {
                        pollLink.textContent = 'Error creating poll. Please try again.';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    pollLink.textContent = 'Error creating poll. Please try again.';
                });
            });

                const voteButtons = document.querySelectorAll('.vote-button');
                voteButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const pollId = this.dataset.pollId;
                        const optionId = this.dataset.optionId;
                    });
                });
            });
