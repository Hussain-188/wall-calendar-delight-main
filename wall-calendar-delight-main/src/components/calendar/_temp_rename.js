const fs = require("fs");
const path = require("path");

const dir = path.dirname(__filename);
const oldFile = path.join(dir, "WallCalendar.tsx");
const newFile = path.join(dir, "WallCalendar.tsx.new");

try {
  // Delete the old file
  fs.unlinkSync(oldFile);
  console.log("✓ Deleted WallCalendar.tsx");

  // Rename the new file
  fs.renameSync(newFile, oldFile);
  console.log("✓ Renamed WallCalendar.tsx.new to WallCalendar.tsx");
  console.log("✓ Operations completed successfully");
  process.exit(0);
} catch (err) {
  console.error("✗ Error:", err.message);
  process.exit(1);
}
