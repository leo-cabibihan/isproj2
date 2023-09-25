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

Homepage

It represents the homepage of Givemore. This includes a simple home page as to what exactly is GiveMore. 
Where users would be able to view the different charity organizations and posts regarding each organization. 


- HTTP Method: GET
- Description: Retrieve information on the homepage, including a list of charities and posts.
- Authorization Level: Everyone

### get

- list of charities
- list of posts


### authorization

everyone



## app/[id]/details/page.tsx

The homepage of given charity serves as the organization's digital gateway, offering vital information and engagement opportunities. It typically includes donation statistics to showcase transparency, options for both cash and in-kind donations, listings of upcoming events and activities for supporters to participate in, and an overview of the charity's mission and values. 

This centralized webpage informs visitors about the charity's work, fosters trust through transparency, and facilitates various ways to contribute, ensuring that individuals can easily understand, support, and stay involved with the charity's cause.    

### get

- List of Charities
- List of Posts
- Charity by id joined by events of charity, joined with charity events, joined with charity posts

### post

- In kind donation
- Cash donation

### authorization

All users are authorized to access this resource.


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


