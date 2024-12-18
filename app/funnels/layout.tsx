import { FunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow h-screen flex">
      <FunnelAnalysisProvider>{children}</FunnelAnalysisProvider>
    </div>
  );
}
