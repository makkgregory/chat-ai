import { getMessages } from "@/entities/chat/server/get-messages";

interface RouteContext {
  params: Promise<{
    chatId: string;
  }>;
}
export const GET = async (_request: Request, { params }: RouteContext) => {
  const { chatId } = await params;
  const messages = await getMessages(chatId);
  return Response.json(messages);
};
