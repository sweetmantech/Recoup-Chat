"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import PrivyProvider from "./PrivyProvider";
import { UserProvider } from "./UserProvder";
import { ArtistProvider } from "./ArtistProvider";
import { ConversationsProvider } from "./ConverstaionsProvider";
import { TikTokReportProvider } from "./TikTokReportProvider";
import { PaymentProvider } from "./PaymentProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <PrivyProvider>
      <UserProvider>
        <TikTokReportProvider>
          <ArtistProvider>
            <ConversationsProvider>
              <ChatProvider>
                <PaymentProvider>{children}</PaymentProvider>
              </ChatProvider>
            </ConversationsProvider>
          </ArtistProvider>
        </TikTokReportProvider>
      </UserProvider>
    </PrivyProvider>
  </QueryClientProvider>
);

export default Providers;
