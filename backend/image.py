import cv2
import numpy as np
import requests
from io import BytesIO
from PIL import Image

def remove_background(image_url):
    # Download image from the URL
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    # Convert the image to an OpenCV format
    open_cv_image = np.array(img)
    open_cv_image = open_cv_image[:, :, ::-1].copy()  # Convert RGB to BGR

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

def save_image(image, path):
    # Save the resulting image
    cv2.imwrite(path, image)

# Example usage:
image_url = 'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg'
output_path = 'output_image.png'
image = remove_background(image_url)
save_image(image, output_path)
print(f"Image saved to {output_path}")
