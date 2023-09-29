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
For charity members of specific charity organizations to create and manage their accounts. 

### Post
- Sign Up

### Authorization
Administrators



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
The homepage of given charity. It typically includes donation statistics to showcase transparency, options for both cash and in-kind donations, listings of upcoming events and activities for supporters to participate in, and an overview of the charity.  

### Get
- List of charity
- List of campaign post
- Associated with charity table
- Associated with campaign post table
- Charity by id joined by events of charity, joined with charity events, joined with charity posts

### Post
- In kind donation
- Cash donation

### Authorization
All users



## app/[id]/events/page.tsx
The event page of a charity focuses on a campaign. Provides information about the its goal, purpose, and impact.

### Get
- List of events
- List of beneficiaries item
- Associated with Events table
- Associated with Beneficiaries item table
- Associated Images 

### Authorization
All users



## app/[id]/news/page.tsx
The news page of a charity organization allows a specific charity organization to share updates and news with donors. Able to post articles, announcements, and stories related to their activities. 

### Get
- List of Campaign post
- Associated with Campaign Post table
- Associated with Images

### Authorization
All users



## app/[id]/report/page.tsx
This is the report charity page, where donors are able to report charity organizations

### Post
- Associated with donor complaints table

### Authorization
Charity members and Admins








# Admin Pages

## app/admin/application/page.tsx
The application page, where all the request of charity organizations that would like to use the platform.

### Get
- List of applications
- Associated with applications table

### Put
- Associated with applications table = Approve request = New Charity Organization within the platform
- Associated with applications table = Deny request = The applying Charity Organization is then denied in the platform.

### Authorization
Admins



## app/admin/audit-log/page.tsx
The audit log page, where all the actions made by Admins are logged.

### Get
- List of audit log
- Associated with log table

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
- List of charity 
- Associated with charity table

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
- List of Appeals and its details made by the charity organization ???? NO APPEAL TABLE??

### Put
- Freeze Charity - To freeze the charity to make it hidden from the web platform.

### Authorization
Admins








# Dashboard - Beneficiaries Pages

## app/dashboard/beneficiaries/contacts/page.tsx
The contact page has the capability to add new beneficiaries and edit their details to ensure accuracy.

### Get
- List of beneficiaries
- Associated with beneficiaries table

### Post
- Associated with beneficiaries table = To add new beneficiaries
- Associated Images with beneficiaries

### Put
- Associated with beneficiaries table = To edit existing beneficiaries
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
- Associated with Events table 
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries table

### Post
- To add new events
- Associated with Events table
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Put
- To edit existing events
- Associated with Events table 
- Associated Item donations
- Associated Cash Donations
- Associated Beneficiaries

### Delete
- Delete Existing events

### authorization
Charity Members



## app/dashboard/beneficiaries/expenses/page.tsx
The expenses page has the capability to add external expenses and edit their details to ensure accuracy or delete it entirely. Details include amount, description, and Images for evidence of the said expense. 

### Get
- List of Expenses
- Associated Images for evidence
- Associated Amount
- Associated Event

### Post
- Add new expenses
- Associated Images for evidence
- Associated Beneficiaries
- Associated Event

### Put
- Edit existing expenses
- Associated Images for evidence
- Associated Beneficiaries
- Associated Event

### Delete
- Delete Existing expenses
- Delete Associated Details

### authorization
Charity Members 



## app/dashboard/beneficiaries/given-items/page.tsx
The given items page is the inkind donations, it lists the inkind donations and edit their details to ensure accuracy or delete it entirely. Details include amount, description, and Images for evidence of the said expense. 

### Get
- List of Expenses
- Associated Images for evidence
- Associated Beneficiary Item

### Post
- Add new beneficiary item
- Associated Images for evidence
- Associated Beneficiary Item

### Put
- Edit existing beneficiary item
- Associated Images for evidence
- Associated Beneficiary Item

### Delete
- Delete beneficiary item

### Authorization
Charity Members












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

### Authorization
charity member



## app/dashboard/posts/page.tsx
The posts page is where the charity members may create and manage existing posts made to the GiveMore platform.

### get
- List of posts

### post
- Create new posts

### put
- Edit existing posts

### delete
- Delete existing posts

