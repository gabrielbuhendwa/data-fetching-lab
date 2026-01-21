import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL || "file:./prisma/app.db";
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { 
          title: "Laptop Pro 15", 
          price: 1299, 
          description: "High-performance laptop with 16GB RAM and 512GB SSD. Perfect for developers and professionals." 
        },
        { 
          title: "Wireless Mouse", 
          price: 29, 
          description: "Ergonomic wireless mouse with long battery life and precision tracking." 
        },
        { 
          title: "Mechanical Keyboard", 
          price: 149, 
          description: "RGB mechanical keyboard with Cherry MX switches. Ideal for gaming and typing." 
        },
        { 
          title: "4K Monitor 27\"", 
          price: 399, 
          description: "Ultra-sharp 4K display with HDR support and 60Hz refresh rate. Great for design work." 
        },
        { 
          title: "USB-C Hub", 
          price: 49, 
          description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery." 
        },
        { 
          title: "Webcam HD", 
          price: 79, 
          description: "1080p HD webcam with built-in microphone and auto-focus. Perfect for video calls." 
        },
        { 
          title: "Desk Mat XL", 
          price: 24, 
          description: "Large desk mat (90x40cm) with smooth surface for mouse and keyboard. Waterproof." 
        },
      ],
    });
    console.log("✓ Products seeded successfully (7 products added)");
  } else {
    console.log(`✓ Products already exist (${count} products), skipping seed`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
