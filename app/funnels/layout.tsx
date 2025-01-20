export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen md:w-full md:grow h-screen flex">{children}</div>
  );
}
