from apscheduler.schedulers.background import BackgroundScheduler
import website.apis.daily_photo_API as api


def start():
    print("Scheduler called ...")
    scheduler = BackgroundScheduler()
    scheduler.add_job(api.save_image, "interval", minutes=2,
                      id="photo_001", replace_existing=True)
    scheduler.start()
