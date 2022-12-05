from random import randrange
import requests
from website.models import *


def get_daily_images():
    API_KEY = ''
    images = []

    def get_random_date():
        day = randrange(1, 32)
        month = randrange(1, 13)
        year = randrange(2010, 2023)
        random_date = f"{year}-{month}-{day}"

        return random_date

    for i in range(5):
        random_date = get_random_date()
        url = f"https://api.nasa.gov/planetary/apod?date={random_date}&api_key={API_KEY}"

        request = requests.get(url)
        response = request.json()
        print(response)

        while response['media_type'] != 'image':
            url = f"https://api.nasa.gov/planetary/apod?date={random_date}&api_key={API_KEY}"
            request = requests.get(url)
            response = request.json()

        images.append(response)

    return images


def update_images():
    images = get_daily_images()

    for i in range(len(images)):
        new_image = Images.objects.create(
            title=images[i]['title'], date=images[i]['date'], explanation=images[i]['explanation'], url=images[i]['url'])
        new_image.save()
