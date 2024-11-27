import { provideMessageFeedback } from "@/entities/chat/server";

interface RequestContext {
  params: Promise<{ chatId: string; messageId: string }>;
}

export const PUT = async (request: Request, { params }: RequestContext) => {
  const { chatId, messageId } = await params;
  const message = await provideMessageFeedback({
    ...(await request.json()),
    chatId,
    messageId,
  });

  return Response.json(message);
};
