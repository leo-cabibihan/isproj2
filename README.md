# GiveMore

format: file name, description, operations, authorization level

## Overview

The GiveMore web application is designed to create a platform for charities and users to connect. It is an innovative online donation platform designed with a goal to improve resource acquisition and transparency for charitable organizations. It uses various technologies, including Tailwind CSS, Next.js, and Headless UI. This documentation will guide you through the setup, available operations, and authorization levels. 

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Learn more

To learn more about the technologies used in GiveMore, consult the following resources for each:

- [Tailwind CSS](https://tailwindcss.com/docs) - The official Tailwind CSS documentation framework.
- [Next.js](https://nextjs.org/docs) - The official Next.js documentation to understand how Next.js works and its features.
- [Headless UI](https://headlessui.dev) - The official Headless UI documentation.

# File Structure

## app/page.tsx
The homepage represents the homepage of Givemore. This includes a simple page as to what exactly is GiveMore. 
Users would be able to view the different charity organizations and posts regarding each organization. 

### Get
- List of Charities
- List of Posts
- Associated with charity table
- Associated with campaign posts table

### Authorization
All users are authorized to access this resource.



# Auth pages

## app/(auth)/admin/page.tsx
For charity members of specific charity organizations to create their accounts. 

### Post
- Sign Up

### Authorization
all users



## app/(auth)/login/page.tsx
A component page within platform, for all users to login into their account and the website. 

### Post
- Login

### Authorization
All users



## app/(auth)/newPassword/page.tsx
A component page within platform, to input a new password incase it is forgotten 

### Post
- New Password with new password and confirm password details.

### Authorization
All users



## app/(auth)/register/page.tsx
A component page within the GiveMore platform, for new users to create an account in the website. Primarily made for donors.

### Post
- Sign Up 

### Authorization
All users.




## app/(auth)/register2/page.tsx
A component page within the GiveMore platform, for new users to create an account in the website. Primarily made for charity organizations.

### Post
- Sign Up

### Authorization
All users 



## app/(auth)/reset/page.tsx
A component page within the GiveMore platform, for users to reset their account password in the web application.

### Post
- Reset Password

### Authorization
All users 










# Id Pages

## app/[id]/details/page.tsx
The homepage of given charity.

### Get
- charity by id
- joined by charity id
- joined by campaign post table

### Post
- In kind donation
- Cash donation

### Authorization
All users



## app/[id]/events/page.tsx
Oi fix this, it should be by event id

### Get
- event by id
- List of beneficiaries item
- Associated with Beneficiaries item table
- Associated with expenses 

### Authorization
All users



## app/[id]/news/page.tsx
OI fix this, it should by news id

### Get
- campaign post by id

### Authorization
All users



## app/[id]/report/page.tsx
This is the report charity page, where donors are able to report charity organizations

### Post
- Associated with donor complaints table

### Authorization
all users







# Admin Pages

## app/admin/application/page.tsx
The application page, where all the request of charity organizations that would like to use the platform.

### Get
- List of applications

### Put
- Associated with applications table = Approve request = New Charity Organization within the platform
- Associated with applications table = Deny request = The applying Charity Organization is then denied in the platform.

### Authorization
Admins



## app/admin/audit-log/page.tsx
The audit log page, where all the actions made by Admins are logged.

### Get
- List of audit log
- Associated with log table - Filtered by Admins only

### Authorization
Admins



## app/admin/complaints/page.tsx
The complaints page, where all the donors complaint against a charity organization is located here. 

### Get
- List of donor complaints table
- Associated with donor complaints table

### Put 
- Notify Charity = The complained charity organization is notified of a complaint made by a donor. 

### Authorization
Admins


## app/admin/organizations/page.tsx
The organizations page, where all the approved and verified charity organizations are located. 

### Get
- List of charity filtewred by verified

### Authorization
Admins



## app/admin/profilehistory/page.tsx
The profile history page, where all the approved and verified charity organizations are located. A comprehensive record of actions and activities performed by administrators. This page serves as an audit trail. 

### Get
- List of Audit log
- Associated with Log table = Filtered by Admin user history

### Authorization
Admins



## app/admin/settings/page.tsx
The settings page, a hub for administrators to configure and customize various aspects of the system. One of its key functionalities is the ability to invite new developer admins into the platform. 

### Post
- Associate with Admins table = Invite new Admininstrators in the platform

### Authorization
Admins 



## app/admin/view-charity/page.tsx
The view charity page, provides an overview of the charity organization. Allows Admins to view submitted complaints against the organization and view the appeals made by the charity organization against the complaints.

### Get
- List of donor complaints 
- Associated with donor complaints table

### Put
- Freeze Charity - To freeze the charity to make it hidden from the web platform.

### Authorization
Admins



# Dashboard/dashboard/page.tsx

STILL EMPTY NEED UPDATE TO UI




# Dashboard - Beneficiaries Pages

## app/dashboard/beneficiaries/contacts/page.tsx
The contact page has the capability to add new beneficiaries and edit their details to ensure accuracy.

### Get
- List of beneficiaries
- Associated with beneficiaries table

### Post
- Associated with beneficiaries table = To add new beneficiaries
- Assign with event
- Associated Images with beneficiaries

### Put
- Associated with beneficiaries table = To edit existing beneficiaries
- Assign with event
- Replace Uploaded Associated Images with beneficiaries

### Delete
- Associated with beneficiaries table = To Delete Existing Beneficiary
- Associated Images with beneficiaries

### authorization
Charity Members



## app/dashboard/beneficiaries/events/page.tsx
The event page has the capability to add new events and edit their details to ensure accuracy or delete the event entirely. It has the name of the event and details regarding it.

### Get
- List of events

### Post
- To add new events
- Associated with Events table
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries table

### Put
- To edit existing events
- Associated with Events table 
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries table

### Delete
- Delete Existing events

### authorization
Charity Members



## app/dashboard/beneficiaries/expenses/page.tsx
The expenses page to add external expenses and edit their details to ensure accuracy or delete it entirely. Details include amount, description, and Images for evidence of the said expense. 

### Get
- List of Expenses

### Post
- Add new expenses
- Associated Images for evidence
- Associated Event table

### Put
- Edit existing expenses
- Associated Images for evidence
- Associated Event table

### Delete
- Delete Existing expenses

### authorization
Charity Members 



## app/dashboard/beneficiaries/given-items/page.tsx
The given items page is the inkind donations, it lists the inkind donations and edit their details to ensure accuracy or delete it entirely. Details include amount, description, and Images for evidence of the said expense. 

### Get
- List of beneficiary item
- Associated Images for evidence
- Associated Beneficiary Item

### Post
- Add new beneficiary item
- Associated Images for evidence
- Assign inventory item
- assign event

### Put
- Edit existing beneficiary item
- Associated Images for evidence
- Assign inventory item
- assign event

### Delete
- Delete beneficiary item

### Authorization
Charity Members




# Dashboard - Donations


## app/dashboard/donations/cash/page.tsx
The cash page is the external income

### Get
- List of external income


### Post
- Add new external income 
- Assign donor
- photo proof

### Put
- edit if added by donor

### Delete
- Delete existing external income 

### Authorization
Charity Members



## app/dashboard/donations/donors/[id]/page.tsx
The donor profile history page, where all the history of donations of the donor is located. This page serves as an audit trail for the donors. 

### Get
- List of cash
- List of inventory item
- Associated with cash table = Filtered by Donor User
- Associated with inventory item table = Filtered by Donor User

### Authorization
Charity Member


## app/dashboard/donations/donors/[id]/page.tsx
The donor profile history page, where all the history of donations of the donor is located. This page serves as an audit trail for the charity members. 

### Get
- List of cash
- List of inventory item
- Associated with cash table = Filtered by Donor User
- Associated with inventory item table = Filtered by Donor User

### Authorization
Charity Member



## app/dashboard/donations/donors/page.tsx
The donor profile history page, where all the history of donations of the donor is located. This page serves as an audit trail for the charity members. 

### Get
- List of cash
- List of inventory item
- Associated with cash table 
- Associated with inventory item table 

### Authorization
Charity Member


## app/dashboard/donations/inventory/page.tsx
The inventory page, where all the inventory of the charity donations are located.  

### Get
- List of inventory item
- Associated with inventory item table 

### Post
- Add new inventory item
- Associated with inventory item table 

### Put
- Edit existing inventory item
- Associated with inventory item table 

### Delete
- Delete existing inventory item


### Authorization
Charity Member



## app/dashboard/donations/pickup/page.tsx  NEED TO CHECK IF TABLE ASSOCIATION CORRECT
The pickup page, where all the unverified inkind donations of the charity donations are located.  

### Get
- List of unverified inkind donations
- Associated with item donation transaction table 
- Associated with inventory table 
- Associated with Images for evidence

### Post
- Add new unverified inkind donations
- Associated with item donation transaction table 
- Associated with inventory table

### Put
- Edit existing unverified inkind donations
- Associated with item donation transaction table 
- Associated with inventory table

### Delete
- Delete unverified inkind donations

### Authorization
Charity Member



## app/dashboard/donations/verifiedInkind/page.tsx  NEED TO CHECK IF TABLE ASSOCIATION CORRECT
The verified Inkind page, where all the verified inkind donations of the charity donations are located.  

### Get
- List of verified inkind donations
- Associated with item donation transaction table = Filtered by verified = true
- Associated with inventory table 
- Associated with Images for evidence

### Post
- Add new verified inkind donations
- Associated with item donation transaction table 
- Associated with inventory table

### Put
- Edit existing verified inkind donations
- Associated with item donation transaction table 
- Associated with inventory table

### Delete
- Delete verified inkind donations

### Authorization
Charity Member





# Dashboard - Logs

## app/dashboard/donations/logs/member-actions/page.tsx  
The member action page, where all the actions of each charity memeber are logged.  

### Get
- List of logs = Filtered by charity members
- Associated with log table

### Authorization
Charity Member



## app/dashboard/donations/logs/complaints/page.tsx  
The complaints page, where all the complaints of the charity organization is located. The charity members may appeal each complaint made to them towards the admins.   

### Get
- List of complaints = Filtered by donors complaints against the specific charity organization
- Details of complaint
- Associated with donor omplaints table

### Post
- Add new appeal against complain
- Associated with appeals ???? NO APPEAL TABLE??

### Authorization
Charity Member




# Dashboard - Posts

## app/dashboard/donations/logs/complaints/page.tsx  
The posts page, where all the posts of the charity organization is located. The charity members may create a post and the donors would be able to view it.   

### Get
- List of campaign post = Filtered by charity organization's post
- Associated with campaign post table

### Post
- Add new appeal against complain
- Associated with campaign post table

### Put
- Edit existing campagn post table
- Associated with campaign post table

### Delete
- Delete existing campaign post

### Authorization
Charity Member




# Dashboard - statistics

## app/dashboard/donations/logs/statistics/page.tsx  
The statistics page, an overview data visualization of charity donations and expenses. 

### Get
- Data Visualization Chart of Charity Donations and expenses
- Associated with expenses table
- Associated with cash table

### Authorization
Charity Member



# Onboarding Details
## app/onboardingDetails/page.tsx 
The onboarding details page, where charity organizations would request to sign up in the platform.

### Post
- Sign Up

### Authorization
Charity member and Admin



# Pending
## app/pending/page.tsx 
The pending page, where charity organizations would be shown their status as pending after onboarding. 

### Authorization
Charity member and Admin



# Report Process
## app/pending/page.tsx 
The report process page, where donors would be shown their complaint status after filling up the form. 

### Authorization
Charity member



# 
## app/settings/donationHistory/page.tsx 
The donation history page, where donors would be shown their history of donation. 

### Get
- List of cash
- List of inventory item
- Associated with cash table
- Associated with inventory item

### Authorization
Charity member


# Thank you
## app/thankyou/page.tsx 
The thank you page, where donors would be shown their complaint status after filling up the form. 

### Authorization
Charity member




