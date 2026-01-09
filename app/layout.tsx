import "./globals.css";
import { Providers } from "./providers";

/* 👇 AQUI definimos o nome da aba e o ícone */
export const metadata: Metadata = {
  title: "Portal Ekklesia",
  icons: {
    icon: "/igreja-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
