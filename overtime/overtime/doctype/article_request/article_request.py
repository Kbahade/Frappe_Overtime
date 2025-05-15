# Copyright (c) 2025, komal and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc

class ArticleRequest(Document):
	pass



@frappe.whitelist()
def create_request_article(source_name):
    return get_mapped_doc(
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
        }
    )
























# @frappe.whitelist()
# def create_request_article(article_request):
#     article_request_doc = frappe.get_doc("Article Request", article_request)
#     doc =  get_mapped_doc(
#         "Article Request", article_request,
#         {
#               "Article Request":{
#                     "doctype": "Request Articles",
#                     "field_map": {
#                           "date": "date"
# 					}
# 			  }
# 		}
#     )
#     if article_request_doc.get("article_details"):
#         for item in article_request_doc.article_details:
#             doc.append("article_details", {
#                 "article_name": item.article_name,
#                 "rate": item.rate,
#                 "quantity": item.quantity
#             })
    
#     doc.insert(ignore_permissions=True)

#     return doc.name


# @frappe.whitelist()
# def create_request_article(article_request):
#     doc = get_mapped_doc(
#         "Article Request", article_request,
#         {
#             "Article Request": {
#                 "doctype": "Request Articles",
#                 "field_map": {
#                     "date": "date",
#                     "table_map": {
#                     "article_details": {
#                         "doctype": "Request Article Detail",  # Make sure this is correct
#                         "field_map": {
#                             "article_name": "article_name",
#                             "rate": "rate",
#                             "quantity": "quantity"
#                         }
#                     }
#                 }
#                 }
                
#             }
#         }
#     )

#     doc.insert(ignore_permissions=True)
#     return doc.name