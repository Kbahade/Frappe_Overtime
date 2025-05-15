# Copyright (c) 2025, komal and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class BulkOvertime(Document):
	pass

@frappe.whitelist()
def get_workers():
    workers = frappe.get_all("Worker", fields=["name", "full_name"])
    return workers

@frappe.whitelist()
def create_overtime_request(overtime_details, date, reason, status):
	overtime_details = json.loads(overtime_details)
	for row in overtime_details:
		doc = frappe.new_doc("Overtime Request")
		doc.date = date
		doc.reason = reason
		doc.status = status
		doc.hours = row.get("ot_hours")
		doc.worker = row.get("worker")
		doc.insert(ignore_permissions = True)
	return frappe.msgprint("Overtime Requests are Formed")
		





