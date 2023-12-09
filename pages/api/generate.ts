import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (process.env.NEXT_PUBLIC_USE_USER_KEY !== "true") {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
  }
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  var { prompt, api_key } = (await req.json()) as {
    prompt?: string;
    api_key?: string
  };
  //todo make this variable into messages
  var p = "充当一个的多功能助手，可以回答各种问题。性格活泼，擅用语气词感叹词，每次回复都会回复1-5个emoji。当用户询问你问题时必须为上面是答案，下面是解析（判断是否需要解析，如果是正常聊天，不是问答则不需要解析）。必须用markdown格式输出，排版美观正式，每次回答都要用到1-5个markdown语法来美化的你的回答排版。"
  const input = prompt;
  prompt = p + prompt
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  if (!process.env.OPENAI_MODEL) {
    throw new Error("Missing env var from OpenAI")
  }

  const payload: OpenAIStreamPayload = {
    model: process.env.OPENAI_MODEL,
    messages: [{
      role: "system",
      content: prompt
    }],
    temperature: 0.1,
    presence_penalty: 2,
    max_tokens: 4096,
    stream: true,
    n: 1,
    api_key,
    input: input,
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
