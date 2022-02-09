# Teams Adder

> Add attendees to a teams meeting using a list of emails

As a non-admin of my organisation, there didn't seem to be an easy way to add attendees to a teams meeting using a list of emails. Thus, this little script opens an automated browser using puppeteer, and adds these emails as required attendees to the meeting.

## Usage

`index.js` houses a sample of how to read a list of emails from an excel sheet (from column D). You will need to edit it to read emails from your data source, and finally pass an array of emails to the `addEmails` function.

```sh
# Install dependencies
npm install

# Edit index.js to retrieve array of emails from your data source
# These emails should then be passed to the addEmail() function
# Once done, you can call:
node index.js

# A browser window should open up. Log in to yoour account and
# navigate to the meeting (Calendar -> Edit meeting).
```

## Do you have access to the API?

If you have API access, adding people to a meeting is way more easier:

```sh
# You'll need to add people to the meeting twice: once to the calendar event,
# and then to the meeting itself.

# Retrieve the online meeting id using the join url from teams
GET https://graph.microsoft.com/v1.0/me/onlineMeetings?$filter=JoinWebUrl%20eq%20'MEETING_JOIN_URL'

# Use a patch request to set the participant list
PATCH https://graph.microsoft.com/v1.0/me/onlineMeetings/ONLINE_MEETING_ID

{
  "allowedPresenters": "roleIsPresenter",
  "participants": {
    "attendees": [
      {
        "upn": "participant1@example.com"
      },
      {
        "upn": "participant2@example.com",
        "role": "presenter"
      }
    ]
  }
}

# Retrieve the calendar event id
GET https://graph.microsoft.com/v1.0/me/events

# Add the meeting to participant calendars
PATCH https://graph.microsoft.com/v1.0/me/events/CALENDAR_EVENT_ID

{
  "attendees": [
    {
      "emailAddress": {
        "address": "participant1@example.com",
        "name": "Participant 1"
      }
    },
    {
      "emailAddress": {
        "address": "participant2@example.com",
        "name": "Participant 2"
      }
    }
  ]
}
```

## License

MIT
