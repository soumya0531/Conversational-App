# Smalltalk using Rasa Stack

## Installation Requirements
```pip install rasa --use-feature=2020-resolver```

## Get weights 
Get weights for the models from [here](https://drive.google.com/file/d/114stIsajdSPBYEPk7xo-ErXnZwUl8mmY/view?usp=sharing) and put them into ```bot/models``` directory.

## Start Rasa action Server
```rasa run actions```

## Start and run the chatbot
```cd bot/```

``` rasa run -m models --endpoints endpoints.yml --port 5002 --credentials credentials.yml```

## Usage
[Test chatbot running on the server]

```python3 chatbot.py```
