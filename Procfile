release: python manage.py migrate.py migrate
web: gunicorn Project.wsgi:application --log-file - --log-level debug
python manage.py collectstatic --noinput
manage.py migrate