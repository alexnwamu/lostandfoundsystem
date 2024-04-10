from flask import Flask, request, jsonify
import email_script

app = Flask(__name__)


@app.route("/send_emails", methods=["POST"])
def send_emails():
    try:
        email_script.button_clicked()
        return jsonify({"message": "Emails sent sucessfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
  

if __name__ == "__main__":
    app.run(debug=True, port=5000)