import { useEffect } from 'react';
import chatIcon from '../assets/image.png';

declare global {
  interface Window {
    createChat?: (options: {
      webhookUrl: string;
      initialMessages?: string[];
      chatButtonIcon?: string;
      i18n?: {
        en?: {
          title?: string;
          subtitle?: string;
          footer?: string;
          getStarted?: string;
          inputPlaceholder?: string;
        };
      };
      theme?: {
        chatWindow?: {
          backgroundColor?: string;
          fontFamily?: string;
        };
        header?: {
          backgroundColor?: string;
          color?: string;
        };
        message?: {
          bot?: {
            backgroundColor?: string;
            borderColor?: string;
            color?: string;
          };
          user?: {
            backgroundColor?: string;
            color?: string;
          };
        };
      };
    }) => void;
  }
}

export const ChatWidget = () => {
  useEffect(() => {
    const loadChat = async () => {
      try {
        const { createChat } = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');

        createChat({
          webhookUrl: 'https://n8n.srv1091509.hstgr.cloud/webhook/8c55d5eb-d073-4495-9f06-915bf26e23bc/chat',
          chatButtonIcon: chatIcon,
          initialMessages: [
            "I'm happy to answer any questions you may have, guided by the teachings of the Bhagavad Gita.\n\nPlease let me know how can I assist you today ?"
          ],
          i18n: {
            en: {
              title: 'Hi there! 👋',
              subtitle: "Start a chat. We're here to help you 24/7.",
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your message...',
            },
          },
          theme: {
            chatWindow: {
              backgroundColor: '#F5EBD7',
              fontFamily: 'Lato, system-ui, sans-serif',
            },
            header: {
              backgroundColor: '#FFD700',
              color: '#3D2817',
            },
            message: {
              bot: {
                backgroundColor: '#FFF4CC',
                borderColor: '#e5e7eb',
                color: '#FFF4CC',
              },
              user: {
                backgroundColor: '#FFD700',
                color: '#3D2817',
              },
            },
          },
        });

        setTimeout(() => {
          const style = document.createElement('style');
          style.textContent = `
            :root {
              --chat--color-Light-Gold: #FFF4CC;
              --chat--color-brown: #3D2817;
            }
            button[data-key="launcher"] svg,
            button[data-key="launcher"] path {
              display: none !important;
            }
            button[data-key="launcher"] {
              background-image: url(${chatIcon}) !important;
              background-size: 70% !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }
            .chat-message-bot,
            [class*="bot"],
            [class*="assistant"] {
              --chat--message--bot--background: var(--chat--color-Light-Gold) !important;
              background: var(--chat--color-Light-Gold) !important;
            }
            .chat-header,
            [class*="header"] {
              --chat--header--background: var(--chat--color-brown) !important;
              background: var(--chat--color-brown) !important;
            }
          `;
          document.head.appendChild(style);
        }, 1000);
      } catch (error) {
        console.error('Failed to load chat widget:', error);
      }
    };

    loadChat();
  }, []);

  return null;
};
