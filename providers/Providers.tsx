"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import PrivyProvider from "./PrivyProvider";
import { UserProvider } from "./UserProvder";
import { ArtistProvider } from "./ArtistProvider";
import { ConversationsProvider } from "./ConverstaionsProvider";
import { FunnelReportProvider } from "./FunnelReportProvider";
import { PaymentProvider } from "./PaymentProvider";
import { InitialMessagesProvider } from "./InititalMessagesProvider";
import { MessagesProvider } from "./MessagesProvider";
import { InitialChatProvider } from "./InitialChatProvider";
import { PromptsProvider } from "./PromptsProvider";
import { FunnelAnalysisProvider } from "./FunnelAnalysisProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <PrivyProvider>
      <UserProvider>
        <FunnelReportProvider>
          <ArtistProvider>
            <ConversationsProvider>
              <PromptsProvider>
                <InitialMessagesProvider>
                  <MessagesProvider>
                    <InitialChatProvider>
                      <ChatProvider>
                        <PaymentProvider>
                          <FunnelAnalysisProvider>
                            {children}
                          </FunnelAnalysisProvider>
                        </PaymentProvider>
                      </ChatProvider>
                    </InitialChatProvider>
                  </MessagesProvider>
                </InitialMessagesProvider>
              </PromptsProvider>
            </ConversationsProvider>
          </ArtistProvider>
        </FunnelReportProvider>
      </UserProvider>
    </PrivyProvider>
  </QueryClientProvider>
);

export default Providers;
