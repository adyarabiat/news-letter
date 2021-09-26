import fs from "fs";
import path from "path";

export async function getAllEvents() {
   const response = await fetch(
      "https://nextjs-course-338fc-default-rtdb.firebaseio.com/events.json"
   );
   const data = await response.json();

   const events = [];

   for (const key in data) {
      events.push({
         id: key,
         ...data[key],
      });
   }

   return events;
}

export async function getFeaturedEvents() {
   const allEvents = await getAllEvents();
   return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
   const allEvents = await getAllEvents();
   return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
   const { year, month } = dateFilter;

   const allEvents = await getAllEvents();

   let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
   });

   return filteredEvents;
}

// helper function to the path to not repeat it
export function eventsPath() {
   return path.join(process.cwd(), "data", "data.json");
}

export function extractEvent(filePath) {
   // first we read the data from the file
   const fileData = fs.readFileSync(filePath);

   // then we parse the json to be js object
   const data = JSON.parse(fileData);

   return data;
}
