# Smalltalk for LATEST Rasa Stack

Smalltalk for Rasa Stack has casual conversation data which can be used with Rasa Core and Rasa NLU as an add on to an existing training data.

# Installation Requirements
```pip install -r requirements.txt```
```source ./venv/bin/activate```

# Get weights 
Get weights for the models from [here]() and put them into ```models`` directory.

# Start Rasa action Server
```rasa run actions```

# Start and run the chatbot
``` rasa run -m models --endpoints endpoints.yml --port 5002 --credentials credentials.yml```

# Usage
[Local testing of chatbot on the server]
```python3 chatbot.py```
