# WanderLust Project

A travel accommodation listing platform built with Node.js, Express, and MongoDB.

## Features
- User authentication (Local & Google OAuth)
- Property listings management
- Review system
- Image upload using Cloudinary
- Flash messages for user feedback

## Routes Structure

### Listing Routes (`/listings`)

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | / | Show all listings | No |
| POST | / | Create new listing | Yes |
| GET | /new | Show new listing form | Yes |
| GET | /:id | Show listing details | No |
| PUT | /:id | Update listing | Yes + Owner |
| DELETE | /:id | Delete listing | Yes + Owner |
| GET | /:id/edit | Show edit form | Yes + Owner |

### User Routes

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | /signup | Show signup form | No |
| POST | /signup | Create new user | No |
| GET | /login | Show login form | No |
| POST | /login | Authenticate user | No |
| GET | /logout | Logout user | Yes |
| GET | /auth/google | Google OAuth login | No |
| GET | /auth/google/callback | Google OAuth callback | No |

### Review Routes (`/listings/:id/reviews`)

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | / | Create new review | Yes |
| DELETE | /:reviewId | Delete review | Yes + Review Author |

## Models

### Listing Model
- Title
- Description
- Image (URL & filename)
- Price
- Location
- Country
- Reviews (Array of Review IDs)
- Owner (User ID)

### User Model
- Email
- Username
- Password
- Google OAuth ID (optional)

### Review Model
- Comment
- Rating (1-5)
- Created At
- Author (User ID)

## Middleware

- `isLoggedIn`: Verifies user authentication
- `isOwner`: Checks listing ownership
- `isReviewAuthor`: Validates review authorship
- `validateListing`: Validates listing data
- `validateReview`: Validates review data

## Image Upload

- Uses Multer for handling multipart/form-data
- Cloudinary for image storage
- Supports single image upload per listing

## Environment Variables Required

```env
NODE_ENV=development
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
```

## Setup & Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start MongoDB server
5. Run the application: `node app.js`
6. Access at: `http://localhost:8080`

## Dependencies

- express
- mongoose
- passport (Local + Google OAuth)
- multer
- cloudinary
- joi
- ejs
- connect-flash
- express-session