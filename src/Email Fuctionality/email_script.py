import pymongo
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import dotenv_values


# Load environment variables
config = dotenv_values(".env") 

# SMTP server configuration
smtp_server = config.get("SMTP_SERVER")
smtp_port = config.get("SMTP_PORT")
smtp_username = config.get("SMTP_USERNAME")
smtp_password = config.get("SMTP_PASSWORD")

# MongoDB connection string
mongo_uri = config.get("DATABASE_URL")

# Function to send email
def send_email(to_email, subject, message):
    # Create message container
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = to_email
    msg['Subject'] = subject

    # Add message body
    msg.attach(MIMEText(message, 'plain'))

    # Connect to SMTP server and send email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_username, to_email, msg.as_string())


def get_user_emails():
    try:
        # Connect to MongoDB
        client = pymongo.MongoClient(mongo_uri)
        db = client.users  # Database name 

        # Access the User collection
        user_collection = db["User"]

        # Fetch only the email field from User collection
        user_emails = user_collection.find({}, {"email": 1}) 

        emails = [user["email"] for user in user_emails]

        return emails

    except Exception as e:
        print("Error:", e)
        return []


def send_emails_to_users():
    user_emails = get_user_emails()
    subject = "Campus Lost & Found Items System"
    message = "A new item has been added to the system!"
    
    for email in user_emails:
        send_email(email, subject, message)


def button_clicked():
    send_emails_to_users()
    print("Emails sent successfully!")