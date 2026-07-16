/**
 * SGR Sahakari Sangha — Gallery API (Google Apps Script)
 *
 * FOLDER STRUCTURE:
 *   Main Folder  (ROOT_FOLDER_ID)
 *   ├── Album 1/
 *   │   ├── photo1.jpg
 *   │   └── photo2.jpg
 *   └── Album 2/
 *       └── photo3.jpg
 *
 * SETUP:
 * 1. Paste this code in Apps Script
 * 2. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Paste the Web App URL into src/data/society.js → galleryApiUrl
 * 4. Share the main folder: "Anyone with the link can view"
 */

const ROOT_FOLDER_ID = "1jDJlkUvUgB46kh7FXv7FfXtSUdSrSY-8";

function doGet() {
  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const folders = root.getFolders();
  const events = [];

  while (folders.hasNext()) {
    const folder = folders.next();
    const files = folder.getFiles();
    const photos = [];

    while (files.hasNext()) {
      const file = files.next();
      const mimeType = file.getMimeType();

      if (mimeType.startsWith("image/")) {
        const id = file.getId();
        photos.push({
          name: file.getName(),
          id: id,
          thumbnail: `https://drive.google.com/thumbnail?id=${id}&sz=w600`,
          full: `https://drive.google.com/thumbnail?id=${id}&sz=w1600`
        });
      }
    }

    if (photos.length === 0) continue;

    events.push({
      title: folder.getName(),
      photos: photos
    });
  }

  // Sort albums alphabetically
  events.sort((a, b) => a.title.localeCompare(b.title));

  return ContentService
    .createTextOutput(JSON.stringify(events))
    .setMimeType(ContentService.MimeType.JSON);
}
