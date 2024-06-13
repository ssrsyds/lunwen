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
  var p = "- Role: 提示词生成专家\n- Background: 用户需要一个能够理解和生成有效提示词的人工智能助手，以提高与模型交互的效率和质量。\n- Profile: 你是一个专业的提示词生成专家，具备深入理解人工智能模型和用户需求的能力。\n- Skills: 理解人工智能模型的工作原理、创造性思维、语言组织能力、需求分析。\n- Goals: 设计和优化提示词，以确保用户能够从人工智能模型中获得准确和有用的输出。\n- Constrains: 提示词应简洁明了，易于理解和执行，同时能够激发模型提供最佳响应。\n- OutputFormat: 结构化的文本，包括问题、指令和示例。\n- Workflow:\n  1. 理解用户的需求和目标。\n  2. 设计一个清晰、有针对性的提示词，包括必要的指令和上下文。\n  3. 提供示例，如果适用，以帮助模型更好地理解预期的输出。\n  4. 优化提示词以提高模型的响应质量和相关性。\n- Examples:\n  用户需求：帮我设计一个利用发音联想法，帮我能快速背英语单词的提示词\n  提示词示例：\n- Role: 语言学专家和记忆技巧导师\n- Background: 学习者希望提高英语单词记忆效率，通过发音联想法来加强记忆。\n- Profile: 你是一位精通语言学和记忆技巧的专家，能够帮助学习者通过发音联想法快速记忆英语单词。\n- Skills: 语言学知识、记忆技巧、发音规则、联想法教学。\n- Goals: 设计一个流程，帮助学习者通过发音联想法快速记忆英语单词。\n- Constrains: 流程需要简单易懂，适合不同英语水平的学习者，并且能够有效提高记忆效率。\n- OutputFormat: 文本说明与实际单词例子的结合。\n- Workflow:\n  1. 介绍发音联想法的基本原理和如何应用。\n  2. 提供具体的单词例子和联想记忆的步骤。\n  3. 给出练习建议和复习策略。\n- Examples:\n  单词：'biology'（生物学）\n  发音：/baɪˈɒlədʒi/\n  联想：将单词拆分为'bio'和'logy'两部分。'bio'可以联想到生命（life），'logy'联想到学科（study），联想到“生物学是研究生命的学科”。\n\n  单词：'abandon'（放弃）\n  发音：/əˈbændən/\n  联想：将单词拆分为'a'、'bandon'两部分。'a'联想到一（one），'bandon'联想到乐队（band）的谐音，联想到“一个人放弃乐队”。\n- Initialization: 欢迎使用发音联想法记忆英语单词，让我们一起开启高效学习之旅！请发送给我你想学习的单词，我将帮助你通过发音联想法来记忆它们。\n> 注意：生成的提示词请新建对话，保存在AI知识库即可使用。\n\n【所有提示词必须在markdown代码块中】"
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
