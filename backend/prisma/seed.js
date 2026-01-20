const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// CORRECT: Pass the URL directly to the constructor
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function seed() {
    console.log("Seeding started...");

    // ... the rest of your seed script remains exactly the same ...
    const concertsData = [
        {
            imageUrl:
                "https://v3.ticketwala.pk/uploads/events/banner/screenwriting-course-for-beginners-1766832959-4860.jpeg",
            name: "Screenwriting Course for Beginners",
            venue: "COLABS Cantt - NASTP, Lahore",
            date: new Date("2026-01-09T18:00:00.000Z"),
            gatesOpenTime: new Date("2026-01-09T17:30:00.000Z"),
            about:
                "This 6-week beginner-friendly course is designed for anyone curious about writing short films...",
            language: "English",
            organizedBy: "The Writers Lab",
            totalSeats: 0,
            availableSeats: 0,
        },
        {
            imageUrl:
                "https://v3.ticketwala.pk/uploads/events/banner/study-abroad-open-day-1768730968-5005.jpg",
            name: "Study Abroad | Open Day",
            venue: "WAC Consultants, Z-16, Sector Z DHA Phase 3, Lahore, Pakistan",
            date: new Date("2026-01-24T12:00:00.000Z"),
            gatesOpenTime: new Date("2026-01-24T11:30:00.000Z"),
            about:
                "Meet international universities, explore scholarships, visa guidance, and attend a FREE IELTS Master Class.",
            language: "English",
            organizedBy: "WAC Consultants",
            totalSeats: 0,
            availableSeats: 0,
        },
    ];

    const createdConcerts = [];
    for (const concertData of concertsData) {
        const concert = await prisma.concert.create({ data: concertData });
        createdConcerts.push(concert);
        console.log(`Created concert: ${concert.name}`);
    }

    const categories = [
        { name: "fanpit", price: 8500, totalSeats: 1000 },
        { name: "platinum", price: 6500, totalSeats: 2000 },
        { name: "gold", price: 4500, totalSeats: 3000 },
        { name: "silver", price: 2500, totalSeats: 4000 },
    ];

    for (const concert of createdConcerts) {
        let totalSeats = 0;

        for (const cat of categories) {
            await prisma.ticketCategory.create({
                data: {
                    ...cat,
                    availableSeats: cat.totalSeats,
                    concertId: concert.id,
                },
            });
            totalSeats += cat.totalSeats;
        }

        await prisma.concert.update({
            where: { id: concert.id },
            data: {
                totalSeats,
                availableSeats: totalSeats,
            },
        });
        console.log(`Updated seat count for concert: ${concert.name}`);
    }

    console.log("✅ Database seeded successfully");
}


seed()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });