// Copyright (c) 2025, komal and contributors
// For license information, please see license.txt

frappe.ui.form.on("Request Articles", {
    refresh(frm) {
        
        frm.add_custom_button('Article Request', function () {
            let d = new frappe.ui.Dialog({
                title: 'Article Request Detail',
                fields: [
                    {
                        label: 'Article Request',
                        fieldname: 'article_request',
                        fieldtype: 'Link',
                        options: 'Article Request',
                        reqd: true,
                        onchange: function () {
                            let article_request = d.get_value('article_request');
                            if (article_request) {
                                frappe.call({
                                    method: 'overtime.overtime.doctype.request_articles.request_articles.get_article_details',
                                    args: {
                                        article_request: article_request
                                    },
                                    callback: function (abcd) {
                                        let data = abcd.message;
                                        if (data && Array.isArray(data)) {
                                        
                                            let table_field = d.fields_dict.table;
                                            table_field.df.data = [];

                                            
                                            data.forEach(row => {
                                                table_field.df.data.push({
                                                    article_name: row.article_name,
                                                    rate: row.rate,
                                                    quantity: row.quantity
                                                });
                                                // console.log(data)
                                                
                                            });
                                            // console.log(data)

                                            
                                            table_field.grid.refresh();
                                        } else {
                                            frappe.msgprint("No articles found.");
                                        }
                                    }
                                });
                            }
                        }
                    },
                    {
                        label: 'Articles',
                        fieldname: 'table',
                        fieldtype: 'Table',
                        cannot_add_rows: false,
                        in_place_edit: false,
                        fields: [
                            {
                                fieldname: "article_name",
                                fieldtype: "Link",
                                label: "Article Name",
                                options: "Article",
                                in_list_view: 1,
                                get_query() {
                                    return {
                                        filters: { status: "Inactive" }
                                    }
                                }
                            },
                            {
                                fieldname: "rate",
                                fieldtype: "Currency",
                                label: "Rate",
                                in_list_view: 1,
                                
                            },
                            {
                                fieldname: "quantity",
                                fieldtype: "Float",
                                label: "Quantity",
                                in_list_view: 1
                            }
                            
                        ]
                    }
                ],
                size: 'large',
                primary_action_label: 'Get Article Request',
                primary_action(values) {
                    d.hide();
                    let a  = values.table
                    // console.log(values.table, "++++++")
                    // console.log(a, "...")
                    let n = a.length
                    // console.log(n, "---")
                    // console.log("====", values.table)
                    for(let i = 0; i < n; i++){
                        let j = a[i]
                        // console.log(j)
                        frm.add_child('article_details',{
                            article_name: j.article_name,
                            rate: j.rate,
                            quantity: j.quantity
                        })

                    }
                    frm.refresh_field('article_details')
                }

            });

            d.show();
        }, __('Get Request From'));
        frm.set_query('article_name', 'article_details', () => {
            return {
                filters: {
                    status: "Active"
                }
            }
        }),
        calculate_total(frm)
    }
});

frappe.ui.form.on('Article Details', {
    rate: function(frm, cdt, cdn) {
        calculate_total(frm);
    },
    quantity: function(frm, cdt, cdn) {
        calculate_total(frm);
    }
});

function calculate_total(frm) {
    let t = 0;
    for (let i = 0; i < frm.doc.article_details.length; i++) {
        let row = frm.doc.article_details[i];
        if (row.rate && row.quantity) {
            t += row.rate * row.quantity;
        }
    }
    frm.set_value('total', t);
    frm.refresh_field('total')
}

























// frappe.ui.form.on("Request Articles", {
//     refresh(frm) {
//         frm.add_custom_button('Article Request', function () {
//             let d = new frappe.ui.Dialog({
//                 title: 'Article Request Detail',
//                 fields: [
//                     {
//                         label: 'Article Request',
//                         fieldname: 'article_request',
//                         fieldtype: 'Link',
//                         options: 'Article Request',
//                         reqd: true
//                     },
//                     {
//                         label: 'Articles',
//                         fieldname: 'table',
//                         fieldtype: 'Table',
//                         cannot_add_rows: false,
//                         in_place_edit: false,
//                         data: [],
//                         fields: [
//                             {
//                                 fetch_from: "rate.article_name",
//                                 fieldname: "article_name",
//                                 fieldtype: "Link",
//                                 label: "Article Name",
//                                 options: "Article",
//                                 in_list_view: 1
//                             },
//                             {
//                                 fetch_from: "article_name.rate",
//                                 fieldname: "rate",
//                                 fieldtype: "Currency",
//                                 label: "Rate",
//                                 in_list_view: 1
//                             },
//                             {
//                                 fieldname: "quantity",
//                                 fieldtype: "Float",
//                                 label: "Quantity",
//                                 in_list_view: 1
//                             }
//                         ]
//                     }
//                 ],
              
//                 size: 'large',
//                 primary_action_label: 'Get Article Request',
//                 primary_action(values) {
//                     d.hide();
//                     frappe.model.open_mapped_doc({
//                         method: 'overtime.overtime.doctype.request_articles.request_articles.create_request_article',
//                         source_name: values.article_request
//                     });
//                 }
//             });

//             d.show();
//         }, __('Get Request From'));
//     }
// });
