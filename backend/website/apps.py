from django.apps import AppConfig


class WebsiteConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'website'

    def ready(self):
        print("starting scheduler...")
        from website.apis import photo_scheduler
        photo_scheduler.start()
