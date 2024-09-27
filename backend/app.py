from flask import Flask, request, jsonify
import os
import requests
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
from flask_cors import CORS  # To handle CORS issues

app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin (you can restrict it if necessary)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# # Determine if we're in production or development
# ENV = os.getenv("FLASK_ENV", "development")  # Get environment variable, default to development

# if ENV == "production":
#     # For production, allow only requests from your production domain
#     CORS(app, resources={r"/*": {"origins": "https://yourproductiondomain.com"}})
# else:
#     # For development, allow requests from localhost
#     CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Function to remove background using OpenCV
def remove_background(image_url):
    # Download image from the URL
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    # Convert the image to an OpenCV format (RGB to BGR for OpenCV)
    open_cv_image = np.array(img)
    open_cv_image = open_cv_image[:, :, ::-1].copy()

    # Convert to grayscale
    gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)

    # Use a threshold to create a mask for the background
    _, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY)

    # Invert the mask to keep the foreground
    mask = cv2.bitwise_not(thresh)

    # Remove the background by applying the mask
    result = cv2.bitwise_and(open_cv_image, open_cv_image, mask=mask)

    # Make the background transparent
    result = cv2.cvtColor(result, cv2.COLOR_BGR2BGRA)
    result[:, :, 3] = mask  # Set the alpha channel based on the mask

    return result

# Function to save the image
def save_image(image, path):
    # Save the resulting image as PNG
    cv2.imwrite(path, image)

@app.route('/remove-bg', methods=['POST'])
def remove_background_api():
    data = request.get_json()
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image URL provided"}), 400

    # Always save to app/shoe/shoe.png
    output_directory = "../public/shoe"
    output_path = os.path.join(output_directory, "shoe.png")

    try:
        # Ensure the directory exists
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)

        # Call the function to remove the background
        result_image = remove_background(image_url)

        # Save the processed image
        save_image(result_image, output_path)

        return jsonify({
            "message": "Background removed successfully",
            "output_image": "/shoe/shoe.png"  # Always return the same relative path
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
