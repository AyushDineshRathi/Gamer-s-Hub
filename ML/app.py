from flask import Flask, request, jsonify
import numpy as np
from joblib import load

# Initialize Flask app
app = Flask(__name__)

# Load the similarity model
loaded_model = load('similarity.joblib')

@app.route('/get_similar_ids', methods=['POST'])
def get_similar_ids():
    # Get the ID from the request
    data = request.json
    input_id = data.get('id')

    if input_id is None:
        return jsonify({'error': 'ID is required'}), 400

    # Ensure the input ID exists in the model (assuming the model is a similarity matrix)
    try:
        input_id = int(input_id)
    except ValueError:
        return jsonify({'error': 'ID must be an integer'}), 400
    
    if input_id < 0 or input_id >= len(loaded_model):
        return jsonify({'error': 'ID is out of bounds'}), 400

    # Get the similarity scores for the given ID
    similarity_scores = loaded_model[input_id]

    # Get the indices of the 5 most similar items (excluding the item itself)
    similar_indices = np.argsort(similarity_scores)[::-1]  # Sort in descending order
    top_5_similar = [int(idx) for idx in similar_indices if idx != input_id][:5]

    # Return the top 5 similar IDs as a JSON response
    return jsonify({'input_id': input_id, 'similar_ids': top_5_similar})

if __name__ == "__main__":
    app.run(debug=True)