# Copyright (c) 2025, Komal and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc
from frappe import _


class RequestArticles(Document):
    pass
    # def before_save(self):
    #       self.calculate_total()

    # def calculate_total(self):
    #     total = 0
    #     if self.article_details:
    #         for row in self.article_details:
    #             if row.rate:
    #                 total += (row.rate*row.quantity)

    #     self.total = total


@frappe.whitelist()
def create_request_article(source_name):
    doc = get_mapped_doc(
        "Article Request",
        source_name,
        {
            "Article Request": {
                "doctype": "Request Articles"
            },
            "Article Details": {
                "doctype": "Article Details",
                "field_map": {
                    "article_name": "article_name",
                    "rate": "rate",
                    "quantity": "quantity"
                },
                "add_if_empty": True
            }
        },
    )

    return doc

@frappe.whitelist()
def get_article_details(article_request):
    data = frappe.get_all(
        "Article Details",
        filters={"parent": article_request},
        fields=["article_name", "rate", "quantity"]
    )
    return data