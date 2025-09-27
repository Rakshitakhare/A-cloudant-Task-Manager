from flask import Flask, jsonify, request
from flask_cors import CORS
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Cloudant setup
client = Cloudant.iam(
    account_name=os.getenv("CLOUDANT_USERNAME"),
    api_key=os.getenv("CLOUDANT_APIKEY"),
    url=os.getenv("CLOUDANT_URL"),
    connect=True
)

db_name = os.getenv("CLOUDANT_DB", "tasks")
if db_name not in client.all_dbs():
    db = client.create_database(db_name)
else:
    db = client[db_name]


def now_iso():
    return datetime.utcnow().isoformat() + "Z"


@app.route("/api/tasks", methods=["GET"])
def list_tasks():
    docs = []
    for doc in db:
        data = doc
        data["_id"] = doc["_id"]
        docs.append(data)
    return jsonify(docs)


@app.route("/api/tasks/<task_id>", methods=["GET"])
def get_task(task_id):
    try:
        doc = db[task_id]
        return jsonify(doc)
    except KeyError:
        return jsonify({"error": "Task not found"}), 404


@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.json or {}
    if not data.get("title"):
        return jsonify({"error": "Title required"}), 400

    task = {
        "title": data["title"],
        "description": data.get("description", ""),
        "status": data.get("status", "todo"),
        "priority": data.get("priority", "medium"),
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }

    new_doc = db.create_document(task)
    return jsonify(new_doc), 201


@app.route("/api/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    try:
        doc = db[task_id]
    except KeyError:
        return jsonify({"error": "Task not found"}), 404

    data = request.json or {}
    for f in ("title", "description", "status", "priority"):
        if f in data:
            doc[f] = data[f]
    doc["updated_at"] = now_iso()
    doc.save()

    return jsonify(doc)


@app.route("/api/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        doc = db[task_id]
        doc.delete()
        return jsonify({"ok": True})
    except KeyError:
        return jsonify({"error": "Task not found"}), 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
