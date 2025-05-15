# Copyright (c) 2025, komal and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today, getdate

class Worker(Document):
    def validate(self):
        self.get_name()
        self.age = self.calculate_age(self.dob)
        self.set_salutation()
        self.user_check()
    # def before_save(self):
    #     user = frappe.get_doc("User",self.email)
    #     self.user_it = user.email

        
    def get_name(self):
        self.full_name = f'{self.first_name} {self.last_name}'
        
    def calculate_age(self, d):
        d = getdate(d)
        current_date = getdate(today())
        age = current_date.year - d.year
        if (current_date.month, current_date.day) < (d.month, d.day):
            age -= 1
        return age
     
    def set_salutation(self):
        if self.gender == "Male":
            self.salutation = "Mr"
        else:
            self.salutation = "Miss"
            

    def user_check(self):
        if self.email:
            existing_user = frappe.db.exists("User", {"email": self.email})
            if not existing_user:
                new_user = frappe.new_doc("User")
                new_user.email = self.email
                new_user.first_name = self.first_name
                new_user.last_name = self.last_name
                new_user.full_name = self.full_name
                new_user.save(ignore_permissions = True)
                frappe.msgprint(f"New User Created")
            else:
                frappe.throw(f"This email already exists")
                
            
	
            
            
            

			
    