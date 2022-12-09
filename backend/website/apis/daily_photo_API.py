from random import randrange
from dotenv import load_dotenv
import os
import requests
from website.models import *

load_dotenv()


def get_daily_image():

    def get_random_date():
        day = randrange(1, 28)
        month = randrange(1, 13)
        year = randrange(2010, 2023)
        random_date = f"{year}-{month}-{day}"

        return random_date

    random_date = get_random_date()
    url = f"https://api.nasa.gov/planetary/apod?&api_key={os.environ['api_key']}"
    request = requests.get(url)
    response = request.json()

    print(response)

    while response['media_type'] != 'image':
        url = f"https://api.nasa.gov/planetary/apod?date={random_date}&api_key={os.environ['api_key']}"
        request = requests.get(url)
        response = request.json()

    return response


def save_image():
    image = get_daily_image()

    new_image = Images.objects.create(
        title=image['title'], date=image['date'], explanation=image['explanation'], url=image['url'])
    new_image.save()

    return new_image
