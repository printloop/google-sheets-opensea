# Google Sheets OpenSea 
Script for pulling OpenSea data and saving in Google Sheets

# Demo
![Demo of actual usage](https://github.com/printloop/google-sheets-opensea/blob/main/actual-usage.png)

## Adds a button to check floors (can also update on periodic intervals)
![Button to check floors](https://github.com/printloop/google-sheets-opensea/blob/main/button.png)

# Setup 
Create a new spreadsheet. Name the sheet "Floors". This will let the script know which sheet to add data to.
![Google sheet name](https://github.com/printloop/google-sheets-opensea/blob/main/sheet-name.png)

Next add a column for all the projects you want to track. 

The name needs to match the OpenSea collection name **exactly**. 

You can find this in the URL of the collection:
![OpenSea collection name](https://github.com/printloop/google-sheets-opensea/blob/main/project-name.png)

Your finished setup should look something like this:
![Sheet setup](https://github.com/printloop/google-sheets-opensea/blob/main/setup.png)

Click on Extensions > Apps Script. 
![Apps Script](https://github.com/printloop/google-sheets-opensea/blob/main/apps-script.png)

This should open a new tab with a code editor. There is a file here called [Code.gs](https://github.com/printloop/google-sheets-opensea/blob/main/Code.gs)
Copy it into the code editor, replacing everything that was there originally. 

The results should look something like this:
![Code Editor](https://github.com/printloop/google-sheets-opensea/blob/main/code.png)

Click "Save" and then "Run". You should get a popup asking for permissions to access your Google account. 

This allows the script to modify the sheet as well as pull data from an external source (OpenSea). 

You are not giving me or anyone else access to your Google Account, just the code that's running here. 

You will get a scary alert saying that this app hasn't been approved. That's expected since you are running your own code.

You're done! You can now click Tracking > Check floors and all the floor data for the projects your tracking will update. 

The script currently creates one column per day so it will keep updating the current day's column and then add a new column when the day changes.

If the date is showing up as a bunch of weird looking numbers you can just format it as a "Date" and it should look normal. Format > Number > Date.

## Automatic Updates
You can also get the script to update by itself at regular time intervals. 

Here's how to do hourly updates. 

From the App Script page navigate to Triggers on the left-hand side.
![Triggers](https://github.com/printloop/google-sheets-opensea/blob/main/trigger-1.png)

Click "+ Add Trigger" at the bottom right of the page. 

For "Choose which function to run" select "updateAllFloors". 

For "Select event source" select "Time-driven". 

Click "Save" and you're done. 

The end result should look like this:
![Triggers complete](https://github.com/printloop/google-sheets-opensea/blob/main/trigger-2.png)

The script should now run every hour and update floors and you can also run it manually whenever you want. 

Any formatting you add to the last column will be copied over to the next column created. That's how I added the conditional formatting in the demo screenshot. 


