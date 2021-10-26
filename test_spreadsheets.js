const express = require("express")
const {google} = require("googleapis")

const app = express();

app.get("/", async (req, res) => {

  /*
   Google Spreadsheets Test
  */
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });
  
  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({version: "v4", auth: client });

  // Get metadata about spreadsheet
  const spreadsheetId = "1tjaaFhJd2uYyIQK9Ss-vNyjdmukuTUvlPAVy2I9R_dU";
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  })

  // Read rows from spread sheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "シート1",
  })

  // Writie raw(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "シート1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["write0001", "test"],
        ["write0002", "test"]
      ],
    },
  });

  res.send(getRows.data);
})

app.listen(1337, (req, res) =>console.log("running on 1337"));