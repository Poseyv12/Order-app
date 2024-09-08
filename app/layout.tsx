import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Bakery Pickup App",
  description: "Order delicious baked goods for pickup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
