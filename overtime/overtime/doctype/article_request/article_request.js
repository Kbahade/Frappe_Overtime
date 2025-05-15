// Copyright (c) 2025, komal and contributors
// For license information, please see license.txt

frappe.ui.form.on("Article Request", {
	refresh(frm) {
        if (!frm.is_new()){
            frm.add_custom_button('Request Article', function () {
                frappe.model.open_mapped_doc({
                    method: 'overtime.overtime.doctype.article_request.article_request.create_request_article',  
                    source_name: frm.doc.name
                });
            }, __('Create'));  
        }
	},
});
