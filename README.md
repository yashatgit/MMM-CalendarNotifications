
# MMM-CalendarNotifications
This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror/tree/develop).

It plays a sound notification for upcoming calendar events alongwith any custom message.

# Installation
1. Navigate into your MagicMirror `modules` folder and execute
`git clone https://github.com/yashatgit/MMM-CalendarNotifications.git`.
3. Enter the `MMM-CalendarNotifications` directory and execute `npm install`.
`cd MMM-CalendarNotifications && npm install`.

This module depends on the `CALENDAR_EVENTS` notification sent by the default [calendar module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/calendar).



# Module Config
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>notificationLeadTime</code></td>
      <td>Play notification before these many milliseconds.<br><br><strong>Type:</strong> <code>number</code><br>Defaults to <code>5*60*1000</code></td>
    </tr>
    <tr>
      <td><code>announcementText</code></td>
      <td>Read this message before playing the event name.<br><br><strong>Type:</strong> <code>string</code></td>
    </tr>
  </tbody>
</table>
<br>


<br>
Example of an entry in `config.js` which displays 2 tables as shown in Screenshot

```
{
  module: 'MMM-CalendarNotifications',
  position: 'top_right',
  config: {
	notificationLeadTime: 5 * 60 * 1000, //5mins in millis
    announcementText: 'Upcoming event',
  },
},
```
