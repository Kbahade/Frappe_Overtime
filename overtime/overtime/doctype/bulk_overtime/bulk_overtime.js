// Copyright (c) 2025, komal and contributors
// For license information, please see license.txt

frappe.ui.form.on("Bulk Overtime", {
	refresh(frm) {
        frm.disable_save()
        frm.add_custom_button('Create Overtime Request', function(){
            frappe.call({
                method: "overtime.overtime.doctype.bulk_overtime.bulk_overtime.create_overtime_request",
                args: {
                    date : frm.doc.date,
                    status : frm.doc.status,
                    overtime_details : frm.doc.overtime_details,
                    reason : frm.doc.reason
                }
            })
        })
        
	},
    get_workers: function(frm) {
        frappe.call({
            method: "overtime.overtime.doctype.bulk_overtime.bulk_overtime.get_workers",
            callback: function({ message: workers }) {
                if (!workers || !workers.length) return;

                frm.clear_table("overtime_details");

                workers.forEach(worker => {
                    let row = frm.add_child("overtime_details");
                    row.worker = worker.name;
                    row.full_name = worker.full_name;
                });

                frm.refresh_field("overtime_details");
            }
        });
    }
});




