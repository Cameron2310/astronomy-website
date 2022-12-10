from apscheduler.schedulers.background import BackgroundScheduler
import website.apis.daily_photo_API as api


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(api.save_image, "interval", hours=23,
                      id="photo_001", replace_existing=True)
    scheduler.start()
