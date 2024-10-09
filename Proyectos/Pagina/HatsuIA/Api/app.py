from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Iniciar la aplicación
print("Iniciando la aplicación...")
app = Flask(__name__)
CORS(app)  # Habilitar CORS

# Cargar el modelo GPT-2
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")  # Cambiar a "distilgpt2" para un modelo más ligero
model = GPT2LMHeadModel.from_pretrained("gpt2")  # Cambiar a "distilgpt2" si es necesario

def obtener_respuesta(texto_usuario):
    try:
        # Tokenizar la entrada del usuario
        inputs = tokenizer.encode(texto_usuario, return_tensors='pt')
        
        # Generar respuesta
        outputs = model.generate(inputs, max_length=150, num_return_sequences=1)
        respuesta = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return respuesta.strip()
    except Exception as e:
        print(f"Ocurrió un error al obtener la respuesta: {e}")
        return "Error al generar respuesta."

@app.route('/hatsu', methods=['POST'])
def hatsu():
    print("Endpoint /hatsu llamado")
    datos = request.get_json()
    input_usuario = datos.get('input')

    if input_usuario:
        respuesta_ia = obtener_respuesta(input_usuario)
        return jsonify({'response': respuesta_ia})
    else:
        return jsonify({'response': 'No se recibió entrada válida.'}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
