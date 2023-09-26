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
Where users would be able to view the different charity organizations and posts regarding each organization. 

### Get
- List of Charities
- List of Posts

### Authorization
All users are authorized to access this resource.


# Auth pages

## app/(auth)/admin/page.tsx
A crucial component page within the GiveMore platform, offering a secure and streamlined way for administrators of specific charity organizations to create and manage their accounts. 

### Get
?? double check, should be no get on this page

### Post
- Sign Up Form with email and password

### Authorization
Only Administrators are authorized to access this resource.



## app/(auth)/login/page.tsx
A crucial component page within the GiveMore platform, offering a secure and streamlined way for all users to login into their account and the website. 

### Get
?? double check, should be no get on this page

### Post
- Login Form with email and password

### Authorization
All users are authorized to access this resource.



## app/(auth)/newPassword/page.tsx
A crucial component page within the GiveMore platform, offering a way for users to input a new password incase it is forgotten 

### Get
?? double check, should be no get on this page

### Post
- New Password Form with new password and confirm password

### Authorization
All users are authorized to access this resource.



## app/(auth)/register/page.tsx
A crucial component page within the GiveMore platform, offering a way for new users to create an account in the website. Primarily made for donors.

### Get
?? double check, should be no get on this page

### Post
- Sign Up Form with details such as name, email address, and password

### Authorization
All users are authorized to access this resource.  (?? technically other users can access it just not sign up with this)




## app/(auth)/register2/page.tsx
A crucial component page within the GiveMore platform, offering a way for new users to create an account in the website. Primarily made for charity organizations.

### Get
?? double check, should be no get on this page

### Post
- Sign Up Form with details such as email address and password.

### Authorization
All users are authorized to access this resource.  (?? technically other users can access it just not sign up with this)



## app/(auth)/reset/page.tsx
A crucial component page within the GiveMore platform, offering a way for users to reset their account password in the web application.

### Get
?? double check, should be no get on this page

### Post
- Reset Password Form with details such as email address and old password, and new password.

### Authorization
All users are authorized to access this resource.  (?? technically other users can access it just not sign up with this)










# Id Pages

## app/[id]/details/page.tsx
The homepage of given charity serves as the organization's digital gateway, offering vital information and engagement opportunities. It typically includes donation statistics to showcase transparency, options for both cash and in-kind donations, listings of upcoming events and activities for supporters to participate in, and an overview of the charity's mission and values. 

This centralized webpage informs visitors about the charity's work, fosters trust through transparency, and facilitates various ways to contribute, ensuring that individuals can easily understand, support, and stay involved with the charity's cause.    

### Get
- List of Charities
- List of Posts
- Charity by id joined by events of charity, joined with charity events, joined with charity posts

### Post
- In kind donation
- Cash donation

### Authorization
All users are authorized to access this resource.



## app/[id]/events/page.tsx
The event page of a charity focuses on a specific fundraising drive or campaign. It typically provides information about the campaign's goal, purpose, and impact, along with details on how individuals can donate and contribute. 

### Get
- List of Event and its statistics, such as cash, representative, and others
- Receipt Images

### Post
?? double check, should be no post on this page

### Authorization
All users are authorized to access this resource.



## app/[id]/news/page.tsx
The news page of a charity organization is a dedicated section within the GiveMore platform that allows a specific charity organization to share timely updates and news with its donors and supporters. On this page, the charity can post articles, announcements, and stories related to their activities and its impact. 

### Get
- Posting of news article
- Uploaded News Images

### Post
?? double check, should be no post on this page

### Authorization
All users are authorized to access this resource.



## app/[id]/report/page.tsx
This is the report charity page, where donors are able to report charity organizations

### Get
?? double check, should be no get on this page

### Post
- Completion of form with Charity Organization
- Upload Evidence Images

### Authorization
Only Charity members and Admins are authorized to access this resource.








# Admin Pages

## app/admin/application/page.tsx
The application page, where all the request of charity organizations that would like to use the platform.

### Get
- List of Sign Up or application request by charity organizations.
- Charity Organization Application Details

### Post
- Approve request = New Charity Organization within the platform

### Delete
- Deny request = The applying Charity Organization is then denied of creating an page in the platform.

### Authorization
Only Admins are authorized to access this resource.



## app/admin/audit-log/page.tsx
The audit log page, where all the actions made by Admins are logged.

### Get
- List of Actions made by Admins within the system, such as approving a charity organization or freezing.

### Authorization
Only Admins are authorized to access this resource.



## app/admin/complaints/page.tsx
The complaints page, where all the donors complaint against a charity organization is located here. 

### Get
- List of complaints by donors
- Associated Images for evidence
- Details of complaint

### Put 
- Notify Charity = The complained charity organization is notified of a complaint made by a donor. 

### Authorization
Only Admins are authorized to access this resource.



## app/admin/organizations/page.tsx
The organizations page, where all the approved and verified charity organizations are located. 

### Get
- List of Charity Organizations
- Details of Charity Organizations

### Authorization
Only Admins are authorized to access this resource.



## app/admin/profilehistory/page.tsx
The profile history page, where all the approved and verified charity organizations are located. A comprehensive record of actions and activities performed by administrators. This page serves as an audit trail. 

### Get
- List of actions made by a specific administrator

### Authorization
Admins are authorized to access this resource.



## app/admin/settings/page.tsx
The settings page, a hub for administrators to configure and customize various aspects of the system. One of its key functionalities is the ability to invite new developer admins into the platform. 

### Post
- Invite new Admininstrators in the platform

### Authorization
Admins are authorized to access this resource.



## app/admin/view-charity/page.tsx
The view charity page, a comprehensive view of a specific charity organization. It provides an overview of the charity organization. Additionally, this page allows Admins to view submitted complaints against the organization. Furthermore, it enables them to view the appeals made by the charity organization against complaints previously submitted to them.

### Get
- List of complaints and its details to the charity organization
- List of Appeals and its details made by the charity organization 

### Put/Patch (Delete)
- Freeze Charity - To freeze the charity to make it hidden from the public or to be removed from the web platform.  IDK IF THIS IS UPDATE OR DELETE

### Authorization
Only Admins are authorized to access this resource.








# Dashboard - Beneficiaries Pages

## app/dashboard/beneficiaries/contacts/page.tsx
The contact page has the capability to add new beneficiaries and edit their details to ensure accuracy.

### Get
- List of beneficiaries

### Post
- Form to add new beneficiaries
- Upload Associated Images with beneficiaries

### Put
- Form to edit existing beneficiaries
- Replace Uploaded Associated Images with beneficiaries

### Delete
- Delete Existing Beneficiary
- Associated Images

### authorization
Only Charity Members are authorized to access this resource.



## app/dashboard/beneficiaries/events/page.tsx
The event page has the capability to add new events and edit their details to ensure accuracy or delete the event entirely. It has the name of the event and details regarding it.

### Get
- List of Events
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Post
- Form to add new events
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Put
- Form to edit existing events
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Delete
- Delete Existing events
- Delete Associated Details

### authorization
Only Charity Members are authorized to access this resource.



## app/dashboard/beneficiaries/expenses/page.tsx
The expenses page has the capability to add external expenses and edit their details to ensure accuracy or delete it entirely. Details include amount, description, and Images for evidence of the said expense. 

### Get
- List of Expenses
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Post
- Form to add new events
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries
- Associated Images for evidence

### Put
- Form to edit existing events
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Delete
- Delete Existing events
- Delete Associated Details

### authorization
Only Charity Members are authorized to access this resource.










## app/dashboard/donations/verified-in-kind/page.tsx


### get
- list of item donation transaction filtered by verified = true

### post
- item donation transaction
- associated item donations
- associated photos of proof


### put
- item donation transaction
- associated item donations
- associated photos of proof
  
### delete
- item donation transaction
- associated item donations
- photos of proof

### authorization
charity member


