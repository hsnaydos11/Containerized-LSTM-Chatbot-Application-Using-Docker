import json
import numpy as np
import pickle
import random
from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS
from flask import Response

# Flask uygulamasını başlat
app = Flask(__name__)

# CORS'u etkinleştir, sadece React frontend için izin ver
CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})  # React frontend URL'ini ekleyin

# Modeli ve dönüştürücüleri yükle
model = keras.models.load_model('chat_model.h5')

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

with open('label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

with open("dataset.json") as file:
    data = json.load(file)

max_len = 30

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message", "")
    
    if not user_input:
        return jsonify({"error": "Boş mesaj gönderildi"}), 400

    # Kullanıcı mesajını modele uygun hale getir
    result = model.predict(pad_sequences(tokenizer.texts_to_sequences([user_input]), truncating='post', maxlen=max_len))
    tag = lbl_encoder.inverse_transform([np.argmax(result)])[0]

    # Uygun yanıtı bul
    response = "Üzgünüm, bunu anlayamadım."
    for intent in data['intents']:
        if intent['tag'] == tag:
            response = random.choice(intent['responses'])
            break

    print(f"User: {user_input}, Chatbot: {response}")

    return Response(
        json.dumps({"response": response}),
        mimetype='application/json',
        status=200,
        headers={"Content-Type": "application/json; charset=utf-8"}
    )

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
