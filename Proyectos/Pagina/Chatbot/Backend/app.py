import random
from flask import Flask, render_template, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

app = Flask(__name__)

# Base de datos de intenciones y respuestas
intents = {
    "saludo": ["hola", "buenos días", "qué tal", "hey"],
    "despedida": ["adiós", "hasta luego", "nos vemos", "chau"],
    "soporte": ["necesito ayuda", "soporte técnico", "problema con", "asistencia"],
    "producto": ["consulta sobre producto", "información sobre", "precios de", "detalles de"]
}

# Respuestas predefinidas para cada intención
responses = {
    "saludo": ["Hola! ¿En qué puedo ayudarte?", "¡Bienvenido! ¿Cómo te ayudo hoy?"],
    "despedida": ["Adiós, que tengas un buen día!", "¡Hasta luego, gracias por tu visita!"],
    "soporte": ["Claro, ¿cuál es el problema técnico que tienes?", "Déjame saber en qué puedo ayudarte con soporte técnico."],
    "producto": ["Aquí tienes información sobre nuestros productos.", "Puedo ayudarte con detalles de nuestros productos o precios."]
}

# Crear un conjunto de datos para el modelo
training_data = []
training_labels = []

for intent, keywords in intents.items():
    for keyword in keywords:
        training_data.append(keyword)
        training_labels.append(intent)

# Crear el modelo de clasificación
model = make_pipeline(CountVectorizer(), MultinomialNB())

# Ajustar el modelo con los datos de entrenamiento
model.fit(training_data, training_labels)

# Función para identificar la intención
def predict_intent(user_input):
    user_input = [user_input]  # El modelo espera una lista
    predicted_intent = model.predict(user_input)[0]
    return predicted_intent

@app.route('/')
def index():
    return render_template('proyecto2.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    intent = predict_intent(user_input)
    
    if intent in responses:
        response_message = random.choice(responses[intent])
    else:
        response_message = "Lo siento, no entiendo tu consulta. ¿Podrías reformularla?"
    
    return jsonify({'response': response_message})

if __name__ == "__main__":
    app.run(debug=True)
