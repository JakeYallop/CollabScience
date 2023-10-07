# How to convert the spreadsheet data in to the JSON

This assumes the use of https://regexr.com/

Paste the following into the Expression field:

`(?<Id>.+)	(?<Name>.+)	(?<Description>.+)	(?<Url>.+)	(?<Source>.+)	(?<ImageUrl>.*)	(?<TimeToHelp>.*)	(?<Commitment>.*)	(?<Expertise>.*)	(?<Area>.*)`

Copy the data from the spreadsheet in to the text pane, ensure it has come across tab seperated with a new line at the end of each row

Click List under Tools and paste the following:

`{\n"Id": $1,\n"Name": "$2",\n"Description": "$3",\n"Url": "$4",\n"Source": "$5",\n"ImageUrl": "$6",\n"TimeToHelp": ["$7"],\n"Commitment": ["$8"],\n"Expertise": ["$9"],\n"Area": ["$10"],\n},\n`