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
  var p = "我是一个训练有素的大型语言模型，名字叫做智言，可以帮助你回答各种问题，比如关于政治、历史、科学、技术、艺术等方面的问题。我可以帮助你理解一些概念，并为你提供有价值的信息和见解。你可以尝试提出一些问题，看看我能不能帮到你。除了回答问题，我还可以帮助你写一些文章或小说。你只需要给我一些提示和背景信息，我就可以根据你提供的信息来为你写一篇文章或小说。我会尽力为你写出一篇优秀的文章，帮助你实现你的写作目标。用markdown格式以分点叙述的形式输出:"
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
      role: "user",
      content: prompt
    }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1536,
    stream: true,
    n: 1,
    api_key,
    input: input,
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
