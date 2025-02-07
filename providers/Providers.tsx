"use client";

import { ChatProvider } from "./ChatProvider";
import PrivyProvider from "./PrivyProvider";
import { UserProvider } from "./UserProvder";
import { ArtistProvider } from "./ArtistProvider";
import { ConversationsProvider } from "./ConverstaionsProvider";
import { FunnelReportProvider } from "./FunnelReportProvider";
import { PaymentProvider } from "./PaymentProvider";
import { InitialMessagesProvider } from "./InititalMessagesProvider";
import { MessagesProvider } from "./MessagesProvider";
import { PromptsProvider } from "./PromptsProvider";
import { FunnelAnalysisProvider } from "./FunnelAnalysisProvider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PrivyProvider>
    <UserProvider>
      <FunnelReportProvider>
        <ArtistProvider>
          <ConversationsProvider>
            <PromptsProvider>
              <InitialMessagesProvider>
                <MessagesProvider>
                  <ChatProvider>
                    <PaymentProvider>
                      <FunnelAnalysisProvider>
                        {children}
                      </FunnelAnalysisProvider>
                    </PaymentProvider>
                  </ChatProvider>
                </MessagesProvider>
              </InitialMessagesProvider>
            </PromptsProvider>
          </ConversationsProvider>
        </ArtistProvider>
      </FunnelReportProvider>
    </UserProvider>
  </PrivyProvider>
);

export default Providers;
