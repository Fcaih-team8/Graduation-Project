document.addEventListener("DOMContentLoaded", function () {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbox = document.getElementById("chatbox");
    const closeChatbotButton = document.getElementById("close-chatbot");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatboxBody = document.querySelector(".chatbox-body");

    // Function to add a message to the chatbox
    function addMessage(text, sender) {
        const messageElement = document.createElement("p");
        messageElement.textContent = text;
        if (sender === "user") {
            messageElement.style.textAlign = "right";
            messageElement.style.color = "blue";
        } else {
            messageElement.style.textAlign = "left";
            messageElement.style.color = "green";
        }
        chatboxBody.appendChild(messageElement);
        chatboxBody.scrollTop = chatboxBody.scrollHeight; // Scroll to bottom
    }

    // Function to fetch and display questions
    function loadQuestions() {
        fetch("/chatbot/get_questions/")
            .then(response => response.json())
            .then(data => {
                if (data.questions && data.questions.length > 0) {
                    // Clear previous messages or questions if any, except initial bot message
                    // chatboxBody.innerHTML = ""; // Clear existing content - We want to keep the conversation
                    // We will only add the question list if it's not already there or if explicitly requested
                    // For now, let's assume we only load questions once when the chatbox opens, or if a "show questions" button is pressed.
                    
                    // Check if questions are already loaded to avoid duplication
                    if (chatboxBody.querySelector(".questions-list-container")) {
                        return; // Questions already loaded
                    }

                    const questionsListContainer = document.createElement("div");
                    questionsListContainer.className = "questions-list-container";

                    const introMessage = document.createElement("p");
                    introMessage.textContent = "Bot: Please select a question from the list below:";
                    questionsListContainer.appendChild(introMessage);

                    const questionsList = document.createElement("ul");
                    questionsList.style.listStyleType = "none";
                    questionsList.style.padding = "0";
                    data.questions.forEach(questionText => {
                        const listItem = document.createElement("li");
                        listItem.textContent = questionText;
                        listItem.style.cursor = "pointer";
                        listItem.style.padding = "8px";
                        listItem.style.borderBottom = "1px solid #eee";
                        listItem.addEventListener("click", function () {
                            // Remove the questions list after selection to keep chat clean
                            if(questionsListContainer.parentNode) {
                                questionsListContainer.parentNode.removeChild(questionsListContainer);
                            }
                            handleQuestionSelection(questionText);
                        });
                        questionsList.appendChild(listItem);
                    });
                    questionsListContainer.appendChild(questionsList);
                    chatboxBody.appendChild(questionsListContainer);
                    chatboxBody.scrollTop = chatboxBody.scrollHeight;

                } else if (data.error) {
                    addMessage("Bot: Error loading questions - " + data.error, "bot");
                } else {
                    addMessage("Bot: No questions available at the moment.", "bot");
                }
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
                addMessage("Bot: Sorry, something went wrong while loading questions.", "bot");
            });
    }

    // Toggle chatbox visibility and load questions
    chatbotIcon.addEventListener("click", function () {
        if (chatbox.style.display === "none" || chatbox.style.display === "") {
            chatbox.style.display = "flex";
            // Clear chat body except for initial greeting if any, then load questions
            // This ensures questions are re-loaded if chat was closed and reopened
            const initialBotMessage = chatboxBody.querySelector("p:first-child"); // Example: keep first greeting
            // chatboxBody.innerHTML = ""; // Clear previous content
            // if (initialBotMessage) chatboxBody.appendChild(initialBotMessage);
            loadQuestions(); // Load questions when chatbox opens
        } else {
            chatbox.style.display = "none";
        }
    });

    // Close chatbox when close button is clicked
    closeChatbotButton.addEventListener("click", function () {
        chatbox.style.display = "none";
    });

    // Function to handle question selection
    function handleQuestionSelection(questionText) {
        addMessage("You: " + questionText, "user");
        // Send question to backend
        fetch("/chatbot/get_answer/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: questionText }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.answer) {
                addMessage("Bot: " + data.answer, "bot");
            } else if (data.error) {
                addMessage("Bot: Error - " + data.error, "bot");
            }
            // REMOVED: setTimeout(loadQuestions, 2000); // This line was causing questions to reload and clear the chat
            // Now, the conversation will persist. 
            // Consider adding a button or command to show questions again if needed.
        })
        .catch(error => {
            console.error("Error fetching answer:", error);
            addMessage("Bot: Sorry, something went wrong. Please try again.", "bot");
        });
    }

    // Handle sending a message via input (can be kept for direct input or removed)
    chatbotInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && chatbotInput.value.trim() !== "") {
            const questionText = chatbotInput.value.trim();
            // Remove the questions list if present, as user is typing
            const questionsListContainer = chatboxBody.querySelector(".questions-list-container");
            if(questionsListContainer && questionsListContainer.parentNode){
                questionsListContainer.parentNode.removeChild(questionsListContainer);
            }
            handleQuestionSelection(questionText); // Use the same handler
            chatbotInput.value = "";
        }
    });
});
