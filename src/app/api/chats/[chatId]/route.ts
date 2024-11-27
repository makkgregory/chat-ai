import { generateCompletion, getChatOrNull } from "@/entities/chat/server";
import { formatSse } from "@/shared/lib/format-sse";

interface RouteContext {
  params: Promise<{
    chatId: string;
  }>;
}
export const GET = async (_request: Request, { params }: RouteContext) => {
  const { chatId } = await params;
  const chat = await getChatOrNull(chatId);
  if (!chat) {
    return Response.json(
      { error: `Chat is not found: ${chatId}` },
      { status: 404 },
    );
  }
  return Response.json(chat);
};

export const POST = async (request: Request, { params }: RouteContext) => {
  const { chatId } = await params;
  const result = await generateCompletion({
    chatId,
    ...(await request.json()),
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const message of result) {
        const sse = formatSse({
          event: message.type,
          data: JSON.stringify(message),
        });
        controller.enqueue(sse);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    status: 201,
    headers: {
      ["Content-Type"]: "text/event-stream",
      ["Cache-Control"]: "no-cache, no-transform",
      ["Connection"]: "keep-alive",
    },
  });
};
